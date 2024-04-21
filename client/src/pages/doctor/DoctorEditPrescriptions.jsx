import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderPortalAdmin from "../../components/HeaderPortalDoctor";
import Footer from "../../components/Footer";

const DoctorEditPrescriptions = () => {
  const { patientID } = useParams();
  const [prescriptions, setPrescriptions] = useState([]);
  const [editablePrescriptions, setEditablePrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in local storage");
        }

        const response = await fetch(
          `https://cosc3380-medical-database-project-server.onrender.com/api/doctor/patients/${patientID}/prescriptions`,
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
        setEditablePrescriptions(data.map(prescription => ({...prescription, editable: false})));
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

  const handleEditClick = (index) => {
    const updatedEditablePrescriptions = [...editablePrescriptions];
    updatedEditablePrescriptions[index].editable = true;
    setEditablePrescriptions(updatedEditablePrescriptions);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEditablePrescriptions = [...editablePrescriptions];
    updatedEditablePrescriptions[index][name] = value;
    setEditablePrescriptions(updatedEditablePrescriptions);
  };

  const handleSaveClick = async (index) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in local storage");
      }

      const updatedPrescription = editablePrescriptions[index];
      const response = await fetch(
        `https://cosc3380-medical-database-project-server.onrender.com/api/doctor/patients/${patientID}/prescriptions`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedPrescription),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedPrescriptions = [...prescriptions];
      updatedPrescriptions[index] = updatedPrescription;
      setPrescriptions(updatedPrescriptions);

      const updatedEditablePrescriptions = [...editablePrescriptions];
      updatedEditablePrescriptions[index].editable = false;
      setEditablePrescriptions(updatedEditablePrescriptions);
    } catch (error) {
      console.error("Error updating prescription:", error);
    }
  };

  const handleCancelClick = (index) => {
    const updatedEditablePrescriptions = [...editablePrescriptions];
    updatedEditablePrescriptions[index].editable = false;
    setEditablePrescriptions(updatedEditablePrescriptions);
  };

  return (
    <>
      <HeaderPortalAdmin />

      <div className="flex flex-col min-h-screen">
        <div className="flex-1 flex">
          <aside className="w-1/6 bg-gray-200 text-black">
            <nav className="p-4 text-xl">
              <ul>
                <li><a href="/doctor/home" className="block py-2 text-center text-gray-600 hover:text-black">Home</a></li>
                <li><a href="/doctor/appointments" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</a></li>
                <li><a href="/doctor/patients" className="block py-2 text-center font-bold underline">Patients</a></li>
              </ul>
            </nav>
          </aside>

          <main className="flex-1 p-4 overflow-y-auto">
            <h1 className="text-3xl font-bold mb-4 p-8">Prescription Details</h1>
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-2">Prescriptions:</h2>
              {prescriptions.length > 0 ? (
                <ul>
                  {editablePrescriptions.map((prescription, index) => (
                    <li key={prescription.id} className="mb-4">
                      {prescription.editable ? (
                        <>
                          <p><span className="font-semibold">Prescription ID:</span>{" "}{prescription.prescriptionID}</p>
                          <div className="flex flex-col space-y-2">
                            <div>
                              <label htmlFor={`medicationName${index}`} className="font-semibold">Medication:{" "}</label>
                              <input type="text" id={`medicationName${index}`} name="Medication_Name" value={prescription.Medication_Name} onChange={(e) => handleInputChange(e, index)} />
                            </div>
                            <div>
                              <label htmlFor={`drugCode${index}`} className="font-semibold">National Drug Code:{" "}</label>
                              <input type="text" id={`drugCode${index}`} name="National_Drug_Code" value={prescription.National_Drug_Code} onChange={(e) => handleInputChange(e, index)} />
                            </div>
                            <div>
                              <label htmlFor={`medicationDosage${index}`} className="font-semibold">Dosage:{" "}</label>
                              <input type="text" id={`medicationDosage${index}`} name="Medication_Dosage" value={prescription.Medication_Dosage} onChange={(e) => handleInputChange(e, index)} />
                            </div>
                            <div>
                              <label htmlFor={`refills${index}`} className="font-semibold">Refills:{" "}</label>
                              <input type="text" id={`refills${index}`} name="Refills" value={prescription.Refills} onChange={(e) => handleInputChange(e, index)} />
                            </div>
                            <div>
                              <label htmlFor={`notes${index}`} className="font-semibold">Notes:{" "}</label>
                              <input type="text" id={`notes${index}`} name="notes" value={prescription.notes} onChange={(e) => handleInputChange(e, index)} />
                            </div>
                          </div>
                          <div className="mt-2">
                            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={() => handleSaveClick(index)}>Save</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2" onClick={() => handleCancelClick(index)}>Cancel</button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p><span className="font-semibold">Prescription ID:</span>{" "}{prescription.prescriptionID}</p>
                          <p><span className="font-semibold">Medication:</span>{" "}{prescription.Medication_Name}</p>
                          <p><span className="font-semibold">National Drug Code:</span>{" "}{prescription.National_Drug_Code}</p>
                          <p><span className="font-semibold">Dosage:</span>{" "}{prescription.Medication_Dosage}</p>
                          <p><span className="font-semibold">Refills:</span>{" "}{prescription.Refills}</p>
                          <p><span className="font-semibold">Notes:</span>{" "}{prescription.notes}</p>
                          <p><span className="font-semibold">Date prescribed:</span>{" "}
                            {formatDate(prescription.Date_prescribed)}</p>
                          <div className="mt-2">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => handleEditClick(index)}>Edit</button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div>No prescriptions found</div>
              )}
            </div>
            
            <div className="mt-8">
              <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add New Prescription for Patient {patientID}</button>
            </div>
            <div className="mt-8">
              <Link to={`/doctor/patients/${patientID}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Back to Patient {patientID}</Link>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default DoctorEditPrescriptions;