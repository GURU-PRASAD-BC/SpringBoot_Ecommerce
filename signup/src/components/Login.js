import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For linking to Sign Up page
import axios from 'axios';
import Cookies from 'universal-cookie';
import './styles/Login.css'; // Assuming CSS is in the same folder

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const cookies=new Cookies();

    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic form validation (can be enhanced)
        if (!email || !password) {
            setErrorMessage("Please fill all fields");
            return;
        }

        // Example logic to send login data to backend
        const loginData = { 
            "email":email,
            "password": password };
        
        
        console.log("Login Data:", loginData);

        // API call
        try{
            const response=await axios.post("http://localhost:8082/auth/login",loginData);

            console.log(response.data);

            if(response.data===false)
            {
                alert("Invalid user ID or Password");
            }
            else
            {
                const token=response.data.token;
                cookies.set("token",token);
                localStorage.setItem('token', token);
                alert("Login Successfull");

                navigate("/home");
            }
        }

        catch(error)
        {
            console.error(error);
        }

    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                {errorMessage && <p className="error">{errorMessage}</p>}
                
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

                <button type="submit" className="submit-btn">Sign In</button>

                <p className="signup-option">
                    Don’t have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
