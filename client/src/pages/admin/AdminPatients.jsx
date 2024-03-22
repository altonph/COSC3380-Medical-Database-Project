import React from "react";
import HeaderPortalAdmin from "../../components/HeaderPortalAdmin";
import Footer from "../../components/Footer";

const AdminPatients = () => {

    const patients = [
        {patientID: 12345, insuranceID: 1, dentistID: 2, Gender: "Male", FName: "John", LName: "Apple", DOB: "05/06/1991", Email: "johnapple@gmail.com", Phone_num: 123456789, Address: "12 Calhoun Rd"},
        {patientID: 54321, insuranceID: 2, dentistID: 1, Gender: "Female", FName: "Jane", LName: "Apple", DOB: "10/05/1981", Email: "janeapple@gmail.com", Phone_num: 987654321, Address: "5543 Houston St"},
        {patientID: 9876, insuranceID: 3, dentistID: 3, Gender: "Male", FName: "Michael", LName: "Smith", DOB: "03/15/1975", Email: "michaelsmith@gmail.com", Phone_num: 5551234567, Address: "789 Elm St"},
        {patientID: 5432, insuranceID: 4, dentistID: 4, Gender: "Female", FName: "Emily", LName: "Johnson", DOB: "07/20/1988", Email: "emilyjohnson@gmail.com", Phone_num: 4449876543, Address: "456 Pine St"},
        {patientID: 4567, insuranceID: 2, dentistID: 1, Gender: "Male", FName: "David", LName: "Brown", DOB: "11/25/1965", Email: "davidbrown@gmail.com", Phone_num: 2223456789, Address: "234 Oak St"}
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
                                <li><a href="/admin/patients" className="block py-2 text-center font-bold underline">Patients</a></li>
                                <li><a href="/admin/staff" className="block py-2 text-center text-gray-600 hover:text-black">Staff</a></li>
                                <li><a href="/admin/data-reports" className="block py-2 text-center text-gray-600 hover:text-black">Data Reports</a></li>
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
                                </tr>
                            </thead>
                            <tbody>
                                {patients.map(patient => (
                                    <tr key={patient.patientID}>
                                        <td className="border px-4 py-2 text-xs">{patient.patientID}</td>
                                        <td className="border px-4 py-2 text-xs">{patient.insuranceID}</td>
                                        <td className="border px-4 py-2 text-xs">{patient.dentistID}</td>
                                        <td className="border px-4 py-2 text-xs">{patient.Gender}</td>
                                        <td className="border px-4 py-2 text-xs">{patient.FName}</td>
                                        <td className="border px-4 py-2 text-xs">{patient.LName}</td>
                                        <td className="border px-4 py-2 text-xs">{patient.DOB}</td>
                                        <td className="border px-4 py-2 text-xs">{patient.Email}</td>
                                        <td className="border px-4 py-2 text-xs">{patient.Phone_num}</td>
                                        <td className="border px-4 py-2 text-xs">{patient.Address}</td>
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

export default AdminPatients;
