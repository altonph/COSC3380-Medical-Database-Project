import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import HeaderPortalAdmin from "../../components/HeaderPortalDoctor";
import Footer from "../../components/Footer";

const DoctorPatients = () => {

    const [editingPatientID, setEditingPatientID] = useState(null);
    const [editedPatients, setEditedPatients] = useState({});
    const [patients, setPatients] = useState([
        {patientID: 12345, insuranceID: 1, dentistID: 2, Gender: "Male", FName: "John", LName: "Apple", DOB: "05/06/1991", Email: "johnapple@gmail.com", Phone_num: 123456789, Address: "12 Calhoun Rd"},
        {patientID: 54321, insuranceID: 2, dentistID: 1, Gender: "Female", FName: "Jane", LName: "Apple", DOB: "10/05/1981", Email: "janeapple@gmail.com", Phone_num: 987654321, Address: "5543 Houston St"},
        {patientID: 9876, insuranceID: 3, dentistID: 3, Gender: "Male", FName: "Michael", LName: "Smith", DOB: "03/15/1975", Email: "michaelsmith@gmail.com", Phone_num: 5551234567, Address: "789 Elm St"},
        {patientID: 5432, insuranceID: 4, dentistID: 4, Gender: "Female", FName: "Emily", LName: "Johnson", DOB: "07/20/1988", Email: "emilyjohnson@gmail.com", Phone_num: 4449876543, Address: "456 Pine St"},
        {patientID: 4567, insuranceID: 2, dentistID: 1, Gender: "Male", FName: "David", LName: "Brown", DOB: "11/25/1965", Email: "davidbrown@gmail.com", Phone_num: 2223456789, Address: "234 Oak St"}
    ]);

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
                    <HeaderPortalAdmin />
                </nav>

                <div className="flex flex-1">
                    <aside className="w-1/6 bg-gray-200 text-black">
                        <nav className="p-4 text-xl">
                            <ul>
                                <li><a href="/doctor/home" className="block py-2 text-center text-gray-600 hover:text-black">Home</a></li>
                                <li><a href="/doctor/appointments" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</a></li>
                                <li><a href="/doctor/patients" className="block py-2 text-center font-bold underline">Patients</a></li>
                            </ul>
                        </nav>
                    </aside>
                    
                    {/* Main Section */}
                    <main className="flex-1 p-4">
                        <h1 className="text-3xl font-bold mb-4 p-8">Patients Overview</h1>
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-sm">PatientID</th>
                                    <th className="px-4 py-2 text-sm">InsuranceID</th>
                                    <th className="px-4 py-2 text-sm">DentistID</th>
                                    <th className="px-4 py-2 text-sm">Gender</th>
                                    <th className="px-4 py-2 text-sm">FirstName</th>
                                    <th className="px-4 py-2 text-sm">LastName</th>
                                    <th className="px-4 py-2 text-sm">DOB</th>
                                    <th className="px-4 py-2 text-sm">Email</th>
                                    <th className="px-4 py-2 text-sm">PhoneNumber</th>
                                    <th className="px-4 py-2 text-sm">Address</th>
                                    <th className="px-4 py-2 text-sm">Actions</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {patients.map(patient => (
                                    <tr key={patient.patientID}>
                                        <td className="border px-4 py-2 text-xs">
                                            <Link to={`/doctor/patients/${patient.patientID}`}>{patient.patientID}</Link> 
                                        </td>
                                        <td className="border px-4 py-2 text-xs">
                                            {isEditing(patient.patientID) ? 
                                                <input type="text" name="insuranceID" value={editedPatients.insuranceID || ''} onChange={handleInputChange} style={{ width: "75px" }} /> 
                                                : patient.insuranceID}
                                        </td>
                                        <td className="border px-4 py-2 text-xs">
                                            {isEditing(patient.patientID) ? 
                                                <input type="text" name="dentistID" value={editedPatients.dentistID || ''} onChange={handleInputChange} style={{ width: "75px" }} /> 
                                                : patient.dentistID}
                                        </td>
                                        <td className="border px-4 py-2 text-xs">
                                            {isEditing(patient.patientID) ? 
                                                <input type="text" name="Gender" value={editedPatients.Gender || ''} onChange={handleInputChange} style={{ width: "75px" }} /> 
                                                : patient.Gender}
                                        </td>
                                        <td className="border px-4 py-2 text-xs">
                                            {isEditing(patient.patientID) ? 
                                                <input type="text" name="FName" value={editedPatients.FName || ''} onChange={handleInputChange} style={{ width: "75px" }} /> 
                                                : patient.FName}
                                        </td>
                                        <td className="border px-4 py-2 text-xs">
                                            {isEditing(patient.patientID) ? 
                                                <input type="text" name="LName" value={editedPatients.LName || ''} onChange={handleInputChange} style={{ width: "75px" }} /> 
                                                : patient.LName}
                                        </td>
                                        <td className="border px-4 py-2 text-xs">
                                            {isEditing(patient.patientID) ? 
                                                <input type="date" name="DOB" value={editedPatients.DOB || ''} onChange={handleDateChange} style={{ width: "75px" }} /> 
                                                : patient.DOB}
                                        </td>
                                        <td className="border px-4 py-2 text-xs">
                                            {isEditing(patient.patientID) ? 
                                                <input type="text" name="Email" value={editedPatients.Email || ''} onChange={handleInputChange} style={{ width: "75px" }} /> 
                                                : patient.Email}
                                        </td>
                                        <td className="border px-4 py-2 text-xs">
                                            {isEditing(patient.patientID) ? 
                                                <input type="text" name="Phone_num" value={editedPatients.Phone_num || ''} onChange={handleInputChange} style={{ width: "75px" }} /> 
                                                : patient.Phone_num}
                                        </td>
                                        <td className="border px-4 py-2 text-xs">
                                            {isEditing(patient.patientID) ? 
                                                <input type="text" name="Address" value={editedPatients.Address || ''} onChange={handleInputChange} style={{ width: "75px" }} /> 
                                                : patient.Address}
                                        </td>
                                        <td className="border px-4 py-2 text-xs">
                                            {isEditing(patient.patientID) ? (
                                                <>
                                                    <button className="bg-blue-500 text-white px-2 py-1 mr-2" onClick={() => handleSave(patient.patientID)}>Save</button>
                                                    <button className="bg-red-500 text-white px-2 py-1 mr-2" onClick={handleCancel}>Cancel</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className="bg-blue-500 text-white px-2 py-1 mr-2" onClick={() => handleEdit(patient.patientID)}>Edit</button>
                                                    <button className="bg-red-500 text-white px-2 py-1 mr-2" onClick={() => handleDelete(patient.patientID)}>Delete</button>
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
