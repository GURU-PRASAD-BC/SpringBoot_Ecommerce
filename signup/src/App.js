import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Products from './components/Product';
import AllProducts from './components/AllProducts';  
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import './App.css'; // Import CSS file for overall styling

const App = () => {

    // Helper function to check if the user is authenticated
    const isAuthenticated = () => !!localStorage.getItem('token');
    
    return (
        <div className="app-container">
            {/* Always show the Header */}
            <Header />

            {/* Main Content */}
            <div className="main-content">
                <Routes>
                    {/* Public routes */}
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Login />} />
                    
                    {/* Protected routes */}
                    <Route 
                        path="/home" 
                        element={isAuthenticated() ? <Home /> : <Navigate to="/home" />} 
                    />
                    <Route 
                        path="/products/:categoryId" 
                        element={isAuthenticated() ? <Products /> : <Navigate to="/products/:categoryId" />} 
                    />

                    <Route path="/products" element={<AllProducts />} />

                    {/* Default route */}
                    <Route path="/" element={<Navigate to="/signin" />} />
                </Routes>
            </div>

            {/* Always show the Footer */}
            <Footer />
        </div>
    );
};

export default App;
