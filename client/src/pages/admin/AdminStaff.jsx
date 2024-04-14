import React, { useState, useEffect } from "react";
import HeaderPortalAdmin from "../../components/HeaderPortalAdmin";
import Footer from "../../components/Footer";

const AdminStaff = () => {
    // State variables to hold dentist and staff data
    const [dentists, setDentists] = useState([]);
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        // Fetch dentist and staff data when component mounts
        fetchDentists();
        fetchStaff();
    }, []);

    const [editMode, setEditMode] = useState(false);
    const [editedDentist, setEditedDentist] = useState(null);
    const [selectedDentistID, setSelectedDentistID] = useState(null);

    const [editedDentistProfile, setEditedDentistProfile] = useState({
        dentistID: "",
        FName: "",
        LName: "",
        Specialty: "",
        Email: "",
        Phone_num: "",
        Address: "",
        DOB: "",
        Start_date: "",
        End_date: "",
        Is_active: true,
        Salary: ""
    });

    const [editModeStaff, setEditModeStaff] = useState(false);
    const [editedStaff, setEditedStaff] = useState(null);
    const [selectedStaffID, setSelectedStaffID] = useState(null);

    const [editedStaffProfile, setEditedStaffProfile] = useState({
        staffID: "",
        FName: "",
        LName: "",
        Email: "",
        Position: "",
        Phone_num: "",
        Address: "",
        DOB: "",
        Start_date: "",
        End_date: "",
        Is_active: true,
        Salary: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedDentistProfile({ ...editedDentistProfile, [name]: value });
    };

    const handleEditClick = (dentistID) => {
        // Set edit mode to true and populate selectedDentistID
        setEditMode(true);
        setSelectedDentistID(dentistID);
    };

    const handleCancelEdit = () => {
        // Reset edit mode, clear editedDentist state, and deselect dentist
        setEditMode(false);
        setEditedDentist(null);
        setSelectedDentistID(null);
    };

    const handleConfirmEdit = async () => {
        try {
            // Send editedDentist data to backend API for updating
            // You can use selectedDentistID to specify which dentist to update
            // Reset edit mode, clear editedDentist state, and deselect dentist
            setEditMode(false);
            setEditedDentist(null);
            setSelectedDentistID(null);
        } catch (error) {
            console.error("Error updating dentist profile:", error);
        }
    };

    const handleStaffInputChange = (e) => {
        const { name, value } = e.target;
        setEditedStaffProfile({ ...editedStaffProfile, [name]: value });
    };

    const handleEditStaffClick = (staffID) => {
        // Set edit mode to true and populate selectedStaffID
        setEditModeStaff(true);
        setSelectedStaffID(staffID);
    };

    const handleCancelEditStaff = () => {
        // Reset edit mode, clear editedStaff state, and deselect staff
        setEditModeStaff(false);
        setEditedStaff(null);
        setSelectedStaffID(null);
    };

    const handleConfirmEditStaff = async () => {
        try {
            // Send editedStaff data to backend API for updating
            // You can use selectedStaffID to specify which staff to update
            // Reset edit mode, clear editedStaff state, and deselect staff
            setEditModeStaff(false);
            setEditedStaff(null);
            setSelectedStaffID(null);
        } catch (error) {
            console.error("Error updating staff profile:", error);
        }
    };

    const fetchDentists = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/getDentists");
            if (response.ok) {
                const data = await response.json();
                setDentists(data);
            } else {
                console.error("Failed to fetch dentists:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching dentists:", error);
        }
    };

    const fetchStaff = async () => {
        try {
            // Fetch staff data here
            // Replace the URL with your actual backend endpoint
            const response = await fetch("http://localhost:5000/api/admin/getStaff");
            if (response.ok) {
                const data = await response.json();
                setStaff(data);
            } else {
                console.error("Failed to fetch staff:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching staff:", error);
        }
    };

    const formatActiveStatus = (isActive) => {
        return isActive ? "Active" : "Inactive";
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
                                <li><a href="/admin/patients" className="block py-2 text-center text-gray-600 hover:text-black">Patients</a></li>
                                <li><a href="/admin/staff" className="block py-2 text-center font-bold underline">Staff</a></li>
                                <li><a href="/admin/appointment-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Appointment Data Report</a></li>
                                <li><a href="/admin/finance-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Finance Data Report</a></li>
                            </ul>
                        </nav>
                    </aside>
                    
                    {/* Main Section */}
                    <main className="flex-1 p-4">
                        {/* Dentist Profiles */}
                        <div>
                            <h1 className="text-2xl font-bold mb-4">Dentist Profiles</h1>
                            <div className="overflow-x-auto">
                                <table className="table-auto bg-white border border-gray-300 rounded-lg shadow-md">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="px-2 py-1">DentistID</th>
                                            <th className="px-2 py-1">First Name</th>
                                            <th className="px-2 py-1">Last Name</th>
                                            <th className="px-2 py-1">Email</th>
                                            <th className="px-2 py-1">Specialty</th>
                                            <th className="px-2 py-1">Phone</th>
                                            <th className="px-2 py-1">Address</th>
                                            <th className="px-2 py-1">DOB</th>
                                            <th className="px-2 py-1">Start Date</th>
                                            <th className="px-2 py-1">End Date</th>
                                            <th className="px-2 py-1">Salary</th>
                                            <th className="px-2 py-1">Active</th>
                                            <th className="px-2 py-1">Actions</th>
                                            {/* Add other header columns as needed */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dentists.map(dentist => (
                                            <tr key={dentist.dentistID} className="hover:bg-gray-100">
                                                <td className="border px-2 py-1">{dentist.dentistID}</td>
                                                <td className="border px-2 py-1">
                                                    {editMode && selectedDentistID === dentist.dentistID ? (
                                                        <input
                                                            type="text"
                                                            name="FName"
                                                            value={editedDentistProfile.FName || dentist.FName}
                                                            onChange={(e) => handleInputChange(e, dentist.dentistID)}
                                                            style={{ width: "90%" }}
                                                        />
                                                    ) : (
                                                        dentist.FName
                                                    )}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {editMode && selectedDentistID === dentist.dentistID ? (
                                                        <input
                                                            type="text"
                                                            name="LName"
                                                            value={editedDentistProfile.LName || dentist.LName}
                                                            onChange={(e) => handleInputChange(e, dentist.dentistID)}
                                                            style={{ width: "90%" }}
                                                        />
                                                    ) : (
                                                        dentist.LName
                                                    )}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {editMode && selectedDentistID === dentist.dentistID ? (
                                                        <input
                                                            type="text"
                                                            name="Email"
                                                            value={editedDentistProfile.Email || dentist.Email}
                                                            onChange={(e) => handleInputChange(e, dentist.dentistID)}
                                                            style={{ width: "90%" }}
                                                        />
                                                    ) : (
                                                        dentist.Email
                                                    )}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {editMode && selectedDentistID === dentist.dentistID ? (
                                                        <select
                                                            name="Specialty"
                                                            value={editedDentistProfile.Specialty || dentist.Specialty}
                                                            onChange={(e) => handleInputChange(e, dentist.dentistID)}
                                                            style={{ width: "90%" }}
                                                        >
                                                        <option value="General Dentistry">General Dentistry</option>
                                                        <option value="Endodontist">Endodontist</option>
                                                        </select>
                                                    ) : (
                                                        dentist.Specialty
                                                    )}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {editMode && selectedDentistID === dentist.dentistID ? (
                                                        <input
                                                            type="text"
                                                            name="Phone_num"
                                                            value={editedDentistProfile.Phone_num || dentist.Phone_num}
                                                            onChange={(e) => handleInputChange(e, dentist.dentistID)}
                                                            style={{ width: "90%" }}
                                                        />
                                                    ) : (
                                                        dentist.Phone_num
                                                    )}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {editMode && selectedDentistID === dentist.dentistID ? (
                                                        <input
                                                            type="text"
                                                            name="Address"
                                                            value={editedDentistProfile.Address || dentist.Address}
                                                            onChange={(e) => handleInputChange(e, dentist.dentistID)}
                                                            style={{ width: "90%" }}
                                                        />
                                                    ) : (
                                                        dentist.Address
                                                    )}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {editMode && selectedDentistID === dentist.dentistID ? (
                                                        <input
                                                            type="date"
                                                            name="DOB"
                                                            value={editedDentistProfile.Start_date || new Date(dentist.DOB).toISOString().substr(0, 10)}
                                                            onChange={(e) => handleInputChange(e, dentist.dentistID)}
                                                        />
                                                    ) : (
                                                        new Date(dentist.DOB).toLocaleDateString()
                                                    )}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {editMode && selectedDentistID === dentist.dentistID ? (
                                                        <input
                                                            type="date"
                                                            name="Start_date"
                                                            value={editedDentistProfile.Start_date || new Date(dentist.Start_date).toISOString().substr(0, 10)}
                                                            onChange={(e) => handleInputChange(e, dentist.dentistID)}
                                                        />
                                                    ) : (
                                                        new Date(dentist.Start_date).toLocaleDateString()
                                                    )}
                                                </td>
                                                <td className="border px-2 py-1">{dentist.End_date ? new Date(dentist.End_date).toLocaleDateString() : "N/A"}</td>
                                                <td className="border px-2 py-1">
                                                    {editMode && selectedDentistID === dentist.dentistID ? (
                                                        <input
                                                            type="text"
                                                            name="Salary"
                                                            value={editedDentistProfile.Salary || dentist.Salary}
                                                            onChange={(e) => handleInputChange(e, dentist.dentistID)}
                                                        />
                                                    ) : (
                                                        dentist.Salary
                                                    )}
                                                </td>
                                                <td className="border px-2 py-1">{formatActiveStatus(dentist.Is_active)}</td>
                                                <td className="border px-2 py-1 space-x-2">
                                                    {editMode && selectedDentistID === dentist.dentistID ? (
                                                        <>
                                                            <button onClick={handleConfirmEdit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Confirm</button>
                                                            <button onClick={handleCancelEdit} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Cancel</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                                                onClick={() => handleEditClick(dentist.dentistID)}>
                                                                Edit
                                                            </button>
                                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        {/* Staff Profiles */}
                        <div className="mt-8">
                            <h1 className="text-2xl font-bold mb-4">Staff Profiles</h1>
                            <div className="overflow-x-auto">
                                <table className="table-auto bg-white border border-gray-300 rounded-lg shadow-md">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="px-2 py-1">StaffID</th>
                                            <th className="px-2 py-1">First Name</th>
                                            <th className="px-2 py-1">Last Name</th>
                                            <th className="px-2 py-1">Email</th>
                                            <th className="px-2 py-1">Position</th>
                                            <th className="px-2 py-1">Phone</th>
                                            <th className="px-2 py-1">Address</th>
                                            <th className="px-2 py-1">DOB</th>
                                            <th className="px-2 py-1">Start Date</th>
                                            <th className="px-2 py-1">End Date</th>
                                            <th className="px-2 py-1">Salary</th>
                                            <th className="px-2 py-1">Active</th>
                                            <th className="px-2 py-1">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {staff.map(staffMember => (
                                            <tr key={staffMember.staffID} className="hover:bg-gray-100">
                                                <td className="border px-2 py-1">{staffMember.staffID}</td>
                                                <td className="border px-2 py-1">
                                                    {editModeStaff && selectedStaffID === staffMember.staffID ? (
                                                        <input
                                                            type="text"
                                                            name="FName"
                                                            value={editedStaffProfile.Fname || staffMember.Fname}
                                                            onChange={(e) => handleStaffInputChange(e, staffMember.staffID)}
                                                            style={{ width: "90%" }}
                                                        />
                                                    ) : (
                                                        staffMember.Fname
                                                    )}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {editModeStaff && selectedStaffID === staffMember.staffID ? (
                                                        <input
                                                            type="text"
                                                            name="LName"
                                                            value={editedStaffProfile.Lname || staffMember.Lname}
                                                            onChange={(e) => handleStaffInputChange(e, staffMember.staffID)}
                                                            style={{ width: "90%" }}
                                                        />
                                                    ) : (
                                                        staffMember.Lname
                                                    )}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {editModeStaff && selectedStaffID === staffMember.staffID ? (
                                                        <input
                                                            type="text"
                                                            name="Email"
                                                            value={editedStaffProfile.Email || staffMember.Email}
                                                            onChange={(e) => handleStaffInputChange(e, staffMember.staffID)}
                                                            style={{ width: "90%" }}
                                                        />
                                                    ) : (
                                                        staffMember.Email
                                                    )}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {editModeStaff && selectedStaffID === staffMember.staffID ? (
                                                        <select
                                                            name="Position"
                                                            value={editedStaffProfile.Position || staffMember.Position}
                                                            onChange={(e) => handleStaffInputChange(e, staffMember.staffID)}
                                                            style={{ width: "90%" }}
                                                        >
                                                            <option value="Receptionist">Receptionist</option>
                                                            <option value="Hygienist">Hygienist</option>
                                                        </select>
                                                    ) : (
                                                        staffMember.Position
                                                    )}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {editModeStaff && selectedStaffID === staffMember.staffID ? (
                                                        <input
                                                            type="text"
                                                            name="Phone_num"
                                                            value={editedStaffProfile.Phone_num || staffMember.Phone_num}
                                                            onChange={(e) => handleStaffInputChange(e, staffMember.staffID)}
                                                            style={{ width: "90%" }}
                                                        />
                                                    ) : (
                                                        staffMember.Phone_num
                                                    )}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {editModeStaff && selectedStaffID === staffMember.staffID ? (
                                                        <input
                                                            type="text"
                                                            name="Address"
                                                            value={editedStaffProfile.Address || staffMember.Address}
                                                            onChange={(e) => handleStaffInputChange(e, staffMember.staffID)}
                                                            style={{ width: "90%" }}
                                                        />
                                                    ) : (
                                                        staffMember.Address
                                                    )}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {editModeStaff && selectedStaffID === staffMember.staffID ? (
                                                        <input
                                                            type="date"
                                                            name="DOB"
                                                            value={editedStaffProfile.Start_date || new Date(staffMember.DOB).toISOString().substr(0, 10)}
                                                            onChange={(e) => handleStaffInputChange(e, staffMember.staffID)}
                                                        />
                                                    ) : (
                                                        new Date(staffMember.DOB).toLocaleDateString()
                                                    )}
                                                </td>
                                                <td className="border px-2 py-1">
                                                    {editModeStaff && selectedStaffID === staffMember.staffID ? (
                                                        <input
                                                            type="date"
                                                            name="Start_date"
                                                            value={editedStaffProfile.Start_date || new Date(staffMember.Start_date).toISOString().substr(0, 10)}
                                                            onChange={(e) => handleStaffInputChange(e, staffMember.staffID)}
                                                        />
                                                    ) : (
                                                        new Date(staffMember.Start_date).toLocaleDateString()
                                                    )}
                                                </td>
                                                <td className="border px-2 py-1">{staffMember.End_date ? new Date(staffMember.End_date).toLocaleDateString() : "N/A"}</td>
                                                <td className="border px-2 py-1">
                                                    {editModeStaff && selectedStaffID === staffMember.staffID ? (
                                                        <input
                                                            type="text"
                                                            name="Salary"
                                                            value={editedStaffProfile.Salary || staffMember.Salary}
                                                            onChange={(e) => handleStaffInputChange(e, staffMember.staffID)}
                                                        />
                                                    ) : (
                                                        staffMember.Salary
                                                    )}
                                                </td>
                                                <td className="border px-2 py-1">{formatActiveStatus(staffMember.Is_active)}</td>
                                                <td className="border px-2 py-1 space-x-2">
                                                    {editModeStaff && selectedStaffID === staffMember.staffID ? (
                                                        <>
                                                            <button onClick={handleConfirmEditStaff} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">Confirm</button>
                                                            <button onClick={handleCancelEditStaff} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Cancel</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                                                onClick={() => handleEditStaffClick(staffMember.staffID)}>
                                                                Edit
                                                            </button>
                                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>


                                </table>
                            </div>
                        </div>
                    </main>
                </div>

                <nav>
                    <Footer />
                </nav>
            </div>
        </>
    );
};

export default AdminStaff;
