import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import HeaderPortalAdmin from "../../components/HeaderPortalAdmin";
import Footer from "../../components/Footer";

const AdminRegisterDentist = () => {
    const [FName, setFName] = useState('');
    const [LName, setLName] = useState('');
    const [DOB, setDOB] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Phone_num, setPhone_num] = useState('');
    const [Address, setAddress] = useState('');
    const [Username, setUsername] = useState('');
    const [Start_date, setStart_date] = useState('');
    const [Salary, setSalary] = useState('');
    const [Specialty, setSpecialty] = useState('');
    const navigateTo = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = {
                FName: FName,
                LName: LName,
                Specialty: Specialty,
                Email: Email,
                Phone_num: Phone_num,
                Address: Address,
                DOB: DOB,
                Start_date: Start_date,
                Salary: Salary,
                Username: Username,
                Password: Password,
                Is_active: true,
                User_role: "Dentist"
            }
            
            const response = await fetch("http://localhost:5000/doctor/register", {

                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            if (response.ok) {
                navigateTo('/admin/staff');
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
            <HeaderPortalAdmin/>
            <div className="flex-grow container mx-auto px-4 flex justify-center items-center mt-20 mb-10">
                <div className="max-w-md w-full">
                    <h2 className="text-2xl font-bold mb-4 text-center">Dentist Registration</h2>
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
                            <label htmlFor="Specialty" className="block">Specialty</label>
                            <select 
                                value={Specialty} 
                                onChange={(e) => setSpecialty(e.target.value)} 
                                id="Specialty" 
                                name="Specialty"
                                className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300"
                            >
                                <option value="">Select Specialty</option>
                                <option value="General Dentistry">General Dentistry</option>
                                <option value="Endodontist">Endodontist</option>
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
                            <label htmlFor="Salary" className="block">Salary</label>
                            <textarea 
                                value={Salary} 
                                onChange={(e) => setSalary(e.target.value)} 
                                placeholder="Salary" 
                                id="Salary" 
                                name="Salary"
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

export default AdminRegisterDentist;
