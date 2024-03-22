import React, { useState, useEffect } from 'react';
import HeaderPortalPatient from "../../components/HeaderPortalPatient";
import { Link } from 'react-router-dom';

const PatientProfile = () => {
  const [patientData, setPatientData] = useState({
    patientID: null,
    insuranceID: null,
    dentistID: null,
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
      const response = await fetch("http://localhost:5000/api/patient/profile", {
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

  const renderInsurance = () => {
    if (!patientData || !patientData.insuranceID) {
      return "None";
    } else {
      return patientData.insuranceID;
    }
  };

  const formatDOB = (dob) => {
    const date = new Date(dob);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
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
              <div className="border border-gray-300 rounded-md py-2 px-3">{renderInsurance()}</div>
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
