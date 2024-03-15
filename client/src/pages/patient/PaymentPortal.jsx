import React, { useState } from "react";
import HeaderPortalPatient from "../../components/HeaderPortalPatient";
import Footer from "../../components/Footer";

const PaymentPortal= () => {
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
                                <li><a href="/patient/payment" className="block py-2 text-center font-bold underline">Billing & Payments</a></li>
                                <li><a href="/patient/visit" className="block py-2 text-center text-gray-600 hover:text-black">Visit Details</a></li>
                                <li><a href="/patient/history" className="block py-2 text-center text-gray-600 hover:text-black">Medical History</a></li>
                                <li><a href="/patient/prescriptions" className= "block py-2 text-center text-gray-600 hover:text-black">Prescriptions</a></li>
                            </ul>
                        </nav>
                    </aside>
                    
                    {/* main section */}
                    <main className="flex-1 p-4">
                        {/* title */}
                        <h1 className="text-3xl font-bold p-8 ml-8">Billing & Payments</h1>
                        
                        {/* Note */}
                        <div className="ml-16">
                            <h1 className="font-bold pb-4">Note:</h1>
                            <p className="mb-4">
                                Or if you prefer, for information about your balance or to pay on your bill, 
                                you can reach our Customer Support from 8am-5pm CST by calling 123-456-7890. 
                                The Customer Support Team will be happy to answer your questions, set up a payment plan or 
                                take your payment over the phone using a credit card.
                            </p>
                            <p className="mb-8">
                                Please find below details on your current payments and billing history.
                            </p>
                        </div>

                        {/* Payments */}
                        <div className="ml-16">
                            <h1 className="text-xl font-bold pt-16 py-4">Payments</h1>

                            <table className="border-collapse border border-gray-400">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-400 px-20 py-2">Date</th>
                                        <th className="border border-gray-400 px-20 py-2">Description</th>
                                        <th className="border border-gray-400 px-20 py-2">Amount</th>
                                        {/* <th className="border border-gray-400 px-20 py-2">Make Payment</th> */}
                                    </tr>
                                </thead>
                                {/* sample table (edit with api calls) */}
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-400 px-20 py-4">03/12/2024</td>
                                        <td className="border border-gray-400 px-20 py-4">Dental Checkup</td>
                                        <td className="border border-gray-400 px-20 py-4">$50.00</td>
                                        <td className="border border-gray-400 px-20 py-4"><a href="#" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white">Make Payment</a></td>
                                    </tr>
                                </tbody>
                            </table>
                            
                        </div>

                        <p className= "ml-16 my-8"> You don't have any payments due.</p>

                        {/* Billing History */}
                        <div className="ml-16">
                            <h1 className="text-xl font-bold pt-16 py-4">Billing History</h1>

                            <table className="border-collapse border border-gray-400">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-400 px-20 py-2">Date</th>
                                        <th className="border border-gray-400 px-20 py-2">Description</th>
                                        <th className="border border-gray-400 px-20 py-2">Status</th>
                                        <th className="border border-gray-400 px-32 py-2">Amount</th>
                                    </tr>
                                </thead>
                                {/* sample table (edit with api calls) */}
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-400 px-20 py-4">03/12/2024</td>
                                        <td className="border border-gray-400 px-20 py-4">Dental Checkup</td>
                                        <td className="border border-gray-400 px-20 py-4 text-green-700">Paid</td>
                                        <td className="border border-gray-400 px-32 py-4">$50.00</td>
                                    </tr>
                                </tbody>
                            </table>
                            
                        </div>
                        
                        <p className= "ml-16 my-8"> You don't have any past payments.</p>

                        <h1 className= "text-xl font-bold pt-16 py-4 ml-16">Questions?</h1>
                        <p className= "ml-16 mb-8"> Call your practice at 123-456-7890 or email at shasta@shastadental.com.</p>

                    </main>

                </div>

                <nav>
                    <Footer/>
                </nav>

            </div>

        </>
    );
};

export default PaymentPortal;