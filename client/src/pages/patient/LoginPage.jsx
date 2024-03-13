import React, { useState } from "react";
import "./LoginPage.css"; 
import { Link } from "react-router-dom";

const LoginPage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => { 
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        type="email" 
                        placeholder="youremail@gmail.com" 
                        id="email" 
                        name="email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        type="password" 
                        placeholder="********" 
                        id="password" 
                        name="password"
                    />
                </div>
                <button type="submit" className="login-button">Log In</button>
            </form>
            <Link to="/register" className="register-button">Don't have an account? Register now.</Link>
        </div>
    );
}

export default LoginPage;
