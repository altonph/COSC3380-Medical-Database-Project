import React, { useState, useEffect } from "react";
import HeaderPortalAdmin from "../../components/HeaderPortalAdmin";
import Footer from "../../components/Footer";

const AdminPatients = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/admin/getPatients");
                if (response.ok) {
                    const data = await response.json();
                    setPatients(data);
                } else {
                    console.error("Failed to fetch patients");
                }
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };

        fetchPatients();
    }, []);

    return (
        <>
            <div className="flex h-screen flex-col">
                <nav>
                    <HeaderPortalAdmin />
                </nav>

                <div className="flex flex-1">
                    {/* Sidebar */}
                    <aside className="w-1/6 bg-gray-200 text-black">
                        <nav className="p-4 text-xl">
                            <ul>
                                <li><a href="/admin/home" className="block py-2 text-center text-gray-600 hover:text-black">Home</a></li>
                                <li><a href="/admin/appointments" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</a></li>
                                <li><a href="/admin/patients" className="block py-2 text-center font-bold underline">Patients</a></li>
                                <li><a href="/admin/staff" className="block py-2 text-center text-gray-600 hover:text-black">Staff</a></li>
                                <li><a href="/admin/appointment-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Appointment Data Report</a></li>
                                <li><a href="/admin/finance-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Finance Data Report</a></li>
                                <li><a href="/admin/demographic-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Demographic Data Report</a></li>
                            </ul>
                        </nav>
                    </aside>
                    
                    {/* Main Section */}
                    <main className="flex-1 p-4">
                        <div className="flex gap-4 mb-8">
                            <h1 className="text-3xl font-bold">Patients Overview</h1>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white text-lg py-1 px-4 rounded focus:outline-none focus:ring focus:border-green-300"><a href= "/admin/register-patient">+ Add Patient</a></button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2 text-sm">PatientID</th>
                                        <th className="px-4 py-2 text-sm">Policy Number</th>
                                        <th className="px-4 py-2 text-sm">Insurance Company</th>
                                        <th className="px-4 py-2 text-sm">Gender</th>
                                        <th className="px-4 py-2 text-sm">First Name</th>
                                        <th className="px-4 py-2 text-sm">Last Name</th>
                                        <th className="px-4 py-2 text-sm">DOB</th>
                                        <th className="px-4 py-2 text-sm">Email</th>
                                        <th className="px-4 py-2 text-sm">Phone Number</th>
                                        <th className="px-4 py-2 text-sm">Address</th>
                                        <th className="px-4 py-2 text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patients.map(patient => (
                                        <tr key={patient.patientID}>
                                            <td className="border px-4 py-2">{patient.patientID}</td>
                                            <td className="border px-4 py-2 ">{patient.Policy_number}</td>
                                            <td className="border px-4 py-2">{patient.Insurance_Company_Name}</td>
                                            <td className="border px-4 py-2">{patient.Gender}</td>
                                            <td className="border px-4 py-2">{patient.FName}</td>
                                            <td className="border px-4 py-2">{patient.LName}</td>
                                            <td className="border px-4 py-2">{new Date(patient.DOB).toLocaleDateString()}</td>
                                            <td className="border px-4 py-2">{patient.Email}</td>
                                            <td className="border px-4 py-2">{patient.Phone_num}</td>
                                            <td className="border px-4 py-2">{patient.Address}</td>
                                            <td className="border px-4 py-2">
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:ring focus:border-blue-300">Edit</button>
                                                <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:ring focus:border-red-300 ml-2">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>

                </div>

                <nav>
                    <Footer/>
                </nav>
            </div>
        </>
    );
};

export default AdminPatients;
