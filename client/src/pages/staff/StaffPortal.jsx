import React, { useEffect, useState } from 'react';
import HeaderPortalStaff from "../../components/HeaderPortalStaff";
import Footer from "../../components/Footer";

const StaffPortal = () => {
    const [staffName, setStaffName] = useState('Staff Name');

    useEffect(() => {
        // Retrieve first and last name from local storage
        const firstName = localStorage.getItem('firstName');
        const lastName = localStorage.getItem('lastName');
        // Check if both first and last name are available
        if (firstName && lastName) {
            setStaffName(`${firstName} ${lastName}`);
        }
    }, []);

    return (
        <>
            <div className="flex h-screen flex-col">
                <nav>
                    <HeaderPortalStaff />
                </nav>

                <div className="flex flex-1">
                    
                    <aside className="w-1/6 bg-gray-200 text-black">
                        <nav className="p-4 text-xl">
                            <ul>
                                <li><a href="#" className="block py-2 text-center font-bold underline">Home</a></li>
                                <li><a href="/staff/appointments" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</a></li>
                                <li><a href="/staff/patients" className="block py-2 text-center text-gray-600 hover:text-black">Patients</a></li>
                            </ul>
                        </nav>
                    </aside>
                    
                    
                    <main className="flex-1 p-4">
                        <h1 className="text-3xl font-bold mb-4 p-8">Welcome {staffName}!</h1>
                    </main>
                </div>

                <nav>
                    <Footer/>
                </nav>
            </div>
        </>
    );
};

export default StaffPortal;
