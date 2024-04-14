import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderPortalAdmin from "../../components/HeaderPortalDoctor";
import Footer from "../../components/Footer";

const DoctorPatients = () => {
    const [editingPatientID, setEditingPatientID] = useState(null);
    const [editedPatients, setEditedPatients] = useState({});
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found in local storage');
            return;
        }
    
        fetch('http://localhost:5000/api/doctor/patients', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => setPatients(data))
        .catch(error => console.error('Error fetching patients:', error));
    }, []);
    

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();
        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;
        return formattedMonth + '/' + formattedDay + '/' + year;
    };


    const handleEdit = (patientID) => {
        setEditingPatientID(patientID);
        const patient = patients.find(patient => patient.patientID === patientID);
        setEditedPatients(patient);
    };

    const handleSave = (patientID) => {
        console.log("Save patient with ID:", patientID);
        setEditingPatientID(null);
        setEditedPatients({});
    };

    const handleCancel = () => {
        setEditingPatientID(null);
        setEditedPatients({});
    };

    const handleDelete = (patientID) => {
        const updatedPatients = patients.filter(patient => patient.patientID !== patientID);
        setPatients(updatedPatients);
    };

    const isEditing = (patientID) => patientID === editingPatientID;

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedPatients(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (event) => {
        const { name, value } = event.target;
        setEditedPatients(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <div className="flex h-screen flex-col">
                <nav>
                    <HeaderPortalStaff />
                </nav>

                <div className="flex flex-1">
                    <aside className="w-1/6 bg-gray-200 text-black">
                        <nav className="p-4 text-xl">
                            <ul>
                                <li><a href="/staff/home" className="block py-2 text-center text-gray-600 hover:text-black">Home</a></li>
                                <li><a href="/staff/appointments" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</a></li>
                                <li><a href="/staff/patients" className="block py-2 text-center font-bold underline">Patients</a></li>
                            </ul>
                        </nav>
                    </aside>

                    <main className="flex-1 p-4">
                        <h1 className="text-3xl font-bold mb-4 p-8">Patients Overview</h1>
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-sm">Patient ID</th>
                                    <th className="px-4 py-2 text-sm">Policy Number</th>
                                    <th className="px-4 py-2 text-sm">Insurance Company Name</th>
                                    <th className="px-4 py-2 text-sm">Gender</th>
                                    <th className="px-4 py-2 text-sm">First Name</th>
                                    <th className="px-4 py-2 text-sm">Last Name</th>
                                    <th className="px-4 py-2 text-sm">DOB</th>
                                    <th className="px-4 py-2 text-sm">Email</th>
                                    <th className="px-4 py-2 text-sm">Phone Number</th>
                                    <th className="px-4 py-2 text-sm">Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients.map(patient => (
                                    <tr key={patient.patientID}>
                                        <td className="border px-4 py-2 text-xs">
                                            <Link to={`/staff/patients/${patient.patientID}`}>{patient.patientID}</Link>
                                        </td>
                                        <td className="border px-4 py-2 text-xs">{isEditing(patient.patientID) ? <input type="text" name="insuranceID" value={editedPatients.Policy_number || ''} onChange={handleInputChange} /> : patient.Policy_number}</td>
                                        <td className="border px-4 py-2 text-xs">{isEditing(patient.patientID) ? <input type="text" name="insuranceID" value={editedPatients.Insurance_Company_Name || ''} onChange={handleInputChange} /> : patient.Insurance_Company_Name}</td>
                                        <td className="border px-4 py-2 text-xs">{isEditing(patient.patientID) ? <input type="text" name="Gender" value={editedPatients.Gender || ''} onChange={handleInputChange} /> : patient.Gender}</td>
                                        <td className="border px-4 py-2 text-xs">{isEditing(patient.patientID) ? <input type="text" name="FName" value={editedPatients.FName || ''} onChange={handleInputChange} /> : patient.FName}</td>
                                        <td className="border px-4 py-2 text-xs">{isEditing(patient.patientID) ? <input type="text" name="LName" value={editedPatients.LName || ''} onChange={handleInputChange} /> : patient.LName}</td>
                                        <td className="border px-4 py-2 text-xs">{isEditing(patient.patientID) ? <input type="date" name="DOB" value={editedPatients.DOB || ''} onChange={handleDateChange} /> : formatDate(patient.DOB)}</td>
                                        <td className="border px-4 py-2 text-xs">{isEditing(patient.patientID) ? <input type="text" name="Email" value={editedPatients.Email || ''} onChange={handleInputChange} /> : patient.Email}</td>
                                        <td className="border px-4 py-2 text-xs">{isEditing(patient.patientID) ? <input type="text" name="Phone_num" value={editedPatients.Phone_num || ''} onChange={handleInputChange} /> : patient.Phone_num}</td>
                                        <td className="border px-4 py-2 text-xs">{isEditing(patient.patientID) ? <input type="text" name="Address" value={editedPatients.Address || ''} onChange={handleInputChange} /> : patient.Address}</td>
                                        <td className="border px-4 py-2 text-xs">
                                            {isEditing(patient.patientID) ? (
                                                <>
                                                    
                                                </>
                                            ) : (
                                                <>
                                                
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </main>
                </div>

                <nav>
                    <Footer/>
                </nav>
            </div>
        </>
    );
};

export default DoctorPatients;
