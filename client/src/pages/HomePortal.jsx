import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePortal= () => {
    return (
        <>
            <div className="flex h-screen flex-col">
                <nav>
                    <Header />
                </nav>

                <div className="flex flex-1">

                    <aside className="w-1/6 bg-gray-200 text-black">
                        <nav className="p-4 text-xl">
                            <ul>
                                <li><a href="#" className="block py-2 text-center font-bold underline">Home</a></li>
                                <li><a href="#" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</a></li>
                                <li><a href="#" className="block py-2 text-center text-gray-600 hover:text-black">Billing & Payments</a></li>
                                <li><a href="#" className="block py-2 text-center text-gray-600 hover:text-black">Visit Details</a></li>
                                <li><a href="#" className="block py-2 text-center text-gray-600 hover:text-black">Medical History</a></li>
                                <li><a href="#" className= "block py-2 text-center text-gray-600 hover:text-black">Prescriptions</a></li>
                            </ul>
                        </nav>
                    </aside>
                    
                    <main className="flex-1 p-4">
                        <h1 className="text-3xl font-bold mb-4 p-8">Welcome "Patient Name"!</h1>
                        
                        <h1 className= "text-xl font-bold pb-4 ml-4">Appointments</h1>

                        <div className= "flex p-4 justify-between border rounded-lg mx-8 px-4 py-2 bg-white py-4">
        
                                <p className= "ml-8 p-2 flex-grow">Need to schedule a new appointment?</p>
                                <button className="bg-blue-500 text-white px-4 py-2 mr-4 rounded-md hover:bg-blue-600 hover:text-white">Schedule Now</button>
                            
                        </div>

                        
                        <h1 className= "text-xl font-bold py-8 ml-4">Recent Visit Summary</h1>
                        <div className="p-4 bg-white rounded-lg mx-8 mb-8">
                            <p>visit summary details here</p>
                        </div>

                        <h1 className= "text-xl font-bold pb-8 ml-4">Billing Summary</h1>

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