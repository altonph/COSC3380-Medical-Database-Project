import React from "react";
import HeaderPortalAdmin from "../../components/HeaderPortalAdmin";
import Footer from "../../components/Footer";

const AdminStaff = () => {
    // Dummy data for dentists
    const dentists = [
        {dentistID: 1, FName: "John", LName: "Doe", Specialty: "General Dentistry", Email: "johndoe@gmail.com", Phone_num: "1234567890", Address: "123 Main St", DOB: "1980-05-06", Start_date: "2015-01-01", End_date: null, Is_active: true, Salary: 80000},
        // Add more dentist data as needed
    ];

    // Dummy data for staff
    const staff = [
        {staffID: 1, officeID: 1, Fname: "Emily", Lname: "Smith", Email: "emilysmith@gmail.com", Phone_num: "9876543210", DOB: "1985-08-15", Address: "456 Oak St", Position: "Receptionist", Start_date: "2017-06-01", End_date: null, Is_active: true, Salary: 50000},
        // Add more staff data as needed
    ];

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
                                            <th className="px-2 py-1">Specialty</th>
                                            <th className="px-2 py-1">Email</th>
                                            <th className="px-2 py-1">Phone Number</th>
                                            <th className="px-2 py-1">Address</th>
                                            <th className="px-2 py-1">Date of Birth</th>
                                            <th className="px-2 py-1">Start Date</th>
                                            <th className="px-2 py-1">End Date</th>
                                            <th className="px-2 py-1">Is Active</th>
                                            <th className="px-2 py-1">Salary</th>
                                            <th className="px-2 py-1">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dentists.map(dentist => (
                                            <tr key={dentist.dentistID} className="hover:bg-gray-100">
                                                <td className="border px-2 py-1">{dentist.dentistID}</td>
                                                <td className="border px-2 py-1">{dentist.FName}</td>
                                                <td className="border px-2 py-1">{dentist.LName}</td>
                                                <td className="border px-2 py-1">{dentist.Specialty}</td>
                                                <td className="border px-2 py-1">{dentist.Email}</td>
                                                <td className="border px-2 py-1">{dentist.Phone_num}</td>
                                                <td className="border px-2 py-1">{dentist.Address}</td>
                                                <td className="border px-2 py-1">{dentist.DOB}</td>
                                                <td className="border px-2 py-1">{dentist.Start_date}</td>
                                                <td className="border px-2 py-1">{dentist.End_date}</td>
                                                <td className="border px-2 py-1">{dentist.Is_active ? "Yes" : "No"}</td>
                                                <td className="border px-2 py-1">{dentist.Salary}</td>
                                                <td className="border px-2 py-1 space-x-2">
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Edit</button>
                                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
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
                                            <th className="px-2 py-1">Position</th>
                                            <th className="px-2 py-1">Email</th>
                                            <th className="px-2 py-1">Phone Number</th>
                                            <th className="px-2 py-1">Address</th>
                                            <th className="px-2 py-1">Date of Birth</th>

                                            <th className="px-2 py-1">Start Date</th>
                                            <th className="px-2 py-1">End Date</th>
                                            <th className="px-2 py-1">Is Active</th>
                                            <th className="px-2 py-1">Salary</th>
                                            <th className="px-2 py-1">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {staff.map(staffMember => (
                                            <tr key={staffMember.staffID} className="hover:bg-gray-100">
                                                <td className="border px-2 py-1">{staffMember.staffID}</td>
                                                <td className="border px-2 py-1">{staffMember.Fname}</td>
                                                <td className="border px-2 py-1">{staffMember.Lname}</td>
                                                <td className="border px-2 py-1">{staffMember.Position}</td>
                                                <td className="border px-2 py-1">{staffMember.Email}</td>
                                                <td className="border px-2 py-1">{staffMember.Phone_num}</td>
                                                <td className="border px-2 py-1">{staffMember.Address}</td>
                                                <td className="border px-2 py-1">{staffMember.DOB}</td>
                                                <td className="border px-2 py-1">{staffMember.Start_date}</td>
                                                <td className="border px-2 py-1">{staffMember.End_date}</td>
                                                <td className="border px-2 py-1">{staffMember.Is_active ? "Yes" : "No"}</td>
                                                <td className="border px-2 py-1">{staffMember.Salary}</td>
                                                <td className="border px-2 py-1 space-x-2">
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Edit</button>
                                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
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
                    <Footer/>
                </nav>
            </div>
        </>
    );
};

export default AdminStaff;
