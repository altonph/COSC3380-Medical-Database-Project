import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header"; 
import Footer from "../../components/Footer";

const DoctorLoginPage = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigateTo = useNavigate();

    const handleSubmit = async (e) => { 
        e.preventDefault();
        try {
            const body = {
                Username: username,
                Password: password,
            }

            const response = await fetch("http://localhost:5000/doctor/login", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                localStorage.setItem('token', data.token); 
                localStorage.setItem('role', data.role); 
                navigateTo('/doctor/home'); 
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
                    <h2 className="text-2xl font-bold mb-4 text-center">Provider Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block">Username</label>
                            <input 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                type="text" 
                                placeholder="Username" 
                                id="username" 
                                name="username"
                                className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block">Password</label>
                            <input 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                type="password" 
                                placeholder="********" 
                                id="password" 
                                name="password"
                                className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300">Log In</button>
                    </form>
                    <p className="text-center mt-4">Are you an administrator? Login <Link to="/admin/login" className="text-blue-500">here</Link>.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DoctorLoginPage;