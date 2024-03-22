import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import useHistory
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header"; 
import Footer from "../../components/Footer";

const LoginPage = (props) => {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const navigateTo = useNavigate(); // Get the history object

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = {
                Username: Username,
                Password: Password,
            }
    
            const response = await fetch("http://localhost:5000/patient/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
    
            if (response.ok) {
                const data = await response.json();
                //console.log(data);
                localStorage.setItem('token', data.token); // Store token in local storage
                localStorage.setItem('role', data.role); // Store role in local storage
                navigateTo('/patient/home');
                console.log("Login Successful");
            } else {
                const data = await response.json();
                console.error('Login failed:', data.message);
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow container mx-auto px-4 flex justify-center items-center mt-10 mb-10">
                <div className="max-w-md w-full">
                    <h2 className="text-2xl font-bold mb-4 text-center">Patient Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="Username" className="block">Username</label>
                            <input 
                                value={Username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                type="text" 
                                placeholder="Username" 
                                id="Username" 
                                name="Username"
                                className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Password" className="block">Password</label>
                            <input 
                                value={Password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                type="Password" 
                                placeholder="********" 
                                id="Password" 
                                name="Password"
                                className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300">Log In</button>
                    </form>
                    <Link to="/patient/register" className="block text-center mt-4 text-blue-500">Don't have an account? Register now.</Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LoginPage;
