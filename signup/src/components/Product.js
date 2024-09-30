import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/Product.css'; // Product styling

const Products = () => {
    const { categoryId } = useParams(); // Get categoryId from URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(3); // Display 3 products per page

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8082/auth/products/category/${categoryId}`);
                setProducts(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching products: {error.message}</div>;

    return (
        <div className="products-container">
            <h1>Products in Category {categoryId}</h1>
            <div className="products-grid">
                {currentProducts.map(product => (
                    <div className="product-card" key={product.id}>
                        <h3>{product.name}</h3>
                        <img src={product.imageUrl} alt={product.name} />
                        <p>Original Price: <b>${product.originalPrice}</b></p>
                        <p>Discounted Price: <b>${product.discountedPrice}</b></p>
                        <p>Stock: <b>{product.stockCount}</b></p>
                        <button className="buy-now-btn">Buy Now</button>
                        <button className="add-to-cart-btn">Add to Cart</button>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
                    <button 
                        key={i + 1} 
                        className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`} 
                        onClick={() => paginate(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Products;
