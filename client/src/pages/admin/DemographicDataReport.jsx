import React, { useState, useEffect } from 'react';
import HeaderPortalAdmin from '../../components/HeaderPortalAdmin';
import Footer from '../../components/Footer';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DemographicDataReport() {
return (
    <div className="flex h-screen flex-col">
        <nav><HeaderPortalAdmin /></nav>

        <div className="flex flex-1">
            {/* Sidebar */}
            <aside className="w-1/6 bg-gray-200 text-black">
                <nav className="p-4 text-xl">
                    <ul>
                    <li><a href="/admin/home" className="block py-2 text-center text-gray-600 hover:text-black">Home</a></li>
                    <li><a href="/admin/appointments" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</a></li>
                    <li><a href="/admin/patients" className="block py-2 text-center text-gray-600 hover:text-black">Patients</a></li>
                    <li><a href="/admin/dentists" className="block py-2 text-center text-gray-600 hover:text-black">Dentists</a></li>
                    <li><a href="/admin/staff" className="block py-2 text-center text-gray-600 hover:text-black">Staff</a></li>
                    <li><a href="/admin/appointment-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Appointment Data Report</a></li>
                    <li><a href="/admin/finance-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Finance Data Report</a></li>
                    <li><a href="/admin/demographic-data-report" className="block py-2 text-center font-bold underline">Demographic Data Report</a></li>
                </ul>
                </nav>
            </aside>

            <div className='content p-4 flex-1'>
                <h1 className='text-3xl font-bold mb-4 pt-8 pl-8'>Demographics</h1>

            </div>
        </div>
        <Footer />
    </div>
)
}

export default DemographicDataReport;