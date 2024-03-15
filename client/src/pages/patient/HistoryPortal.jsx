import React, { useState } from "react";
import HeaderPortalPatient from "../../components/HeaderPortalPatient";
import Footer from "../../components/Footer";

const HistoryPortal= () => {
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
                                <li><a href="/patient/home" className="block py-2 text-center text-gray-600 hover:text-black">Home</a></li>
                                <li><a href="/patient/appointment" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</a></li>
                                <li><a href="/patient/payment" className="block py-2 text-center text-gray-600 hover:text-black">Billing & Payments</a></li>
                                <li><a href="/patient/visit" className="block py-2 text-center text-gray-600 hover:text-black">Visit Details</a></li>
                                <li><a href="/patient/history" className="block py-2 text-center font-bold underline">Medical History</a></li>
                                <li><a href="/patient/prescription" className= "block py-2 text-center text-gray-600 hover:text-black">Prescriptions</a></li>
                            </ul>
                        </nav>
                    </aside>
                    
                    {/* main section */}
                    <main className="flex-1 p-4">
                        {/* title */}
                        <h1 className="text-3xl font-bold ml-8 p-8">Medical History</h1>
    
                        <div className="ml-16 flex flex-wrap">
                            <div className="w-1/2">
                                <h1 className="text-xl font-bold pb-4">Date last updated:</h1>
                                <h2 className="text-lg font-bold pb-4">Height:</h2>
                                <h2 className="text-lg font-bold pb-4">Weight:</h2>
                                <h2 className="text-lg font-bold pb-4">Allergies:</h2>
                                <h2 className="text-lg font-bold pb-4">Note:</h2>
                            </div>
                            <div className="w-1/2">
                                <p>03/13/2024</p>
                                <p>82 inches</p>
                                <p>160.3 pounds</p>
                                <p>None</p>
                                <p>None</p>
                            </div>
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

export default HistoryPortal;