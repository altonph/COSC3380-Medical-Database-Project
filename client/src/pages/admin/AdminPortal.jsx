import React from "react";
import HeaderPortalAdmin from "../../components/HeaderPortalAdmin";
import Footer from "../../components/Footer";

const AdminPortal = () => {
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
                                <li><a href="/admin/data-reports" className="block py-2 text-center text-gray-600 hover:text-black">Data Reports</a></li>
                            </ul>
                        </nav>
                    </aside>
                    
                    {/* Main Section of Home page */}
                    <main className="flex-1 p-4">
                        <h1 className="text-3xl font-bold mb-4 p-8">Admin Portal</h1>

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
