import React from 'react';
import {useNavigate} from 'react-router-dom';
// import './styles/Header.css'; // Styling for header

const Header = () => {
    const navigate = useNavigate();

    // Check if the user is authenticated
    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token
        navigate('/signin');
    };

    return (
        <div className="header">
            <h1><b>E-MART SHOPPING</b></h1>
            {/* Show the logout button only if the user is authenticated */}
            {isAuthenticated && (
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            )}
        </div>
    );
};

export default Header;
