import React from "react";
import Header from "../../components/Header"; 

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
        <div>
            <Header />
            <div className="container mx-auto mt-20">
                <h1 className="text-2xl font-bold mb-6">Your Prescriptions</h1>
                <div>
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
            </div>
        </div>
    );
}

export default PatientPrescriptions;
