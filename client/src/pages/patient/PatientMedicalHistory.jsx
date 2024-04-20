import React, { useState, useEffect } from "react";
import HeaderPortalPatient from "../../components/HeaderPortalPatient";
import Footer from "../../components/Footer";

const PatientMedicalHistory = () => {
    const [medicalHistory, setMedicalHistory] = useState([]);

    useEffect(() => {
        const fetchMedicalHistory = async () => {
            try {
                const response = await fetch('https://cosc3380-medical-database-project-server.onrender.com/api/patient/medical-history', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` 
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch medical history');
                }

                const data = await response.json();
                setMedicalHistory(data);
                console.log('Medical History:', data);
            } catch (error) {
                console.error('Error fetching medical history:', error.message);
            }
        };

        fetchMedicalHistory();
    }, []);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }

    return (
        <div className="flex h-screen flex-col">
            <nav>
                <HeaderPortalPatient />
            </nav>

            <div className="flex flex-1">
                <aside className="w-1/6 bg-gray-200 text-black">
                    <nav className="p-4 text-xl">
                        <ul>
                            <li><a href="/patient/home" className="block py-2 text-center text-gray-600 hover:text-black">Home</a></li>
                            <li><a href="/patient/appointment" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</a></li>
                            <li><a href="/patient/payment" className="block py-2 text-center text-gray-600 hover:text-black">Billing & Payments</a></li>
                            <li><a href="/patient/visit" className="block py-2 text-center text-gray-600 hover:text-black">Visit Details</a></li>
                            <li><a href="/patient/history" className="block py-2 text-center font-bold underline">Medical History</a></li>
                            <li><a href="/patient/prescriptions" className="block py-2 text-center text-gray-600 hover:text-black">Prescriptions</a></li>
                        </ul>
                    </nav>
                </aside>

                <main className="flex-1 p-4 mt-4">
                <h1 className="text-3xl font-bold p-2 ml-8 mb-4">Your Medical History</h1>

                <div className="container mx-auto mt-4">
                    {medicalHistory.length > 0 ? (
                        medicalHistory.map((historyItem, index) => (
                            <div key={index} className="border border-gray-200 rounded p-4 mb-4">
                                <h2 className="text-lg font-semibold">Date Created: {formatDate(historyItem.Date_Created)}</h2>
                                <p className="text-lg text-gray-600">Allergies: {historyItem.Allergies}</p>
                                <p className="text-lg text-gray-600">Height: {historyItem.Feet} feet {historyItem.Inches} inches</p>
                                <p className="text-lg text-gray-600">Weight: {historyItem.Weight} lbs</p>
                                <p className="text-lg text-gray-600">Notes: {historyItem.Notes}</p>
                            </div>
                        ))
                    ) : (
                        <div className="border border-gray-200 rounded p-4 mb-4">
                            <p className="text-lg font-semibold">No medical history found.</p>
                        </div>
                    )}
                </div>
            </main>

            </div>

            <nav>
                <Footer />
            </nav>
        </div>
    );
};

export default PatientMedicalHistory;