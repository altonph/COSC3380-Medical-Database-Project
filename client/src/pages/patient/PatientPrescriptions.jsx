import React from "react";
import HeaderPortalPatient from "../../components/HeaderPortalPatient";
import Footer from "../../components/Footer";

const PatientPrescriptions = () => {
    // Sample prescriptions data, can be updated to fetch from DB
    const prescriptions = [
        { id: 1, medication: "Medication A", dosage: "10mg", instructions: "Take twice daily" },
        { id: 2, medication: "Medication B", dosage: "20mg", instructions: "Take once daily" },
        { id: 3, medication: "Medication C", dosage: "5mg", instructions: "Take with food" }
    ];

    const handleRefillRequest = (prescriptionId) => {
        console.log("Refill requested for prescription with ID:", prescriptionId);
    };

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
                            <li><a href="/patient/appointment" className="block py-2 text-center font-bold underline">Appointments</a></li>
                            <li><a href="/patient/payment" className="block py-2 text-center text-gray-600 hover:text-black">Billing & Payments</a></li>
                            <li><a href="/patient/visit" className="block py-2 text-center text-gray-600 hover:text-black">Visit Details</a></li>
                            <li><a href="/patient/history" className="block py-2 text-center text-gray-600 hover:text-black">Medical History</a></li>
                            <li><a href="/patient/prescriptions" className="block py-2 text-center text-gray-600 hover:text-black">Prescriptions</a></li>
                        </ul>
                    </nav>
                </aside>

                <main className="flex-1 p-4 mt-4">
                    <h1 className="text-3xl font-bold p-2 ml-8 mb-4">Your Prescriptions</h1>

                    <div className="container mx-auto mt-4">
                        {prescriptions.map(prescription => (
                            <div key={prescription.id} className="border border-gray-200 rounded p-4 mb-4 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold">{prescription.medication}</h2>
                                    <p className="text-sm text-gray-600">Dosage: {prescription.dosage}</p>
                                    <p className="text-sm text-gray-600">Instructions: {prescription.instructions}</p>
                                </div>
                                <button
                                    onClick={() => handleRefillRequest(prescription.id)}
                                    className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    Request Refill
                                </button>
                            </div>
                        ))}
                        {prescriptions.length === 0 && <p>No prescriptions found.</p>}
                    </div>
                </main>
            </div>

            <nav>
                <Footer />
            </nav>
        </div>
    );
};

export default PatientPrescriptions;
