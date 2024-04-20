import React, { useState, useEffect } from "react";
import HeaderPortalAdmin from "../../components/HeaderPortalAdmin";
import Footer from "../../components/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AdminStaff = () => {
    const [staff, setStaff] = useState([]);
    const [editedIndex, setEditedIndex] = useState(null);
    const [deletedIndex, setDeletedIndex] = useState(null);
    const [userData, setUserData] = useState({
        officeID: "",
        Fname: "",
        Lname: "",
        Email: "",
        Phone_num: "",
        DOB: new Date(),
        Address: "",
        Position: "",
        Start_date: new Date(),
        End_date: null,
        Salary: ""
    });

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/getStaff");
            if (response.ok) {
                const data = await response.json();
                setStaff(data);
            } else {
                console.error("Failed to fetch staff");
            }
        } catch (error) {
            console.error("Error fetching staff:", error);
        }
    };

    const handleEdit = (index) => {
        setEditedIndex(index);
        const editedStaff = staff[index];
        editedStaff.DOB = new Date(editedStaff.DOB);
        editedStaff.Start_date = new Date(editedStaff.Start_date);
        setUserData(editedStaff);
    };
    
    const handleDelete = (index) => {
        setDeletedIndex(index);
        // Populate End_date with today's date in the correct format
        const today = new Date().toLocaleDateString('en-US');
        setUserData(prevState => ({
            ...prevState,
            End_date: today
        }));
    };

    const handleCancelEdit = () => {
        setEditedIndex(null);
    };

    const handleCancelDelete = () => {
        setDeletedIndex(null);
        // Reset End_date to null
        setUserData(prevState => ({
            ...prevState,
            End_date: null
        }));
    };

    const parseDateToSQLFormat = (date) => {
        if (!(date instanceof Date)) {
            throw new Error("Invalid date format");
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleConfirmEdit = async (staffID) => {
        try {
            const dobSQLFormat = parseDateToSQLFormat(userData.DOB);
            const startDateSQLFormat = parseDateToSQLFormat(userData.Start_date);
            const updatedUserData = {
                ...userData,
                DOB: dobSQLFormat,
                Start_date: startDateSQLFormat
            };
            console.log("Sending userData to server:", updatedUserData);
            const response = await fetch(`http://localhost:5000/api/staff/editStaff/${staffID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUserData)
            });
            if (response.ok) {
                console.log('Staff information updated successfully');
                fetchStaff();
                setEditedIndex(null);
            } else {
                console.error('Failed to update staff information');
            }
        } catch (error) {
            console.error('Error updating staff information:', error);
        }
    };

    const handleConfirmDelete = async (staffID) => {
        try {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const End_date = `${year}-${month}-${day}`;
    
            const response = await fetch(`http://localhost:5000/api/staff/archive/${staffID}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ End_date })
            });
            if (response.ok) {
                console.log('Staff archived successfully');
                fetchStaff();
                setDeletedIndex(null);
            } else {
                console.error('Failed to archive staff');
            }
        } catch (error) {
            console.error('Error archiving staff:', error);
        }
    };

    const handleInputChange = (value, field) => {
        setUserData(prevUserData => ({
            ...prevUserData,
            [field]: field === 'DOB' || field === 'Start_date' ? value : value.target.value
        }));
    };

    return (
        <>
            <div className="flex w-screen h-screen flex-col">
                <nav>
                    <HeaderPortalAdmin />
                </nav>

                <div className="flex flex-1">
                    <aside className="w-1/6 bg-gray-200 text-black">
                        <nav className="p-4 text-xl">
                            <ul>
                                <li><a href="/admin/home" className="block py-2 text-center text-gray-600 hover:text-black">Home</a></li>
                                <li><a href="/admin/appointments" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</a></li>
                                <li><a href="/admin/patients" className="block py-2 text-center text-gray-600 hover:text-black">Patients</a></li>
                                <li><a href="/admin/dentists" className="block py-2 text-center text-gray-600 hover:text-black">Dentists</a></li>
                                <li><a href="/admin/staff" className="block py-2 text-center font-bold underline">Staff</a></li>
                                <li><a href="/admin/appointment-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Appointment Data Report</a></li>
                                <li><a href="/admin/finance-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Finance Data Report</a></li>
                                <li><a href="/admin/demographic-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Demographic Data Report</a></li>
                            </ul>
                        </nav>
                    </aside>
                    
                    <main className="flex-1 p-4 overflow-x-auto">
                        <div className="flex gap-4 mb-8">
                            <h1 className="text-3xl font-bold">Staff Overview</h1>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white text-lg py-1 px-4 rounded focus:outline-none focus:ring focus:border-green-300"><a href= "/admin/register-staff">+ Add Staff</a></button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full border-collapse overflow-x-auto">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2 text-sm">StaffID</th>
                                        <th className="px-4 py-2 text-sm">Office</th>
                                        <th className="px-4 py-2 text-sm">First Name</th>
                                        <th className="px-4 py-2 text-sm">Last Name</th>
                                        <th className="px-4 py-2 text-sm">Email</th>
                                        <th className="px-4 py-2 text-sm">Phone Number</th>
                                        <th className="px-4 py-2 text-sm">DOB</th>
                                        <th className="px-4 py-2 text-sm">Address</th>
                                        <th className="px-4 py-2 text-sm">Position</th>
                                        <th className="px-4 py-2 text-sm">Start Date</th>
                                        <th className="px-4 py-2 text-sm">End Date</th>
                                        <th className="px-4 py-2 text-sm">Is Active</th>
                                        <th className="px-4 py-2 text-sm">Salary</th>
                                        <th className="px-4 py-2 text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {staff.map((staffMember, index) => (
                                        <tr key={staffMember.staffID}>
                                            <td className="border px-4 py-2">{staffMember.staffID}</td>
                                            <td className="border px-4 py-2">
                                                {editedIndex === index ? (
                                                    <select name="officeID" value={userData.officeID} onChange={(e) => handleInputChange(e, 'officeID')}>
                                                        <option value="">Select</option>
                                                        <option value="1">Austin</option>
                                                        <option value="2">Phoenix</option>
                                                    </select>
                                                ) : (
                                                    staffMember.officeID === 1 ? 'Austin' : 'Phoenix'
                                                )}
                                            </td>
                                            <td className="border px-4 py-2">{editedIndex === index ? <input type="text" name="Fname" value={userData.Fname} onChange={(e) => handleInputChange(e, 'Fname')} /> : staffMember.Fname}</td>
                                            <td className="border px-4 py-2">{editedIndex === index ? <input type="text" name="Lname" value={userData.Lname} onChange={(e) => handleInputChange(e, 'Lname')} /> : staffMember.Lname}</td>
                                            <td className="border px-4 py-2">{editedIndex === index ? <input type="text" name="Email" value={userData.Email} onChange={(e) => handleInputChange(e, 'Email')} /> : staffMember.Email}</td>
                                            <td className="border px-4 py-2">{editedIndex === index ? <input type="text" name="Phone_num" value={userData.Phone_num} onChange={(e) => handleInputChange(e, 'Phone_num')} /> : staffMember.Phone_num}</td>
                                            <td className="border px-4 py-2">
                                                {editedIndex === index ? (
                                                    <DatePicker
                                                        selected={userData.DOB}
                                                        onChange={(date) => handleInputChange(date, 'DOB')}
                                                        dateFormat="MM/dd/yyyy"
                                                    />
                                                ) : (
                                                    new Date(staffMember.DOB).toLocaleDateString()
                                                )}
                                            </td>
                                            <td className="border px-4 py-2">{editedIndex === index ? <input type="text" name="Address" value={userData.Address} onChange={(e) => handleInputChange(e, 'Address')} /> : staffMember.Address}</td>
                                            <td className="border px-4 py-2">
                                                {editedIndex === index ? (
                                                    <select name="Position" value={userData.Position} onChange={(e) => handleInputChange(e, 'Position')}>
                                                        <option value="">Select</option>
                                                        <option value="Receptionist">Receptionist</option>
                                                        <option value="Hygienist">Hygienist</option>
                                                    </select>
                                                ) : (
                                                    staffMember.Position
                                                )}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {editedIndex === index ? (
                                                    <DatePicker
                                                        selected={userData.Start_date}
                                                        onChange={(date) => handleInputChange(date, 'Start_date')}
                                                        dateFormat="MM/dd/yyyy"
                                                    />
                                                ) : (
                                                    new Date(staffMember.Start_date).toLocaleDateString()
                                                )}
                                            </td>
                                            <td className="border px-4 py-2">
                                                {editedIndex === index ? 
                                                    (userData.End_date ? userData.End_date : 'N/A') :
                                                    (deletedIndex === index ? 
                                                        (userData.End_date ? userData.End_date : new Date().toLocaleDateString('en-US')) : 
                                                        (staffMember.End_date ? new Date(staffMember.End_date).toLocaleDateString('en-US') : 'N/A')
                                                    )
                                                }
                                            </td>
                                            <td className="border px-4 py-2">{staffMember.Is_active ? "Active" : "Inactive"}</td>
                                            <td className="border px-4 py-2">{editedIndex === index ? <input type="text" name="Salary" value={userData.Salary} onChange={(e) => handleInputChange(e, 'Salary')} /> : staffMember.Salary}</td>
                                            <td className="border px-4 py-2">
                                                {(editedIndex !== index && deletedIndex !== index) && (
                                                    <>
                                                        <button onClick={() => handleEdit(index)} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:ring focus:border-blue-300">Edit</button>
                                                        <button onClick={() => handleDelete(index)} className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:ring focus:border-red-300 ml-2">Delete</button>
                                                    </>
                                                )}
                                                {editedIndex === index && (
                                                    <>
                                                        <button onClick={() => handleConfirmEdit(staffMember.staffID)} className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:ring focus:border-green-300">Confirm</button>
                                                        <button onClick={handleCancelEdit} className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:ring focus:border-red-300 ml-2">Cancel</button>
                                                    </>
                                                )}
                                                {deletedIndex === index && (
                                                    <>
                                                        <button onClick={() => handleConfirmDelete(staffMember.staffID)} className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:ring focus:border-red-300 ml-2">Confirm</button>
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

export default AdminStaff;
