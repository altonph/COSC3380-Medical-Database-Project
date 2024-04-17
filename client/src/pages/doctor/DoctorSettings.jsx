import React, { useState } from 'react';
import HeaderPortalDoctor from "../../components/HeaderPortalDoctor";
import { Link } from 'react-router-dom'; 

const DoctorSettings = () => {
  const [editable, setEditable] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState({
    firstName: 'DoctorFirstName',
    lastName: 'DoctorLastName',
    gender: 'DoctorGender',
    dob: '00/00/0000',
    email: 'doctoremail@gmail.com',
    phoneNumber: '000-000-0000',
    address: 'DoctorAddress',
    specialty: 'DoctorSpecialty'
  });

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = () => {
    // Handle save logic here
    setEditable(false);
  };

  const handleCancel = () => {
    // Reset the form values if cancelled
    setDoctorInfo({
      firstName: 'DoctorFirstName',
      lastName: 'DoctorLastName',
      gender: 'DoctorGender',
      dob: '00/00/0000',
      email: 'doctoremail@gmail.com',
      phoneNumber: '000-000-0000',
      address: 'DoctorAddress',
      specialty: 'DoctorSpecialty'
    });
    setEditable(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorInfo({
      ...doctorInfo,
      [name]: value
    });
  };

  return (
    <div>
      <HeaderPortalDoctor />
      <div className="max-w-4xl mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-4">Doctor Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">First Name:</label>
            {editable ? (
              <input
                type="text"
                name="firstName"
                value={doctorInfo.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{doctorInfo.firstName}</div>
            )}
          </div>

          <div>
            <label className="block mb-2">Last Name:</label>
            {editable ? (
              <input
                type="text"
                name="lastName"
                value={doctorInfo.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{doctorInfo.lastName}</div>
            )}
          </div>

          <div>
            <label className="block mb-2">Gender:</label>
            {editable ? (
              <select
                name="gender"
                value={doctorInfo.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{doctorInfo.gender}</div>
            )}
          </div>

          <div>
            <label className="block mb-2">Date of Birth:</label>
            {editable ? (
              <input
                type="date"
                name="dob"
                value={doctorInfo.dob}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{doctorInfo.dob}</div>
            )}
          </div>

          <div>
            <label className="block mb-2">Email:</label>
            {editable ? (
              <input
                type="email"
                name="email"
                value={doctorInfo.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{doctorInfo.email}</div>
            )}
          </div>

          <div>
            <label className="block mb-2">Phone Number:</label>
            {editable ? (
              <input
                type="text"
                name="phoneNumber"
                value={doctorInfo.phoneNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{doctorInfo.phoneNumber}</div>
            )}
          </div>

          <div>
            <label className="block mb-2">Address:</label>
            {editable ? (
              <input
                type="text"
                name="address"
                value={doctorInfo.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{doctorInfo.address}</div>
            )}
          </div>

          <div>
            <label className="block mb-2">Specialty:</label>
            <div className="border border-gray-300 rounded-md py-2 px-3">{doctorInfo.specialty}</div>
          </div>
        </div>

        {!editable && (
          <button
            onClick={handleEdit}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mr-2"
          >
            Edit
          </button>
        )}
        {editable && (
          <div>
            <button
              onClick={handleSave}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        )}

        <Link to="/doctor/home">
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-2">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DoctorSettings;
