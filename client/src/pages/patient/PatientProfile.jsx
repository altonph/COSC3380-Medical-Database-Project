import React, { useState, useEffect } from 'react';
import HeaderPortalPatient from "../../components/HeaderPortalPatient";
import { Link } from 'react-router-dom';

const PatientProfile = () => {
  const [patientData, setPatientData] = useState({
    patientID: null,
    insuranceID: null,
    dentistID: null,
    Insurance_Company_Name: 'Insurance Name',
    Policy_number: 'Policy Number',
    Gender: 'Gender',
    FName: 'First Name',
    LName: 'Last Name',
    DOB: 'Month-Day-Year',
    Email: 'Email',
    Phone_num: 'Phone Number',
    Address: 'Address'
  });

  useEffect(() => {
    // Fetch patient profile data from backend
    fetchPatientProfile();
  }, []);

  const fetchPatientProfile = async () => {
    try {
      const response = await fetch("https://cosc3380-medical-database-project-server.onrender.com/api/patient/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPatientData(data);
      } else {
        console.error("Failed to fetch patient profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching patient profile:", error);
    }
  };

  const renderInsuranceName = () => {
    if (!patientData || !patientData.Insurance_Company_Name) {
      return "None";
    } else {
      return patientData.Insurance_Company_Name;
    }
  };

  const renderInsuranceNumber = () => {
    if (!patientData || !patientData.Policy_number) {
      return "None";
    } else {
      return patientData.Policy_number;
    }
  };

  const formatDOB = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Months are zero-indexed
    const day = date.getDate();
    const year = date.getFullYear();
  
    // Pad single digit month or day with leading zero
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
  
    return `${formattedMonth}/${formattedDay}/${year}`;
  };

  return (
    <div>
      <HeaderPortalPatient />
      <div className="max-w-4xl mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-4">Patient Profile</h1>

        {patientData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">First Name:</label>
              <div className="border border-gray-300 rounded-md py-2 px-3">{patientData.FName}</div>
            </div>

            <div>
              <label className="block mb-2">Last Name:</label>
              <div className="border border-gray-300 rounded-md py-2 px-3">{patientData.LName}</div>
            </div>

            <div>
              <label className="block mb-2">Gender:</label>
              <div className="border border-gray-300 rounded-md py-2 px-3">{patientData.Gender}</div>
            </div>

            <div>
              <label className="block mb-2">Date of Birth:</label>
              <div className="border border-gray-300 rounded-md py-2 px-3">{formatDOB(patientData.DOB)}</div>
            </div>

            <div>
              <label className="block mb-2">Email:</label>
              <div className="border border-gray-300 rounded-md py-2 px-3">{patientData.Email}</div>
            </div>

            <div>
              <label className="block mb-2">Phone Number:</label>
              <div className="border border-gray-300 rounded-md py-2 px-3">{patientData.Phone_num}</div>
            </div>

            <div>
              <label className="block mb-2">Address:</label>
              <div className="border border-gray-300 rounded-md py-2 px-3">{patientData.Address}</div>
            </div>

            <div>
              <label className="block mb-2">Insurance:</label>
              <div className="border border-gray-300 rounded-md py-2 px-3">{renderInsuranceName()}</div>
            </div>

            <div>
              <label className="block mb-2">Policy Number:</label>
              <div className="border border-gray-300 rounded-md py-2 px-3">{renderInsuranceNumber()}</div>
            </div>
          </div>
        )}

        <Link to="/patient/home">
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PatientProfile;
