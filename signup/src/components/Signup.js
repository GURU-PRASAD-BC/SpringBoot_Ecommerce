import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For linking to Sign In page
import axios from 'axios';
import './styles/Signup.css'; // Assuming CSS is in the same folder

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic form validation (can be enhanced)
        if (!username || !email || !password) {
            setErrorMessage("Please fill all fields");
            return;
        }

        // Example logic to send form data to backend
        const userData = { 
            "name":username,
            "email":email,
            "password": password };

        console.log("User Data:", userData);
        
        // API Call
        try{
            const response=await axios.post("http://localhost:8082/auth/signup",userData);
            console.log(response.data);
            alert("User added Successfully");
        }

        catch(error)
        {
            console.error(error);
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                {errorMessage && <p className="error">{errorMessage}</p>}
                
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="submit-btn">Sign Up</button>

                <p className="signin-option">
                    Already have an account? <Link to="/signin">Sign In</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
