import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

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
        <div className="register-container">
            <form onSubmit={handleSubmit} >
                <label htmlFor="name">Full Name</label>
                <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    type="text" 
                    placeholder="Full Name" 
                    id="name" 
                    name="name"
                />
                <label htmlFor="gender">Gender</label>
                <select 
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)} 
                    id="gender" 
                    name="gender"
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <label htmlFor="dob">Date of Birth</label>
                <input 
                    value={dob} 
                    onChange={(e) => setDob(e.target.value)} 
                    type="date" 
                    id="dob" 
                    name="dob"
                />
                <label htmlFor="email">Email</label>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    placeholder="youremail@gmail.com" 
                    id="email" 
                    name="email"
                />
                <label htmlFor="password">Password</label>
                <input 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    placeholder="********" 
                    id="password" 
                    name="password"
                />
                <label htmlFor="phoneNumber">Phone Number</label>
                <input 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    type="tel" 
                    placeholder="Phone Number" 
                    id="phoneNumber" 
                    name="phoneNumber"
                />
                <label htmlFor="address">Address</label>
                <textarea 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    placeholder="Address" 
                    id="address" 
                    name="address"
                />
                <button type="submit" className="register-button">Register</button>
            </form>
            <Link to="/login" className="login-link">Already have an account? Log in here.</Link>
        </div>
    );
}

export default RegisterPage;
