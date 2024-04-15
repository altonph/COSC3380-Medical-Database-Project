import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import HeaderPortalAdmin from "../../components/HeaderPortalAdmin";
import Footer from "../../components/Footer";

const AdminRegisterStaff = () => {
    const [Fname, setFname] = useState('');
    const [Lname, setLname] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone_num, setPhone_num] = useState('');
    const [DOB, setDOB] = useState('');
    const [Address, setAddress] = useState('');
    const [Start_date, setStart_date] = useState('');
    const [Salary, setSalary] = useState('');
    const [Position, setPosition] = useState('');
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [Office, setOffice] = useState('');
    const navigateTo = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = {
                Office: Office,
                Fname: Fname,
                Lname: Lname,
                Email: Email,
                Phone_num: Phone_num,
                DOB: DOB,
                Address: Address,
                Position: Position,
                Start_date: Start_date,
                End_date: null,
                Salary: Salary,
                Username: Username,
                Password: Password,
                Is_active: true,
            }
            
            const response = await fetch("http://localhost:5000/api/staff/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                navigateTo('/admin/staff');
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
                    <h2 className="text-2xl font-bold mb-4 text-center">Staff Registration</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="FName" className="block">First Name</label>
                            <input 
                                value={Fname} 
                                onChange={(e) => setFname(e.target.value)} 
                                type="text" 
                                placeholder="First Name" 
                                id="FName" 
                                name="FName"
                                className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="LName" className="block">Last Name</label>
                            <input 
                                value={Lname} 
                                onChange={(e) => setLname(e.target.value)} 
                                type="text" 
                                placeholder="Last Name" 
                                id="LName" 
                                name="LName"
                                className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Email" className="block">Email</label>
                            <input 
                                value={Email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                type="email" 
                                placeholder="Email" 
                                id="Email" 
                                name="Email"
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
                            <label htmlFor="Address" className="block">Address</label>
                            <input 
                                value={Address} 
                                onChange={(e) => setAddress(e.target.value)} 
                                type="text" 
                                placeholder="Address" 
                                id="Address" 
                                name="Address"
                                className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Start_date" className="block">Start Date</label>
                            <input 
                                value={Start_date} 
                                onChange={(e) => setStart_date(e.target.value)} 
                                type="date" 
                                id="Start_date" 
                                name="Start_date"
                                className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Position" className="block">Position</label>
                            <select 
                                value={Position} 
                                onChange={(e) => setPosition(e.target.value)} 
                                id="Position" 
                                name="Position"
                                className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                            >
                                <option value="">Select Position</option>
                                <option value="Receptionist">Receptionist</option>
                                <option value="Hygienist">Hygienist</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Salary" className="block">Salary</label>
                            <input 
                                value={Salary} 
                                onChange={(e) => setSalary(e.target.value)} 
                                type="number" 
                                placeholder="Salary" 
                                id="Salary" 
                                name="Salary"
                                className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Office" className="block">Office</label>
                            <select 
                                value={Office} 
                                onChange={(e) => setOffice(e.target.value)} 
                                id="Office" 
                                name="Office"
                                className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                            >
                                <option value="">Select Office</option>
                                <option value="1">Austin</option>
                                <option value="2">Phoenix</option>
                            </select>
                        </div>
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
                                type="password" 
                                placeholder="Password" 
                                id="Password" 
                                name="Password"
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

export default AdminRegisterStaff;
