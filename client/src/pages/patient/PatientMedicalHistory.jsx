import React from "react";
import HeaderPortalPatient from "../../components/HeaderPortalPatient";
import Footer from "../../components/Footer";

const PatientMedicalHistory = () => {
    const medicalHistory = {
        lastVisit: "2023-12-10",
        diagnosis: "No cavities found, mild gum inflammation",
        treatment: "Teeth cleaning, fluoride treatment",
        notes: "Recommend regular check-ups every 6 months."
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
                            <li><a href="/patient/history" className="block py-2 text-center font-bold underline">Medical History</a></li>
                            <li><a href="/patient/prescriptions" className="block py-2 text-center text-gray-600 hover:text-black">Prescriptions</a></li>
                        </ul>
                    </nav>
                </aside>

                <main className="flex-1 p-4 mt-4">
                    <h1 className="text-3xl font-bold p-2 ml-8 mb-4">Your Medical History</h1>

                    <div className="container mx-auto mt-4">
                        <div className="border border-gray-200 rounded p-4 mb-4">
                            <h2 className="text-lg font-semibold">Last Visit: {medicalHistory.lastVisit}</h2>
                            <p className="text-sm text-gray-600">Diagnosis: {medicalHistory.diagnosis}</p>
                            <p className="text-sm text-gray-600">Treatment: {medicalHistory.treatment}</p>
                            <p className="text-sm text-gray-600">Notes: {medicalHistory.notes}</p>
                        </div>
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
