import React, { useState, useEffect } from "react";
import HeaderPortalAdmin from "../../components/HeaderPortalAdmin";
import Footer from "../../components/Footer";

const AdminPortal = () => {
    
    const [dentistID, setDentistID] = useState("");
    const [dentistName, setDentistName] = useState("");
    const [selectedOffice, setSelectedOffice] = useState("");
    const [selectedSchedule, setSelectedSchedule] = useState("");
    const [offices, setOffices] = useState([]);
    const [schedules, setSchedules] = useState([]);

    const handleAssignDentistToOffice = () => {
        // Handle assigning dentist to office
    };

    const handleAssignDentistSchedule = () => {
        // Handle assigning dentist schedule
    };

    // Dummy data for testing
    const dummyDentists = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" }
    ];

    const dummyOffices = [
        { id: 1, name: "Office 1" },
        { id: 2, name: "Office 2" }
    ];

    const dummySchedules = [
        { id: 1, name: "Schedule 1" },
        { id: 2, name: "Schedule 2" }
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
                                <li><a href="/admin/home" className="block py-2 text-center font-bold underline">Home</a></li>
                                <li><a href="/admin/appointments" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</a></li>
                                <li><a href="/admin/patients" className="block py-2 text-center text-gray-600 hover:text-black">Patients</a></li>
                                <li><a href="/admin/staff" className="block py-2 text-center text-gray-600 hover:text-black">Staff</a></li>
                                <li><a href="/admin/appointment-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Appointment Data Report</a></li>
                                <li><a href="/admin/finance-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Finance Data Report</a></li>
                                <li><a href="/admin/demographic-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Demographic Data Report</a></li>
                            </ul>
                        </nav>
                    </aside>
                    
                    {/* Main Section */}
                    <main className="flex-1 p-4">
                        {/* Assign Dentist to Office Form */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Assign Dentist to Office</h2>
                            <form onSubmit={handleAssignDentistToOffice}>
                                <div className="mb-4">
                                    <label htmlFor="dentistID" className="block text-sm font-medium text-gray-700">Dentist ID</label>
                                    <select id="dentistID" name="dentistID" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        {dummyDentists.map(dentist => (
                                            <option key={dentist.id} value={dentist.id}>{dentist.id}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* Add more form inputs for assigning dentist to office */}
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Assign</button>
                            </form>
                        </section>

                        {/* Assign Dentist Schedule Form */}
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Assign Dentist Schedule</h2>
                            <form onSubmit={handleAssignDentistSchedule}>
                                <div className="mb-4">
                                    <label htmlFor="dentistID" className="block text-sm font-medium text-gray-700">Dentist ID</label>
                                    <select id="dentistID" name="dentistID" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        {dummyDentists.map(dentist => (
                                            <option key={dentist.id} value={dentist.id}>{dentist.id}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* Add more form inputs for assigning dentist schedule */}
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Assign</button>
                            </form>
                        </section>

                        {/* View Dentists and Schedules */}
                        <section>
                            <h2 className="text-2xl font-bold mb-4">View Dentists and Schedules</h2>
                            {/* Table or list to display dentists and schedules */}
                            <table>
                                <thead>
                                    <tr>
                                        <th>Dentist ID</th>
                                        <th>Name</th>
                                        <th>Offices</th>
                                        <th>Schedule</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Map through data to display dentists and schedules */}
                                    <tr>
                                        <td>{dentistID}</td>
                                        <td>{dentistName}</td>
                                        <td>{selectedOffice}</td>
                                        <td>{selectedSchedule}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>

                    </main>
                </div>

                <nav>
                    <Footer/>
                </nav>
            </div>
        </>
    );
};

export default AdminPortal;
