import React, { useState, useEffect } from "react";
import HeaderPortalPatient from "../../components/HeaderPortalPatient";
import Footer from "../../components/Footer";

const PatientPrescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPrescriptions();
    }, []);

    const fetchPrescriptions = () => {
        const token = localStorage.getItem("token");
        fetch("https://cosc3380-medical-database-project-server.onrender.com/api/patient/prescriptions", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            setPrescriptions(data);
        })
        .catch(error => {
            console.error("Error fetching prescriptions:", error);
        });
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
                            <li><a href="/patient/appointment" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</a></li>
                            <li><a href="/patient/payment" className="block py-2 text-center text-gray-600 hover:text-black">Billing & Payments</a></li>
                            <li><a href="/patient/visit" className="block py-2 text-center text-gray-600 hover:text-black">Visit Details</a></li>
                            <li><a href="/patient/history" className="block py-2 text-center text-gray-600 hover:text-black">Medical History</a></li>
                            <li><a href="/patient/prescriptions" className="block py-2 text-center font-bold underline">Prescriptions</a></li>
                        </ul>
                    </nav>
                </aside>

                <main className="flex-1 p-4 mt-4">
                    <h1 className="text-3xl font-bold p-2 ml-8 mb-4">Your Prescriptions</h1>

                    <div className="container mx-auto mt-4">
                        {prescriptions.length > 0 ? (
                            prescriptions.map(prescription => (
                                <div key={prescription.prescriptionID} className="border border-gray-200 rounded p-4 mb-4 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-semibold">{prescription.Medication_Name}</h2>
                                        <p className="text-lg text-gray-600">National Drug Code: {prescription.National_Drug_Code}</p>
                                        <p className="text-lg text-gray-600">Dosage: {prescription.Medication_Dosage}</p>
                                        <p className="text-lg text-gray-600">Instructions: {prescription.notes}</p>
                                        <p className="text-lg text-gray-600">Prescribed by: Dr. {prescription.Doctor_FirstName} {prescription.Doctor_LastName}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="border border-gray-200 rounded p-4 mb-4">
                            <p className="text-lg font-semibold">No prescriptions found.</p>
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

export default PatientPrescriptions;