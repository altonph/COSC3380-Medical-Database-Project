import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TestPage = () => {
    return (
        <>
            <div classNameName="flex h-screen flex-col">
                <nav>
                    <Header />
                </nav>

                <div className="flex flex-1">

                    <aside className="w-1/6 bg-gray-200 text-black">
                        <nav className="p-4">
                            <ul>
                                <li><a href="#" className="block py-2">Home</a></li>
                                <li><a href="#" className="block py-2">Appointments</a></li>
                                <li><a href="#" className="block py-2">Billing & Payments</a></li>
                                <li><a href="#" className="block py-2">Visit Details</a></li>
                                <li><a href="#" className="block py-2">Medical History</a></li>
                            </ul>
                        </nav>
                    </aside>
                    
                    <main className="flex-1 p-4">
                        <h1 className="text-2xl font-bold mb-4">Home</h1>
                        <p>Template for patient portal</p>
                    </main>

                </div>

                <nav>
                    <Footer/>
                </nav>

            </div>

        </>
    );
};

export default TestPage;