import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderPortalAdmin from "../../components/HeaderPortalDoctor";
import Footer from "../../components/Footer";

const DoctorEditVisitDetails = () => {
  const { patientID } = useParams();
  const [visitDetails, setVisitDetails] = useState([]);
  const [editableVisitDetails, setEditableVisitDetails] = useState([]);

  useEffect(() => {
    const fetchVisitDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in local storage");
        }

        const response = await fetch(
          `http://localhost:5000/api/doctor/patients/${patientID}/visit-details`,
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
        setVisitDetails(data);
        setEditableVisitDetails(data.map(detail => ({ ...detail, editable: false })));
      } catch (error) {
        console.error("Error fetching visit details:", error);
      }
    };

    fetchVisitDetails();
  }, [patientID]);

  const handleEditClick = (index) => {
    const updatedEditableVisitDetails = [...editableVisitDetails];
    updatedEditableVisitDetails[index].editable = true;
    setEditableVisitDetails(updatedEditableVisitDetails);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEditableVisitDetails = [...editableVisitDetails];
    updatedEditableVisitDetails[index][name] = value;
    setEditableVisitDetails(updatedEditableVisitDetails);
  };

  const handleSaveClick = async (index) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in local storage");
      }

      const updatedDetail = editableVisitDetails[index];
      const response = await fetch(
        `http://localhost:5000/api/doctor/patients/${patientID}/visit-details`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedDetail),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedVisitDetails = [...visitDetails];
      updatedVisitDetails[index] = updatedDetail;
      setVisitDetails(updatedVisitDetails);

      const updatedEditableVisitDetails = [...editableVisitDetails];
      updatedEditableVisitDetails[index].editable = false;
      setEditableVisitDetails(updatedEditableVisitDetails);
    } catch (error) {
      console.error("Error updating visit detail:", error);
    }
  };

  const handleCancelClick = (index) => {
    const updatedEditableVisitDetails = [...editableVisitDetails];
    updatedEditableVisitDetails[index].editable = false;
    setEditableVisitDetails(updatedEditableVisitDetails);
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
            <h1 className="text-3xl font-bold mb-4 p-8">Visit Details</h1>
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-2">Visit Details:</h2>
              {visitDetails.length > 0 ? (
                <ul>
                  {editableVisitDetails.map((detail, index) => (
                    <li key={detail.visitID} className="mb-4">
                      {detail.editable ? (
                        <>
                          <div>
                            <label htmlFor={`visitType${index}`} className="font-semibold">Visit Type:{" "}</label>
                            <select id={`visitType${index}`} name="Visit_Type" value={detail.Visit_Type} onChange={(e) => handleInputChange(e, index)}>
                              <option value="Checkup">Checkup</option>
                              <option value="Cleaning">Cleaning</option>
                              <option value="Filling">Filling</option>
                              <option value="Extraction">Extraction</option>
                              <option value="Root Canal">Root Canal</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor={`diagnosis${index}`} className="font-semibold">Diagnosis:{" "}</label>
                            <input type="text" id={`diagnosis${index}`} name="Diagnosis" value={detail.Diagnosis} onChange={(e) => handleInputChange(e, index)} />
                          </div>
                          <div>
                            <label htmlFor={`treatment${index}`} className="font-semibold">Treatment:{" "}</label>
                            <input type="text" id={`treatment${index}`} name="Treatment" value={detail.Treatment} onChange={(e) => handleInputChange(e, index)} />
                          </div>
                          <div>
                            <label htmlFor={`notes${index}`} className="font-semibold">Notes:{" "}</label>
                            <input type="text" id={`notes${index}`} name="Notes" value={detail.Notes} onChange={(e) => handleInputChange(e, index)} />
                          </div>
                          <div className="mt-2">
                            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={() => handleSaveClick(index)}>Save</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2" onClick={() => handleCancelClick(index)}>Cancel</button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p><span className="font-semibold">Visit Type:</span>{" "}{detail.Visit_Type}</p>
                          <p><span className="font-semibold">Diagnosis:</span>{" "}{detail.Diagnosis}</p>
                          <p><span className="font-semibold">Treatment:</span>{" "}{detail.Treatment}</p>
                          <p><span className="font-semibold">Notes:</span>{" "}{detail.Notes}</p>
                          <div className="mt-2">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => handleEditClick(index)}>Edit Visit Details</button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div>No visit details found</div>
              )}
            </div>
            
            <div className="mt-8">
              <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add New Visit Details for Patient {patientID}</button>
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

export default DoctorEditVisitDetails;
