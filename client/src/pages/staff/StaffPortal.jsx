import React from "react";
import HeaderPortalStaff from "../../components/HeaderPortalStaff";
import Footer from "../../components/Footer";

const StaffPortal = () => {
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
                                <li><a href="/staff/medical-records" className="block py-2 text-center text-gray-600 hover:text-black">Medical Records</a></li>
                                <li><a href="/staff/data-reports" className="block py-2 text-center text-gray-600 hover:text-black">Data Reports</a></li>
                            </ul>
                        </nav>
                    </aside>
                    
                    
                    <main className="flex-1 p-4">
                        <h1 className="text-3xl font-bold mb-4 p-8">Staff Portal</h1>
                        
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
