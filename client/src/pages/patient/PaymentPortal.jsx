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
                                <li><a href="/patient/prescription" className= "block py-2 text-center text-gray-600 hover:text-black">Prescriptions</a></li>
                            </ul>
                        </nav>
                    </aside>
                    
                    {/* main section */}
                    <main className="flex-1 p-4">
                        {/* title */}
                        <h1 className="text-3xl font-bold p-8 ml-8">Billing & Payments</h1>
                        
                        {/* Note */}
                        <h1 className= "ml-16 font-bold pb-4">Note:</h1>
                        <p className= "ml-16 mb-4">
                        Or if you prefer, for information about your balance or to pay on your bill, 
                        you can reach our Customer Support from 8am-5pm CST by calling 123-456-7890. 
                        The Customer Support Team will be happy to answer your questions, set up a payment plan or 
                        take your payment over the phone using a credit card.
                        </p>
                        <p className= "ml-16 mb-8">
                            Please find below details on your account 
                            balance, payment history, and past statements.
                        </p>
                        

                        {/* Payments */}
                        <h1 className= "text-xl font-bold pt-16 py-4 ml-16">Payments</h1>
                        <p className= "ml-16 mb-8"> You don't have any payments due.</p>

                        {/* Billing History */}
                        <h1 className= "text-xl font-bold pt-16 py-4 ml-16">Billing History</h1>
                        <p className= "ml-16 mb-8"> You don't have any past payments.</p>

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