import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Product.css'; // Product styling

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6); // 6 products per page
    const [useElasticSearch, setUseElasticSearch] = useState(false); // Toggle state

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8082/auth/products');
                setProducts(response.data);
                setFilteredProducts(response.data); // Initialize filtered products
            } catch (err) {
                setError(err.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Handle search input and Elasticsearch
    useEffect(() => {
        const searchProducts = async () => {
            if (useElasticSearch) {
                try {
                    const response = await axios.get(`http://localhost:8082/auth/search?query=${searchTerm}`);
                    setFilteredProducts(response.data);
                } catch (err) {
                    setError(err.message || 'Something went wrong with Elasticsearch');
                }
            } else {
                const filtered = products.filter(product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredProducts(filtered);
            }
            setCurrentPage(1); // Reset to first page when search changes
        };

        searchProducts();
    }, [searchTerm, products, useElasticSearch]);

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPagination = () => {
        let pages = [];
        const maxPagesToShow = 3;
        const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (currentPage > 2) {
            pages.push(
                <button
                    key={1}
                    className={`page-btn ${currentPage === 1 ? 'active' : ''}`}
                    onClick={() => paginate(1)}>
                    1
                </button>
            );
            if (currentPage > 3) {
                pages.push(<span key="start-dots" className="dots">...</span>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    className={`page-btn ${currentPage === i ? 'active' : ''}`}
                    onClick={() => paginate(i)}>
                    {i}
                </button>
            );
        }

        if (currentPage < totalPages - 1) {
            if (currentPage < totalPages - 2) {
                pages.push(<span key="end-dots" className="dots">...</span>);
            }
            pages.push(
                <button
                    key={totalPages}
                    className={`page-btn ${currentPage === totalPages ? 'active' : ''}`}
                    onClick={() => paginate(totalPages)}>
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching products: {error}</div>;

    return (
        <div className="all-products-container">
            <div className="search-container">
                <h1>All Products</h1>
                <div className="search-controls">
                <input 
                    type="text" 
                    placeholder="Search Products" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="search-bar"
                />
                <label className="elastic-switch">
                    <input 
                        type="checkbox" 
                        checked={useElasticSearch} 
                        onChange={() => setUseElasticSearch(!useElasticSearch)} 
                    />
                    <span className="slider"></span>
                </label>
                <span className="elastic-label">Elastic Search</span>
            </div>
            </div>

            <div className="products-grid">
                {currentProducts.length === 0 ? (
                    <div>No products found</div>
                ) : (
                    currentProducts.map(product => (
                        <div className="product-card" key={product.id}>
                            <h3>{product.name}</h3>
                            <img src={product.imageUrl} alt={product.name} />
                            <p><strong>Original Price: </strong>${product.originalPrice}</p>
                            <p><strong>Discounted Price: </strong>${product.discountedPrice}</p>
                            <p><strong>Stock: </strong>{product.stockCount}</p>
                            <p><strong>Category: </strong>{product.categoryName}</p> {/* Display category name */}
                            <p><strong>Description: </strong>{product.description}</p> {/* Display description */}
                            <button className="buy-now-btn">Buy Now</button>
                            <button className="add-to-cart-btn">Add to Cart</button>
                        </div>
                    ))
                )}
            </div>

            <div className="pagination">
                {renderPagination()}
            </div>
        </div>
    );
};

export default AllProducts;
