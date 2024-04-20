import React, { useEffect, useState } from "react";
import HeaderPortalPatient from "../../components/HeaderPortalPatient";
import Footer from "../../components/Footer";

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    let hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    if (hour > 12) {
        hour -= 12;
    } else if (hour === 0) {
        hour = 12;
    }
    return `${hour}:${minutes} ${period}`;
}

const PatientVisitDetails = () => {
    const [visitDetails, setVisitDetails] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token"); 
        fetch("https://cosc3380-medical-database-project-server.onrender.com/api/patient/visit-details", {
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
            setVisitDetails(data);
            console.log(data);
        })
        .catch(error => {
            console.error("Error fetching visit details:", error);
        });
    }, []);

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
                    {visitDetails.length > 0 ? (
                        visitDetails.map((detail, index) => (
                            <div key={index} className="border border-gray-200 rounded p-4 mb-4">
                                <h2 className="text-lg font-semibold">Doctor: {detail.Dentist_FirstName} {detail.Dentist_LastName}</h2>
                                <h2 className="text-lg font-semibold">Assisting Staff: {detail.Staff_FirstName} {detail.Staff_LastName}</h2>
                                <p className="text-sm text-gray-600">Date: {formatDate(detail.Date)}</p>
                                <p className="text-sm text-gray-600">Appointment Type: {detail.Appointment_type}</p>
                                <p className="text-sm text-gray-600">Start Time: {formatTime(detail.Start_time)}</p>
                                <p className="text-sm text-gray-600">Diagnosis: {detail.Diagnosis}</p>
                                <p className="text-sm text-gray-600">Treatment: {detail.Treatment}</p>
                                <p className="text-sm text-gray-600">Notes: {detail.Notes}</p>
                            </div>
                        ))
                    ) : (
                        <div className="border border-gray-200 rounded p-4 mb-4">
                            <p className="text-lg font-semibold">No visit details found.</p>
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

export default PatientVisitDetails;