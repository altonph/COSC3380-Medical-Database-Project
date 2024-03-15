import React, { useState } from "react";
import HeaderPortalPatient from "../../components/HeaderPortalPatient";
import Footer from "../../components/Footer";

const HomePortal= () => {
    return (
        <>
            <div className="flex h-screen flex-col">
                <nav>
                    <HeaderPortalPatient />
                </nav>

                <div className="flex flex-1">
                    {/* sidebar */}
                    <aside className="w-1/6 bg-gray-200 text-black">
                        <nav className="p-4 text-xl">
                            <ul>
                                <li><a href="#" className="block py-2 text-center font-bold underline">Home</a></li>
                                <li><a href="/patient/appointment" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</a></li>
                                <li><a href="/patient/payment" className="block py-2 text-center text-gray-600 hover:text-black">Billing & Payments</a></li>
                                <li><a href="/patient/visit" className="block py-2 text-center text-gray-600 hover:text-black">Visit Details</a></li>
                                <li><a href="/patient/history" className="block py-2 text-center text-gray-600 hover:text-black">Medical History</a></li>
                                <li><a href="/patient/prescriptions" className= "block py-2 text-center text-gray-600 hover:text-black">Prescriptions</a></li>
                            </ul>
                        </nav>
                    </aside>
                    
                    {/* main section */}
                    <main className="flex-1 p-4">
                        {/* title */}
                        <h1 className="text-3xl font-bold mb-4 p-8">Welcome "Patient Name"!</h1>
                        
                        {/* Appointments */}
                        <h1 className= "text-xl font-bold pb-4 ml-4">Appointments</h1>
                        <div className= "flex p-4 justify-between border rounded-lg mx-8 px-4 py-2 bg-white py-4">
                            <p className= "ml-8 p-2 flex-grow">Need to schedule a new appointment?</p>
                            <a className="bg-blue-500 text-white px-4 py-2 mr-4 rounded-md hover:bg-blue-600 hover:text-white" href="/patient/appointment">Schedule Now</a>
                        </div>

                        {/* Visit Summary */}
                        <h1 className= "text-xl font-bold pt-16 py-4 ml-4">Recent Visit Summary</h1>
                        <p className= "ml-16 mb-8"> You don't have any recent visits.</p>

                        {/* Billing Summary */}
                        <h1 className= "text-xl font-bold pt-16 py-4 ml-4">Billing Summary</h1>
                        <p className= "ml-16 mb-8"> You don't have any bills due.</p>

                    </main>

                </div>

                <nav>
                    <Footer/>
                </nav>

            </div>

        </>
    );
};

export default HomePortal;