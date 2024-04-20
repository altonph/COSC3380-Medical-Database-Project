import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderPortalAdmin from "../../components/HeaderPortalDoctor";
import Footer from "../../components/Footer";

const DoctorEditPatientInformation = () => {
  const { patientID } = useParams();
  const [patientInfo, setPatientInfo] = useState({});
  const [editablePatientInfo, setEditablePatientInfo] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in local storage");
        }

        const response = await fetch(
          `https://cosc3380-medical-database-project-server.onrender.com/api/doctor/patients/${patientID}`,
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
        setPatientInfo(data);
        setEditablePatientInfo({ ...data });
      } catch (error) {
        console.error("Error fetching patient information:", error);
      }
    };

    fetchPatientInfo();
  }, [patientID]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditablePatientInfo({ ...patientInfo });
    setEditMode(false);
  };

  const handleSaveClick = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Token not found in local storage");
        }
        
        const formattedDOB = formatDateForBackend(editablePatientInfo.DOB);

        const response = await fetch(
            `https://cosc3380-medical-database-project-server.onrender.com/api/doctor/patients/${patientID}/information`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...editablePatientInfo,
                    DOB: formattedDOB, 
                }),
            }
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        setPatientInfo({ ...editablePatientInfo });
        setEditMode(false);
    } catch (error) {
        console.error("Error updating patient information:", error);
    }
};

const formatDateForBackend = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0'); 
    return `${year}-${month}-${day}`;
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditablePatientInfo({
      ...editablePatientInfo,
      [name]: value,
    });
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
            <h1 className="text-3xl font-bold mb-4 p-8">Patient Information</h1>
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-2">Patient Information:</h2>
              {editMode ? (
                <>
                  <div>
                    <label htmlFor="policyNumber" className="font-semibold">Policy Number:{" "}</label>
                    <input type="text" id="policyNumber" name="Policy_number" value={editablePatientInfo.Policy_number || ""} onChange={handleInputChange}/>
                  </div>
                  <div>
                    <label htmlFor="gender" className="font-semibold">Gender:{" "}</label>
                    <input type="text" id="gender" name="Gender" value={editablePatientInfo.Gender || ""} onChange={handleInputChange}/>
                  </div>
                  <div>
                    <label htmlFor="firstName" className="font-semibold">First Name:{" "}</label>
                    <input type="text" id="firstName" name="FName" value={editablePatientInfo.FName || ""} onChange={handleInputChange}/>
                  </div>
                  <div>
                    <label htmlFor="lastName" className="font-semibold">Last Name:{" "}</label>
                    <input type="text" id="lastName" name="LName" value={editablePatientInfo.LName || ""} onChange={handleInputChange}/>
                  </div>
                  <div>
                    <label htmlFor="dob" className="font-semibold">Date of Birth:{" "}</label>
                    <input type="date" id="dob" name="DOB" value={editablePatientInfo.DOB || ""} onChange={handleInputChange}/>
                  </div>
                  <div>
                    <label htmlFor="email" className="font-semibold">Email:{" "}</label>
                    <input type="email" id="email" name="Email" value={editablePatientInfo.Email || ""} onChange={handleInputChange}/>
                  </div>
                  <div>
                    <label htmlFor="phone" className="font-semibold">Phone Number:{" "}</label>
                    <input type="tel" id="phone" name="Phone_num" value={editablePatientInfo.Phone_num || ""} onChange={handleInputChange}/>
                  </div>
                  <div>
                    <label htmlFor="address" className="font-semibold">Address:{" "}</label>
                    <input type="text" id="address" name="Address" value={editablePatientInfo.Address || ""} onChange={handleInputChange}/>
                  </div>
                  <div className="mt-2">
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={handleSaveClick}>Save</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2" onClick={handleCancelClick}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <p><span className="font-semibold">Policy Number:</span>{" "}{patientInfo.Policy_number}</p>
                  <p><span className="font-semibold">Gender:</span>{" "}{patientInfo.Gender}</p>
                  <p><span className="font-semibold">First Name:</span>{" "}{patientInfo.FName}</p>
                  <p><span className="font-semibold">Last Name:</span>{" "}{patientInfo.LName}</p>
                  <p><span className="font-semibold">Date of Birth:</span>{" "}{formatDate(patientInfo.DOB)}</p>
                  <p><span className="font-semibold">Email:</span>{" "}{patientInfo.Email}</p>
                  <p><span className="font-semibold">Phone Number:</span>{" "}{patientInfo.Phone_num}</p>
                  <p><span className="font-semibold">Address:</span>{" "}{patientInfo.Address}</p>
                  <div className="mt-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleEditClick}>Edit Patient Information</button>
                  </div>
                </>
              )}
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

export default DoctorEditPatientInformation;