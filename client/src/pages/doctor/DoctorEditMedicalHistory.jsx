import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderPortalAdmin from "../../components/HeaderPortalDoctor";
import Footer from "../../components/Footer";

const DoctorEditMedicalHistory = () => {
  const { patientID } = useParams();
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [editedMedicalHistory, setEditedMedicalHistory] = useState([]);
  const [isEditingMedicalHistory, setIsEditingMedicalHistory] = useState(false);

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found in local storage");
          return;
        }
        console.log("Fetching medical history for patient ", patientID);
        const response = await fetch(
          `http://localhost:5000/api/doctor/patients/${patientID}/medical-history`,
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
        setEditedMedicalHistory(data); 
      } catch (error) {
        console.error("Error fetching medical history:", error);
      }
    };

    fetchMedicalHistory();
  }, [patientID]);

  const handleChangeMedicalHistory = (index, field, value) => {
    const updatedMedicalHistory = [...editedMedicalHistory];
    updatedMedicalHistory[index][field] = value;
    setEditedMedicalHistory(updatedMedicalHistory);
  };

  const handleEditMedicalHistory = () => {
    setIsEditingMedicalHistory(true);
  };

  const handleSaveMedicalHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in local storage");
        return;
      }
  
      console.log("Data to be sent to the backend:", editedMedicalHistory);
  
      const response = await fetch(
        `http://localhost:5000/api/doctor/patients/${patientID}/medical-history`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedMedicalHistory),
        }
      );
      if (!response.ok) {
        throw new Error("Error updating medical history");
      }
      setIsEditingMedicalHistory(false);
    } catch (error) {
      console.error("Error saving medical history:", error);
    }
  };
  

  const handleCancelMedicalHistory = () => {
    setIsEditingMedicalHistory(false);
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
      <div className="flex flex-col h-screen">
        <nav>
          <HeaderPortalAdmin />
        </nav>

        <div className="flex flex-1">
          <aside className="w-1/6 bg-gray-200 text-black">
            <nav className="p-4 text-xl">
              <ul>
                <li>
                  <a
                    href="/doctor/home"
                    className="block py-2 text-center text-gray-600 hover:text-black"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/doctor/appointments"
                    className="block py-2 text-center text-gray-600 hover:text-black"
                  >
                    Appointments
                  </a>
                </li>
                <li>
                  <a
                    href="/doctor/patients"
                    className="block py-2 text-center font-bold underline"
                  >
                    Patients
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          <main className="flex-1 p-4">
            <h1 className="text-3xl font-bold mb-4 p-8">
              Edit Medical History
            </h1>
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-2">Medical History:</h2>
              {isEditingMedicalHistory || !medicalHistory || medicalHistory.length === 0 ? (
                <div>
                  {medicalHistory && medicalHistory.length === 0 ? (
                    <p>No medical history found</p>
                  ) : (
                    <ul>
                      {editedMedicalHistory.map((record, index) => (
                        <li key={index}>
                          <p>
                            <span className="font-semibold">Allergies:</span>
                            <input
                              type="text"
                              value={record.Allergies}
                              onChange={(e) =>
                                handleChangeMedicalHistory(
                                  index,
                                  "Allergies",
                                  e.target.value
                                )
                              }
                              className="border border-gray-400 p-1"
                              placeholder="Allergies"
                            />
                          </p>
                          <p>
                            <span className="font-semibold">Height:</span>
                            <input
                              type="number"
                              value={record.Feet}
                              onChange={(e) =>
                                handleChangeMedicalHistory(
                                  index,
                                  "Feet",
                                  e.target.value
                                )
                              }
                              className="border border-gray-400 p-1 mr-2"
                              placeholder="Feet"
                            />
                            feet
                            <input
                              type="number"
                              value={record.Inches}
                              onChange={(e) =>
                                handleChangeMedicalHistory(
                                  index,
                                  "Inches",
                                  e.target.value
                                )
                              }
                              className="border border-gray-400 p-1"
                              placeholder="Inches"
                            />
                            inches
                          </p>
                          <p>
                            <span className="font-semibold">Weight:</span>
                            <input
                              type="number"
                              value={record.Weight}
                              onChange={(e) =>
                                handleChangeMedicalHistory(
                                  index,
                                  "Weight",
                                  e.target.value
                                )
                              }
                              className="border border-gray-400 p-1"
                            />
                            lbs
                          </p>
                          <p>
                            <span className="font-semibold">Notes:</span>
                            <input
                              type="text"
                              value={record.Notes}
                              onChange={(e) =>
                                handleChangeMedicalHistory(
                                  index,
                                  "Notes",
                                  e.target.value
                                )
                              }
                              className="border border-gray-400 p-1"
                            />
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-4">
                    {isEditingMedicalHistory ? (
                      <>
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                          onClick={handleSaveMedicalHistory}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                          onClick={handleCancelMedicalHistory}
                        >
                          Cancel
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div>
                  <ul>
                    {medicalHistory.map((record, index) => (
                      <li key={index}>
                        <p>
                          <span className="font-semibold">Allergies:</span>{" "}
                          {record.Allergies}
                        </p>
                        <p>
                          <span className="font-semibold">Height:</span>{" "}
                          {record.Feet} feet {record.Inches} inches
                        </p>
                        <p>
                          <span className="font-semibold">Weight:</span>{" "}
                          {record.Weight} lbs
                        </p>
                        <p>
                          <span className="font-semibold">Notes:</span>{" "}
                          {record.Notes}
                        </p>
                        <p>
                          <span className="font-semibold">
                            Date created:
                          </span>{" "}
                          {formatDate(record.Date_Created)}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    {!isEditingMedicalHistory && (
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={handleEditMedicalHistory}
                      >
                        Edit Medical History
                      </button>
                    )}
                  </div>
                </div>
              )}
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

export default DoctorEditMedicalHistory;
