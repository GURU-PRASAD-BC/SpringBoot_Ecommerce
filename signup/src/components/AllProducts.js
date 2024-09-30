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

    // Filter products based on search term
    useEffect(() => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset to first page when search changes
    }, [searchTerm, products]);

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPagination = () => {
        let pages = [];
    const maxPagesToShow = 3; // Only show 3 pages at a time
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // First page and dots if currentPage is after page 3
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
            pages.push(
                <span key="start-dots" className="dots">...</span>
            );
        }
    }

    // Visible pages
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

    // Last page and dots if currentPage is far from last page
    if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) {
            pages.push(
                <span key="end-dots" className="dots">...</span>
            );
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
            <input 
                type="text" 
                placeholder="Search Products" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="search-bar"
            />
            </div>

            <div className="products-grid">
                {currentProducts.length === 0 ? (
                    <div>No products found</div>
                ) : (
                    currentProducts.map(product => (
                        <div className="product-card" key={product.id}>
                            <h3>{product.name}</h3>
                            <img src={product.imageUrl} alt={product.name} />
                            <p>Original Price: <b>${product.originalPrice}</b></p>
                            <p>Discounted Price: <b>${product.discountedPrice}</b></p>
                            <p>Stock: <b>{product.stockCount}</b></p>
                            <button className="buy-now-btn">Buy Now</button>
                            <button className="add-to-cart-btn">Add to Cart</button>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
                {renderPagination()}
            </div>
        </div>
    );
};

export default AllProducts;
