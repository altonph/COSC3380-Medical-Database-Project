import React from "react";
import HeaderPortalAdmin from "../../components/HeaderPortalAdmin";
import Footer from "../../components/Footer";

const AdminStaff = () => {

    const staff = [
        {dentistID: 2, officeID: 1, FName: "John", LName: "Doe", Specialty: "General Dentistry", Email: "johndoe@gmail.com", PhoneNum: 123456789, Address: "123 Main St", DOB: "05/06/1980", StartDate: "01/01/2015", EndDate: "N/A", IsActive: true, Salary: 80000},
        {dentistID: 3, officeID: 2, FName: "Jane", LName: "Smith", Specialty: "Orthodontics", Email: "janesmith@gmail.com", PhoneNum: 987654321, Address: "456 Oak St", DOB: "10/15/1975", StartDate: "06/01/2018", EndDate: "N/A", IsActive: true, Salary: 90000},
        {dentistID: 4, officeID: 3, FName: "Michael", LName: "Johnson", Specialty: "Pediatric Dentistry", Email: "michaeljohnson@gmail.com", PhoneNum: 5551234567, Address: "789 Elm St", DOB: "03/15/1985", StartDate: "03/01/2016", EndDate: "N/A", IsActive: true, Salary: 85000},
        {dentistID: 5, officeID: 1, FName: "Emily", LName: "Brown", Specialty: "Periodontics", Email: "emilybrown@gmail.com", PhoneNum: 4449876543, Address: "234 Pine St", DOB: "07/20/1990", StartDate: "12/01/2017", EndDate: "N/A", IsActive: true, Salary: 95000},
        {dentistID: 6, officeID: 2, FName: "David", LName: "Taylor", Specialty: "Endodontics", Email: "davidtaylor@gmail.com", PhoneNum: 2223456789, Address: "345 Cedar St", DOB: "11/25/1983", StartDate: "09/01/2019", EndDate: "N/A", IsActive: true, Salary: 100000}
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
                            </ul>
                        </nav>
                    </aside>
                    
                    {/* Main Section */}
                    <main className="flex-1 p-4">
                        <h1 className="text-3xl font-bold mb-4 p-8">Staff Overview</h1>
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-sm">DentistID</th>
                                    <th className="px-4 py-2 text-sm">OfficeID</th>
                                    <th className="px-4 py-2 text-sm">FirstName</th>
                                    <th className="px-4 py-2 text-sm">LastName</th>
                                    <th className="px-4 py-2 text-sm">Specialty</th>
                                    <th className="px-4 py-2 text-sm">Email</th>
                                    <th className="px-4 py-2 text-sm">PhoneNum</th>
                                    <th className="px-4 py-2 text-sm">Address</th>
                                    <th className="px-4 py-2 text-sm">DOB</th>
                                    <th className="px-4 py-2 text-sm">StartDate</th>
                                    <th className="px-4 py-2 text-sm">EndDate</th>
                                    <th className="px-4 py-2 text-sm">IsActive</th>
                                    <th className="px-4 py-2 text-sm">Salary</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staff.map(person => (
                                    <tr key={person.dentistID}>
                                        <td className="border px-4 py-2 text-xs">{person.dentistID}</td>
                                        <td className="border px-4 py-2 text-xs">{person.officeID}</td>
                                        <td className="border px-4 py-2 text-xs">{person.FName}</td>
                                        <td className="border px-4 py-2 text-xs">{person.LName}</td>
                                        <td className="border px-4 py-2 text-xs">{person.Specialty}</td>
                                        <td className="border px-4 py-2 text-xs">{person.Email}</td>
                                        <td className="border px-4 py-2 text-xs">{person.PhoneNum}</td>
                                        <td className="border px-4 py-2 text-xs">{person.Address}</td>
                                        <td className="border px-4 py-2 text-xs">{person.DOB}</td>
                                        <td className="border px-4 py-2 text-xs">{person.StartDate}</td>
                                        <td className="border px-4 py-2 text-xs">{person.EndDate}</td>
                                        <td className="border px-4 py-2 text-xs">{person.IsActive.toString()}</td>
                                        <td className="border px-4 py-2 text-xs">{person.Salary}</td>
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

export default AdminStaff;
