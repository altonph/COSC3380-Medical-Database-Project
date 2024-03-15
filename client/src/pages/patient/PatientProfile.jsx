import React, { useState } from 'react';
import HeaderPortalPatient from "../../components/HeaderPortalPatient";
import { Link } from 'react-router-dom'; 

const PatientProfile = () => {
  const defaultValues = {
    firstName: 'Random',
    lastName: 'Patient',
    gender: 'Male',
    dob: '00/00/0000',
    email: 'randompatient@gmail.com',
    phoneNumber: '000-000-0000',
    address: '1234 Random Place',
    insuranceName: 'Random Insurance'
  };

  return (
    <div>
      <HeaderPortalPatient />
      <div className="max-w-4xl mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-4">Patient Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">First Name:</label>
            <div className="border border-gray-300 rounded-md py-2 px-3">{defaultValues.firstName}</div>
          </div>

          <div>
            <label className="block mb-2">Last Name:</label>
            <div className="border border-gray-300 rounded-md py-2 px-3">{defaultValues.lastName}</div>
          </div>

          <div>
          <label className="block mb-2">Gender:</label>
            <div className="border border-gray-300 rounded-md py-2 px-3">{defaultValues.gender}</div>
        </div>

        <div>
        <label className="block mb-2">Date of Birth:</label>
            <div className="border border-gray-300 rounded-md py-2 px-3">{defaultValues.dob}</div>
        </div>

        <div>
        <label className="block mb-2">Email:</label>
            <div className="border border-gray-300 rounded-md py-2 px-3">{defaultValues.email}</div>
        </div>

        <div>
        <label className="block mb-2">Phone Number:</label>
            <div className="border border-gray-300 rounded-md py-2 px-3">{defaultValues.phoneNumber}</div>
        </div>

        <div>
        <label className="block mb-2">Address:</label>
            <div className="border border-gray-300 rounded-md py-2 px-3">{defaultValues.address}</div>
        </div>

        <div>
        <label className="block mb-2">Insurance:</label>
            <div className="border border-gray-300 rounded-md py-2 px-3">{defaultValues.insuranceName}</div>
        </div>
        </div>

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
