import React, { useEffect, useState } from 'react';
import HeaderPortalDoctor from "../../components/HeaderPortalDoctor";
import Footer from "../../components/Footer";

const DoctorPortal = () => {
    const [doctorName, setDoctorName] = useState('Doctor Name');

    useEffect(() => {
        // Retrieve first and last name from local storage
        const firstName = localStorage.getItem('firstName');
        const lastName = localStorage.getItem('lastName');
        // Check if both first and last name are available
        if (firstName && lastName) {
            setDoctorName(`${firstName} ${lastName}`);
        }
    }, []);


    return (
        <>
            <div className="flex h-screen flex-col">
                <nav>
                    <HeaderPortalDoctor />
                </nav>

                <div className="flex flex-1">
                    {/* Sidebar */}
                    <aside className="w-1/6 bg-gray-200 text-black">
                        <nav className="p-4 text-xl">
                            <ul>
                                <li><a href="#" className="block py-2 text-center font-bold underline">Home</a></li>
                                <li><a href="/doctor/appointments" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</a></li>
                                <li><a href="/doctor/patients" className="block py-2 text-center text-gray-600 hover:text-black">Patients</a></li>
                            </ul>
                        </nav>
                    </aside>
                    
                    {/* Main Section of Doctor Portal */}
                    <main className="flex-1 p-4">
                        <h1 className="text-3xl font-bold mb-4 p-8">Welcome Dr. {doctorName}!</h1>
                    </main>
                </div>

                <nav>
                    <Footer/>
                </nav>
            </div>
        </>
    );
};

export default DoctorPortal;
