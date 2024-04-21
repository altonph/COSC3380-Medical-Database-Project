import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderPortalAdmin from "../../components/HeaderPortalDoctor";
import Footer from "../../components/Footer";

const DoctorEditMedicalHistory = () => {
  const { patientID } = useParams();
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [editableMedicalHistory, setEditableMedicalHistory] = useState([]);

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in local storage");
        }

        const response = await fetch(
          `https://cosc3380-medical-database-project-server.onrender.com/api/doctor/patients/${patientID}/medical-history`,
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
        setMedicalHistory(data);
        setEditableMedicalHistory(data.map(history => ({ ...history, editable: false })));
      } catch (error) {
        console.error("Error fetching medical history:", error);
      }
    };

    fetchMedicalHistory();
  }, [patientID]);

  const handleEditClick = (index) => {
    const updatedEditableMedicalHistory = [...editableMedicalHistory];
    updatedEditableMedicalHistory[index].editable = true;
    setEditableMedicalHistory(updatedEditableMedicalHistory);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEditableMedicalHistory = [...editableMedicalHistory];
    updatedEditableMedicalHistory[index][name] = value;
    setEditableMedicalHistory(updatedEditableMedicalHistory);
  };

  const handleSaveClick = async (index) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in local storage");
      }

      const updatedHistory = editableMedicalHistory[index];
      const response = await fetch(
        `https://cosc3380-medical-database-project-server.onrender.com/api/doctor/patients/${patientID}/medical-history`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedHistory),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedMedicalHistory = [...medicalHistory];
      updatedMedicalHistory[index] = updatedHistory;
      setMedicalHistory(updatedMedicalHistory);

      const updatedEditableMedicalHistory = [...editableMedicalHistory];
      updatedEditableMedicalHistory[index].editable = false;
      setEditableMedicalHistory(updatedEditableMedicalHistory);
    } catch (error) {
      console.error("Error updating medical history:", error);
    }
  };

  const handleCancelClick = (index) => {
    const updatedEditableMedicalHistory = [...editableMedicalHistory];
    updatedEditableMedicalHistory[index].editable = false;
    setEditableMedicalHistory(updatedEditableMedicalHistory);
  };

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
            <h1 className="text-3xl font-bold mb-4 p-8">Medical History</h1>
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-2">Medical History:</h2>
              {medicalHistory.length > 0 ? (
                <ul>
                  {editableMedicalHistory.map((history, index) => (
                    <li key={history.recordsID} className="mb-4">
                      {history.editable ? (
                        <>
                          <div>
                            <p><span className="font-semibold">Date Created:</span>{" "}{formatDate(history.Date_Created)}</p>
                          </div>
                          <div>
                            <label htmlFor={`allergies${index}`} className="font-semibold">Allergies:{" "}</label>
                            <input type="text" id={`allergies${index}`} name="Allergies" value={history.Allergies} onChange={(e) => handleInputChange(e, index)} />
                          </div>
                          <div>
                            <p><span className="font-semibold">Height:</span></p>
                            <label htmlFor={`feet${index}`} className="font-semibold">Feet:{" "}</label>
                            <input type="number" id={`feet${index}`} name="Feet" value={history.Feet} onChange={(e) => handleInputChange(e, index)} />
                            <label htmlFor={`inches${index}`} className="font-semibold">Inches:{" "}</label>
                            <input type="number" id={`inches${index}`} name="Inches" value={history.Inches} onChange={(e) => handleInputChange(e, index)} />
                          </div>
                          <div>
                            <label htmlFor={`weight${index}`} className="font-semibold">Weight:{" "}</label>
                            <input type="number" id={`weight${index}`} name="Weight" value={history.Weight} onChange={(e) => handleInputChange(e, index)} />
                          </div>
                          <div>
                            <label htmlFor={`notes${index}`} className="font-semibold">Notes:{" "}</label>
                            <input type="text" id={`notes${index}`} name="Notes" value={history.Notes} onChange={(e) => handleInputChange(e, index)} />
                          </div>
                          <div className="mt-2">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => handleSaveClick(index)}>Save</button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2" onClick={() => handleCancelClick(index)}>Cancel</button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p><span className="font-semibold">Date Created:</span>{" "}{formatDate(history.Date_Created)}</p>
                          <p><span className="font-semibold">Allergies:</span>{" "}{history.Allergies}</p>
                          <p><span className="font-semibold">Height:</span></p>
                          <p><span className="font-semibold">Feet:</span>{" "}{history.Feet}{" "}<span className="font-semibold">Inches:</span>{" "}{history.Inches}</p>
                          <p><span className="font-semibold">Weight:</span>{" "}{history.Weight}</p>
                          <p><span className="font-semibold">Notes:</span>{" "}{history.Notes}</p>
                          <div className="mt-2">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => handleEditClick(index)}>Edit Medical History</button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div>No medical history found</div>
              )}
            </div>

            <div className="mt-8">
              <Link to={`/doctor/patients/${patientID}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Back to Patient {patientID}</Link>
              {medicalHistory.length === 0 && (
                <Link to={`/doctor/patients/${patientID}/add-medical-history`} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-4">Add Medical History</Link>
              )}
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default DoctorEditMedicalHistory;