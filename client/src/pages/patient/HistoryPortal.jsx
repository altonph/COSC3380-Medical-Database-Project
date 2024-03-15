import React from "react";
import HeaderPortalPatient from "../../components/HeaderPortalPatient";
import Footer from "../../components/Footer";

const HistoryPortal = () => {
  const medicalHistory = {
    dateLastUpdated: "10/12/2023",
    height: "82 inches",
    weight: "160 lbs",
    allergies: "N/A",
    notes: "Hypertension"
  };

  // Check if medical history exists
  const hasMedicalHistory = Object.keys(medicalHistory).length > 0;

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
                <li><a href="/patient/payment" className="block py-2 text-center text-gray-600 hover:text-black">Billing & Payments</a></li>
                <li><a href="/patient/visit" className="block py-2 text-center text-gray-600 hover:text-black">Visit Details</a></li>
                <li><a href="/patient/history" className="block py-2 text-center font-bold underline">Medical History</a></li>
                <li><a href="/patient/prescriptions" className="block py-2 text-center text-gray-600 hover:text-black">Prescriptions</a></li>
              </ul>
            </nav>
          </aside>

          {/* main section */}
          <main className="flex-1 p-4">
            {/* title */}
            <h1 className="text-3xl font-bold ml-8 p-8">Your Medical History</h1>

            {/* Medical History Table */}
            {hasMedicalHistory ? (
              <div className="container mx-auto mt-4">
                <div className="border border-gray-200 rounded p-4 mb-4">
                    <h2 className="text-2xl ml-11 pb-4">Date Last Updated: {medicalHistory.dateLastUpdated}</h2>
                    <h2 className="text-2xl ml-11 pb-4">Height: {medicalHistory.height}</h2>
                    <p className="text-2xl ml-11 pb-4">Weight: {medicalHistory.weight}</p>
                    <p className="text-2xl ml-11 pb-4">Allergies: {medicalHistory.allergies}</p>
                    <p className="text-2xl ml-11 pb-4">Note: {medicalHistory.notes}</p>
                </div>
          </div>
            ) : (
              <p className="ml-16">You don't have a medical history.</p>
            )}
          </main>
        </div>

        <nav>
          <Footer />
        </nav>
      </div>
    </>
  );
};

export default HistoryPortal;
