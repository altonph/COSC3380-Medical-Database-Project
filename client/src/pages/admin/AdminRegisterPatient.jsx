import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import HeaderPortalAdmin from "../../components/HeaderPortalAdmin"; 
import Footer from "../../components/Footer";

const AdminRegisterPatient = () => {
    const [FName, setFName] = useState('');
    const [LName, setLName] = useState('');
    const [Gender, setGender] = useState('');
    const [DOB, setDOB] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Phone_num, setPhone_num] = useState('');
    const [Address, setAddress] = useState('');
    const [Username, setUsername] = useState('');
    const [Policy_number, setPolicy_number] = useState('');
    const [Insurance_Company_Name, setInsurance_Company_Name] = useState('');
    const navigateTo = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = {
                FName: FName,
                LName: LName,
                Gender: Gender,
                DOB: DOB,
                Email: Email,
                Username: Username,
                Password: Password,
                Phone_num: Phone_num,
                Address: Address,
                Policy_number: Policy_number || null, // Set to null if empty
                Insurance_Company_Name: Insurance_Company_Name || null, // Set to null if empty
                Is_active: true,
                User_role: "Patient"
            }
            
            const response = await fetch("https://cosc3380-medical-database-project-server.onrender.com/api/patient/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                navigateTo('/admin/patients');
                console.log("Registration Successful");
            } else {
                const data = await response.json();
                console.error('Registration failed:', data.message);
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <HeaderPortalAdmin />
            <div className="flex-grow container mx-auto px-4 flex justify-center items-center mt-20 mb-10">
                <div className="max-w-md w-full">
                    <h2 className="text-2xl font-bold mb-4 text-center">Patient Registration</h2>
                    <form onSubmit={handleSubmit}>
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
                                    className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                                />
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
                                    className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Gender" className="block">Gender</label>
                            <select 
                                value={Gender} 
                                onChange={(e) => setGender(e.target.value)} 
                                id="Gender" 
                                name="Gender"
                                className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="DOB" className="block">Date of Birth</label>
                            <input 
                                value={DOB} 
                                onChange={(e) => setDOB(e.target.value)} 
                                type="date" 
                                id="DOB" 
                                name="DOB"
                                className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block">Email</label>
                            <input 
                                value={Email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                type="email" 
                                placeholder="youremail@gmail.com" 
                                id="email" 
                                name="email"
                                className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" className="block">Username</label>
                            <input 
                                value={Username} 
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
                                value={Password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                type="password" 
                                placeholder="********" 
                                id="password" 
                                name="password"
                                className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Phone_num" className="block">Phone Number</label>
                            <input 
                                value={Phone_num} 
                                onChange={(e) => setPhone_num(e.target.value)} 
                                type="tel" 
                                placeholder="Phone Number" 
                                id="Phone_num" 
                                name="Phone_num"
                                className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Address" className="block">Address</label>
                            <textarea 
                                value={Address} 
                                onChange={(e) => setAddress(e.target.value)} 
                                placeholder="Address" 
                                id="Address" 
                                name="Address"
                                className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Insurance_Company_Name" className="block">Insurance Company</label>
                            <select 
                                value={Insurance_Company_Name} 
                                onChange={(e) => setInsurance_Company_Name(e.target.value)} 
                                id="Insurance_Company_Name" 
                                name="Insurance_Company_Name"
                                className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                            >
                                <option value="">Select Insurance Company</option>
                                <option value="Anthem">Anthem</option>
                                <option value="Guardian">Guardian</option>
                                <option value="Ameritas">Ameritas</option>
                                <option value="Humana">Humana</option>
                                <option value="Spirit Dental">Spirit Dental</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Policy_number" className="block">Policy Number</label>
                            <input 
                                value={Policy_number} 
                                onChange={(e) => setPolicy_number(e.target.value)} 
                                type="text" 
                                placeholder="Policy Number" 
                                id="Policy_number" 
                                name="Policy_number"
                                className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300">Register</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AdminRegisterPatient;
