import React, { useState, useEffect } from "react";
import HeaderPortalAdmin from "../../components/HeaderPortalAdmin";
import Footer from "../../components/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AdminPatients = () => {
    const [patients, setPatients] = useState([]);
    const [editedIndex, setEditedIndex] = useState(null);
    const [deletedIndex, setDeletedIndex] = useState(null);
    const [userData, setUserData] = useState({
        Policy_number: "",
        Insurance_Company_Name: "",
        Gender: "",
        FName: "",
        LName: "",
        DOB: new Date(),
        Email: "",
        Phone_num: "",
        Address: "",
        is_active: true // Assuming default value for isActive
    });

    useEffect(() => {
        fetchPatients();
    }, []);

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

    const handleEdit = (index) => {
        // Set editedIndex
        setEditedIndex(index);
        // Set userData to the values of the patient being edited
        const editedPatient = patients[index];
        // Parse the initial DOB value to the correct format
        editedPatient.DOB = new Date(editedPatient.DOB);
        setUserData(editedPatient);
    };
    
    

    const handleDelete = (index) => {
        setDeletedIndex(index);
    };

    const handleCancelEdit = () => {
        setEditedIndex(null);
    };

    const handleCancelDelete = () => {
        setDeletedIndex(null);
    };

    const parseDateToSQLFormat = (date) => {
        // Ensure date is a valid Date object
        if (!(date instanceof Date)) {
            throw new Error("Invalid date format");
        }
    
        // Get date components
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
    
        // Return date in SQL format (YYYY-MM-DD)
        return `${year}-${month}-${day}`;
    };
    
    const handleConfirmEdit = async (patientID) => {
        try {
            // Parse date to SQL format
            const dobSQLFormat = parseDateToSQLFormat(userData.DOB);
            // Update userData with parsed date
            const updatedUserData = {
                ...userData,
                DOB: dobSQLFormat
            };
    
            console.log("Sending userData to server:", updatedUserData); // Log before sending data
            const response = await fetch(`http://localhost:5000/api/patient/editPatient/${patientID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUserData)
            });
            if (response.ok) {
                // Handle success response
                console.log('Patient profile updated successfully');
                fetchPatients();
                setEditedIndex(null);
            } else {
                // Handle error response
                console.error('Failed to update patient profile');
            }
        } catch (error) {
            console.error('Error updating patient profile:', error);
        }
    };
    
    
    
    
    const handleConfirmDelete = async (patientID) => {
        try {
            const response = await fetch(`http://localhost:5000/api/patient/archive/${patientID}`, {
                method: 'PATCH'
            });
            if (response.ok) {
                // Handle success response
                console.log('Patient archived successfully');
                // Refetch patients after successful deletion
                fetchPatients();
                // Reset deletedIndex to null
                setDeletedIndex(null);
            } else {
                // Handle error response
                console.error('Failed to archive patient');
            }
        } catch (error) {
            console.error('Error archiving patient:', error);
        }
    };
    
    const handleInputChange = (value, field) => {
        console.log("Previous userData:", userData);
        setUserData(prevUserData => {
            const updatedUserData = {
                ...prevUserData,
                [field]: field === 'DOB' ? value : value.target.value
            };
            console.log("Updated userData:", updatedUserData);
            return updatedUserData;
        });
    };
    

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
                                <li><a href="/admin/dentists" className="block py-2 text-center text-gray-600 hover:text-black">Dentists</a></li>
                                <li><a href="/admin/staff" className="block py-2 text-center text-gray-600 hover:text-black">Staff</a></li>
                                <li><a href="/admin/appointment-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Appointment Data Report</a></li>
                                <li><a href="/admin/finance-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Finance Data Report</a></li>
                                <li><a href="/admin/demographic-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Demographic Data Report</a></li>
                            </ul>
                        </nav>
                    </aside>
                    
                    {/* Main Section */}
                    <main className="flex-1 p-4 overflow-x-auto">
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
                                        <th className="px-4 py-2 text-sm">Is Active</th>
                                        <th className="px-4 py-2 text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patients.map((patient, index) => (
                                        <tr key={patient.patientID}>
                                            <td className="border px-4 py-2">{patient.patientID}</td>
                                            <td className="border px-4 py-2">{editedIndex === index ? <input type="text" name="Policy_number" value={userData.Policy_number} onChange={(e) => handleInputChange(e, 'Policy_number')} /> : patient.Policy_number}</td>
                                            <td className="border px-4 py-2">
                                                {editedIndex === index ? (
                                                    <select name="Insurance_Company_Name" value={userData.Insurance_Company_Name} onChange={(e) => handleInputChange(e, 'Insurance_Company_Name')}>
                                                        <option value="">Select</option>
                                                        <option value="Anthem">Anthem</option>
                                                        <option value="Guardian">Guardian</option>
                                                        <option value="Ameritas">Ameritas</option>
                                                        <option value="Humana">Humana</option>
                                                        <option value="Spirit Dental">Spirit Dental</option>
                                                    </select>
                                                ) : (
                                                    patient.Insurance_Company_Name
                                                )}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {editedIndex === index ? (
                                                    <select name="Gender" value={userData.Gender} onChange={(e) => handleInputChange(e, 'Gender')}>
                                                        <option value="">Select</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                    </select>
                                                ) : (
                                                    patient.Gender
                                                )}
                                            </td>
                                            <td className="border px-4 py-2">{editedIndex === index ? <input type="text" name="FName" value={userData.FName} onChange={(e) => handleInputChange(e, 'FName')} /> : patient.FName}</td>
                                            <td className="border px-4 py-2">{editedIndex === index ? <input type="text" name="LName" value={userData.LName} onChange={(e) => handleInputChange(e, 'LName')} /> : patient.LName}</td>
                                            <td className="border px-4 py-2">
                                                {editedIndex === index ? (
                                                    <DatePicker
                                                        selected={userData.DOB}
                                                        onChange={(date) => handleInputChange(date, 'DOB')}
                                                        dateFormat="MM/dd/yyyy"
                                                    />
                                                ) : (
                                                    new Date(patient.DOB).toLocaleDateString()
                                                )}
                                            </td>
                                            <td className="border px-4 py-2">{editedIndex === index ? <input type="text" name="Email" value={userData.Email} onChange={(e) => handleInputChange(e, 'Email')} /> : patient.Email}</td>
                                            <td className="border px-4 py-2">{editedIndex === index ? <input type="text" name="Phone_num" value={userData.Phone_num} onChange={(e) => handleInputChange(e, 'Phone_num')} /> : patient.Phone_num}</td>
                                            <td className="border px-4 py-2">{editedIndex === index ? <input type="text" name="Address" value={userData.Address} onChange={(e) => handleInputChange(e, 'Address')} /> : patient.Address}</td>
                                            <td className="border px-4 py-2">{patient.is_active === 1 ? "Active" : "Inactive"}</td>
                                            <td className="border px-4 py-2">
                                                {(editedIndex !== index && deletedIndex !== index) && (
                                                    <>
                                                        <button onClick={() => handleEdit(index)} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:ring focus:border-blue-300">Edit</button>
                                                        <button onClick={() => handleDelete(index)} className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:ring focus:border-red-300 ml-2">Delete</button>
                                                    </>
                                                )}
                                                {editedIndex === index && (
                                                    <>
                                                        <button onClick={() => handleConfirmEdit(patient.patientID, userData)} className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:ring focus:border-green-300">Confirm</button>
                                                        <button onClick={handleCancelEdit} className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:ring focus:border-red-300 ml-2">Cancel</button>
                                                    </>
                                                )}
                                                {deletedIndex === index && (
                                                    <>
                                                        <button onClick={() => handleConfirmDelete(patient.patientID)} className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:ring focus:border-red-300 ml-2">Confirm</button>
                                                        <button onClick={handleCancelDelete} className="bg-gray-500 hover:bg-gray-700 text-white py-1 px-2 rounded focus:outline-none focus:ring focus:border-gray-300 ml-2">Cancel</button>
                                                    </>
                                                )}
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
