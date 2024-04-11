import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header"; 
import Footer from "../../components/Footer";

const RegisterPage = () => {
    const [FName, setFName] = useState('');
    const [LName, setLName] = useState('');
    const [Gender, setGender] = useState('');
    const [DOB, setDOB] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Phone_num, setPhone_num] = useState('');
    const [Address, setAddress] = useState('');
    const [Username, setUsername] = useState('');
    const [errors, setErrors] = useState({});
    const navigateTo = useNavigate(); 

    const MAX_NAME_LENGTH = 20;
    const MAX_EMAIL_LENGTH = 50;
    const MAX_USERNAME_LENGTH = 50;
    const MAX_PASSWORD_LENGTH = 100;
    const MAX_PHONE_LENGTH = 10;
    const MAX_ADDRESS_LENGTH = 100;
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        // reset error messages
        setErrors({});

        // Input validation
        const validationErrors = {};

        if (!FName.trim()) {
            validationErrors.FName = 'First Name is requred.';
        }
        else if (FName.length > MAX_NAME_LENGTH) {
            validationErrors.FName = 'Cannot exceed 20 characters.';
        }

        if (!LName.trim()) {
            validationErrors.LName = 'Last Name is required.';
        }
        else if (!LName.length > MAX_NAME_LENGTH) {
            validationErrors.LName = 'Cannot exceed 20 characters.';
        }

        if (!Gender.trim()) {
            validationErrors.Gender = 'Please choose a gender.';
        }

        if (!DOB.trim()) {
            validationErrors.DOB = 'Please choose a date.';
        }

        if (!Email.trim()) {
            validationErrors.Email = 'Email is required.';
        }
        else if (Email.length > MAX_EMAIL_LENGTH) {
            validationErrors.Email = 'Cannot exceed 50 characters.';
        }

        if (!Username.trim()) {
            validationErrors.Username = 'Username is required.';
        }
        else if (Username.length > MAX_USERNAME_LENGTH) {
            validationErrors.Username = 'Cannot exceed 50 characters.';
        }

        if (!Password.trim()) {
            validationErrors.Password = 'Password is required.';
        }
        else if (Password.length > MAX_PASSWORD_LENGTH) {
            validationErrors.Password = 'Cannot exceed 100 characters.';
        }

        if (!Phone_num.trim()) {
            validationErrors.Phone_num = 'Phone Number is required';
        }
        else {
            validationErrors.Phone_num = 'Make sure your phone number is in format (1234567890)';
        }

        if (!Address.trim()) {
            validationErrors.Address = 'Address is required';
        }
        else if (Address.length > MAX_ADDRESS_LENGTH) {
            validationErrors.Address = 'Cannot exceed 100 characters';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }


        try {
            const body = {
                PatientID: null,
                InsuranceID: null,
                dentistID: null,
                staffID: null,
                FName: FName,
                LName: LName,
                Gender: Gender,
                DOB: DOB,
                Email: Email,
                Username: Username,
                Password: Password,
                Phone_num: Phone_num,
                Address: Address,
                Is_admin: false,
                User_role: "Patient"
            }
            
            const response = await fetch("http://localhost:5000/api/patient/register", {

                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            if (response.ok) {
                navigateTo('/patient/login');
                console.log("Registration Successful");
            }
            else {
                const data = await response.json();
                console.error('Registration failed:', data.message);
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow container mx-auto px-4 flex justify-center items-center mt-20 mb-10">
                <div className="max-w-md w-full">
                    <h2 className="text-2xl font-bold mb-4 text-center">Patient Registration</h2>
                    <form onSubmit={handleSubmit}>
                        {/* First Name, Last Name */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="FName" className="block">First Name</label>
                                <input 
                                    value={FName} 
                                    onChange={(e) => setFName(e.target.value)} 
                                    type="text" 
                                    placeholder="First Name" 
                                    id="FName" 
                                    name="FName"
                                    className={`w-full border py-2 px-3 rounded focus:outline-none ${errors.FName ? 'border-red-500' : 'focus:ring focus:border-blue-300'}`}
                                />
                                {errors.FName && <p className="text-red-500 text-xs mt-1">{errors.FName}</p>}
                            </div>
                            <div>
                                <label htmlFor="LName" className="block">Last Name</label>
                                <input 
                                    value={LName} 
                                    onChange={(e) => setLName(e.target.value)} 
                                    type="text" 
                                    placeholder="Last Name" 
                                    id="LName" 
                                    name="LName"
                                    className={`w-full border py-2 px-3 rounded focus:outline-none ${errors.LName ? 'border-red-500' : 'focus:ring focus:border-blue-300'}`}
                                />
                                {errors.LName && <p className="text-red-500 text-xs mt-1">{errors.LName}</p>}
                            </div>
                        </div>
                        {/* Gender */}
                        <div className="mb-4">
                            <label htmlFor="Gender" className="block">Gender</label>
                            <select 
                                value={Gender} 
                                onChange={(e) => setGender(e.target.value)} 
                                id="Gender" 
                                name="Gender"
                                className={`w-full border py-2 px-3 rounded focus:outline-none ${errors.Gender ? 'border-red-500' : 'focus:ring focus:border-blue-300'}`}
                                >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {errors.Gender && <p className="text-red-500 text-xs mt-1">{errors.Gender}</p>}
                        </div>
                        {/* DOB */}
                        <div className="mb-4">
                            <label htmlFor="DOB" className="block">Date of Birth</label>
                            <input 
                                value={DOB} 
                                onChange={(e) => setDOB(e.target.value)} 
                                type="date" 
                                id="DOB" 
                                name="DOB"
                                className={`w-full border py-2 px-3 rounded focus:outline-none ${errors.DOB ? 'border-red-500' : 'focus:ring focus:border-blue-300'}`}
                            />
                            {errors.DOB && <p className="text-red-500 text-xs mt-1">{errors.DOB}</p>}
                        </div>
                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="Email" className="block">Email</label>
                            <input 
                                value={Email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                type="Email" 
                                placeholder="youremail@gmail.com" 
                                id="Email" 
                                name="Email"
                                className={`w-full border py-2 px-3 rounded focus:outline-none ${errors.Email ? 'border-red-500' : 'focus:ring focus:border-blue-300'}`}
                            />
                            {errors.Email && <p className="text-red-500 text-xs mt-1">{errors.Email}</p>}
                        </div>
                        {/* Username */}
                        <div className="mb-4">
                            <label htmlFor="username" className="block">Username</label>
                            <input 
                                value={Username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                type="text" 
                                placeholder="Username" 
                                id="username" 
                                name="username"
                                className={`w-full border py-2 px-3 rounded focus:outline-none ${errors.Username ? 'border-red-500' : 'focus:ring focus:border-blue-300'}`}
                            />
                            {errors.Username && <p className="text-red-500 text-xs mt-1">{errors.Username}</p>}
                        </div>
                        {/* Password */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block">Password</label>
                            <input 
                                value={Password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                type="password" 
                                placeholder="********" 
                                id="password" 
                                name="password"
                                className={`w-full border py-2 px-3 rounded focus:outline-none ${errors.Password ? 'border-red-500' : 'focus:ring focus:border-blue-300'}`}
                            />
                            {errors.Password && <p className="text-red-500 text-xs mt-1">{errors.Password}</p>}
                        </div>
                        {/* Phone Number */}
                        <div className="mb-4">
                            <label htmlFor="Phone_num" className="block">Phone Number</label>
                            <input 
                                value={Phone_num} 
                                onChange={(e) => setPhone_num(e.target.value)} 
                                type="tel" 
                                placeholder="Phone Number" 
                                id="Phone_num" 
                                name="Phone_num"
                                className={`w-full border py-2 px-3 rounded focus:outline-none ${errors.Phone_num ? 'border-red-500' : 'focus:ring focus:border-blue-300'}`}
                            />
                            {errors.Phone_num && <p className="text-red-500 text-xs mt-1">{errors.Phone_num}</p>}
                        </div>
                        {/* Address */}
                        <div className="mb-4">
                            <label htmlFor="Address" className="block">Address</label>
                            <textarea 
                                value={Address} 
                                onChange={(e) => setAddress(e.target.value)} 
                                placeholder="Address" 
                                id="Address" 
                                name="Address"
                                className={`w-full border py-2 px-3 rounded focus:outline-none ${errors.Address ? 'border-red-500' : 'focus:ring focus:border-blue-300'}`}
                            />
                            {errors.Address && <p className="text-red-500 text-xs mt-1">{errors.Address}</p>}
                        </div>
                        
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300">Register</button>
                    </form>
                    <Link to="/patient/login" className="block text-center mt-4 text-blue-500">Already have an account? Log in here.</Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default RegisterPage;