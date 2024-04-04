import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderPortalAdmin from "../../components/HeaderPortalDoctor";
import Footer from "../../components/Footer";

const DoctorEditPrescriptions = () => {
  const { patientID } = useParams();
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in local storage");
        }

        const response = await fetch(
          `http://localhost:5000/api/doctor/patients/${patientID}/prescriptions`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setPrescriptions(data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, [patientID]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;
    return formattedMonth + "/" + formattedDay + "/" + year;
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <nav>
          <HeaderPortalAdmin />
        </nav>

        <div className="flex flex-1">
          <aside className="w-1/6 bg-gray-200 text-black">
            <nav className="p-4 text-xl">
              <ul>
                <li><a href="/doctor/home" className="block py-2 text-center text-gray-600 hover:text-black">Home</a></li>
                <li><a href="/doctor/appointments" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</a></li>
                <li><a href="/doctor/patients" className="block py-2 text-center font-bold underline">Patients</a></li>
              </ul>
            </nav>
          </aside>

          <main className="flex-1 p-4">
            <h1 className="text-3xl font-bold mb-4 p-8">Prescription Details</h1>
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-2">Prescriptions:</h2>
              {prescriptions.length > 0 ? (
                <ul>
                  {prescriptions.map((prescription) => (
                    <li key={prescription.id} className="mb-4">
                       <p>
                        <span className="font-semibold">Prescription ID:</span>{" "}
                        {prescription.prescriptionID}
                      </p>
                      <p>
                        <span className="font-semibold">Medication:</span>{" "}
                        {prescription.Medication_Name}
                      </p>
                      <p>
                        <span className="font-semibold">
                          National Drug Code:
                        </span>{" "}
                        {prescription.National_Drug_Code}
                      </p>
                      <p>
                        <span className="font-semibold">Dosage:</span>{" "}
                        {prescription.Medication_Dosage}
                      </p>
                      <p>
                        <span className="font-semibold">Refills:</span>{" "}
                        {prescription.Refills}
                      </p>
                      <p>
                        <span className="font-semibold">Notes:</span>{" "}
                        {prescription.notes}
                      </p>
                      <p>
                        <span className="font-semibold">Date prescribed:</span>{" "}
                        {formatDate(prescription.Date_prescribed)}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div>No prescriptions found</div>
              )}
            </div>

            <div className="mt-8">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit Prescriptions</button>
            </div>

            <div className="mt-8">
              <Link to={`/doctor/patients/${patientID}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Back to Patient {patientID}</Link>
            </div>
          </main>
        </div>
      </div>
      <nav>
        <Footer />
      </nav>
    </>
  );
};

export default DoctorEditPrescriptions;
