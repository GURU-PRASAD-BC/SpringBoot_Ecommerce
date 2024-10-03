import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles/Home.css';  // Create this for styling

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [categoriesPerPage] = useState(3); // Display 3 categories per page
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch categories from backend
        axios.get('http://localhost:8082/auth/categories')
            .then(response => {
                setCategories(response.data);
                setFilteredCategories(response.data); // Initialize filtered categories
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                setError('Could not load categories. Please try again later.');
            });
    }, []);

    // Filter categories based on search term
    useEffect(() => {
        const filtered = categories.filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCategories(filtered);
        setCurrentPage(1); // Reset to first page when search changes
    }, [searchTerm, categories]);

    // Pagination logic
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

    return (
        <div className="home-container">
             <h1>Categories</h1>
            {error && <p className="error-message">{error}</p>}
            
            {/* Search and Button Container */}
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search Categories" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="search-bar"
                />
            </div>

            {/* New Wrapper for Centering */}
            <div className="categories-wrapper">
                <div className="categories-grid">
                    {currentCategories.map(category => (
                        <div className="category-card" key={category.id}>
                            <img src={category.imageUrl} alt={category.name} />
                            <h3>{category.name}</h3>
                            <p>{category.description}</p>
                            <Link to={`/products/${category.id}`}>
                                <button className="view-products-btn">View Products</button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Link to="/products">
                    <button className="show-all-btn">Show All Products</button>
                </Link>
            {/* Pagination Controls */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
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

export default Home;
