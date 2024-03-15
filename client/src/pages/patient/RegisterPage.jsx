import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header"; // Import Header
import Footer from "../../components/Footer";

const RegisterPage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (e) => { 
        e.preventDefault();
        console.log(email, password, name, gender, dob, phoneNumber, address);
    }

    return (
        <div>
            <nav>
                <Header />
            </nav>
            <div className="container mx-auto items-center mt-50 mb-50">
                <div className="w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6">Patient Registration</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <label htmlFor="name" className="block">Full Name</label>
                        <input 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            type="text" 
                            placeholder="Full Name" 
                            id="name" 
                            name="name"
                            className="border py-2 px-3 mb-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                <label htmlFor="gender" className="block">Gender</label>
                <select 
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)} 
                    id="gender" 
                    name="gender"
                    className="w-full border py-2 px-3 mb-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <label htmlFor="dob" className="block">Date of Birth</label>
                <input 
                    value={dob} 
                    onChange={(e) => setDob(e.target.value)} 
                    type="date" 
                    id="dob" 
                    name="dob"
                    className="w-full border py-2 px-3 mb-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                <label htmlFor="email" className="block">Email</label>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    placeholder="youremail@gmail.com" 
                    id="email" 
                    name="email"
                    className="w-full border py-2 px-3 mb-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                <label htmlFor="password" className="block">Password</label>
                <input 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    placeholder="********" 
                    id="password" 
                    name="password"
                    className="w-full border py-2 px-3 mb-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                <label htmlFor="phoneNumber" className="block">Phone Number</label>
                <input 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    type="tel" 
                    placeholder="Phone Number" 
                    id="phoneNumber" 
                    name="phoneNumber"
                    className="w-full border py-2 px-3 mb-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                <label htmlFor="address" className="block">Address</label>
                <textarea 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    placeholder="Address" 
                    id="address" 
                    name="address"
                    className="w-full border py-2 px-3 mb-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300">Register</button>
                    </form>
                    <Link to="/patient/login" className="block text-center mt-4 text-blue-500">Already have an account? Log in here.</Link>
                </div>
            </div>
            <Footer /> 
        </div>
    );
}


export default RegisterPage;
