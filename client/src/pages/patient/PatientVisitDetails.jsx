import React from "react";
import HeaderPortalPatient from "../../components/HeaderPortalPatient";
import Footer from "../../components/Footer";

const PatientVisitDetails = () => {
    // Sample for now
    const visitDetails = {
        dentistName: "Dr. Smith",
        staffName: "Mrs. Jones",
        date: "03-15-2024",
        time: "10:00 AM",
        type: "Routine Checkup",
        diagnosis: "Cavity forming on tooth 5",
        treatment: "Teeth Cleaning",
        location: "Dentist Office",
        notes: "No specific notes for this visit."
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
                            <li><a href="/patient/visit" className="block py-2 text-center font-bold underline">Visit Details</a></li>
                            <li><a href="/patient/history" className="block py-2 text-center text-gray-600 hover:text-black">Medical History</a></li>
                            <li><a href="/patient/prescriptions" className="block py-2 text-center text-gray-600 hover:text-black">Prescriptions</a></li>
                        </ul>
                    </nav>
                </aside>

                <main className="flex-1 p-4 mt-4">
                    <h1 className="text-3xl font-bold p-2 ml-8 mb-4">Your Visit Details</h1>

                    <div className="container mx-auto mt-4">
                        <div className="border border-gray-200 rounded p-4 mb-4">
                            <h2 className="text-lg font-semibold">Dentist: {visitDetails.dentistName}</h2>
                            <h2 className="text-lg font-semibold">Assisting Staff: {visitDetails.staffName}</h2>
                            <p className="text-sm text-gray-600">Date: {visitDetails.date}</p>
                            <p className="text-sm text-gray-600">Time: {visitDetails.time}</p>
                            {/* <p className="text-sm text-gray-600">Duration: {visitDetails.duration}</p> */}
                            <p className="text-sm text-gray-600">Visit Type: {visitDetails.type}</p>
                            <p className="text-sm text-gray-600">Diagnosis: {visitDetails.diagnosis}</p>
                            <p className="text-sm text-gray-600">Treatment: {visitDetails.treatment}</p>
                            <p className="text-sm text-gray-600">Location: {visitDetails.location}</p>
                            <p className="text-sm text-gray-600">Notes: {visitDetails.notes}</p>
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

export default PatientVisitDetails;
