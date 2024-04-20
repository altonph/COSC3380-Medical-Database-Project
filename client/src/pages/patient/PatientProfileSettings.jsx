import React, { useState, useEffect } from 'react';
import HeaderPortalPatient from "../../components/HeaderPortalPatient";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PatientProfileSetting = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    FName: '',
    LName: '',
    Gender: '',
    DOB: new Date(),
    Email: '',
    Phone_num: '',
    Address: '',
    Insurance_Company_Name: '',
    Policy_number: ''
  });

  useEffect(() => {
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
        console.log(data);
        data.DOB = new Date(data.DOB); // Convert string date to Date object
        setEditedProfile(data);
      } else {
        console.error("Failed to fetch patient profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching patient profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value
    });
  };

  const handleInsuranceCompanyNameChange = (e) => {
    const value = e.target.value;
    setEditedProfile({
      ...editedProfile,
      Insurance_Company_Name: value
    });
  };

  const handleProfileUpdate = async () => {
    // Format Date of Birth to YYYY-MM-DD
    const formattedDOB = editedProfile.DOB.toISOString().split('T')[0];
    
    try {
      const response = await fetch("http://localhost:5000/api/patient/profile/update", {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...editedProfile,
          DOB: formattedDOB // Replace DOB with formatted date of birth
        })
      });
  
      if (response.ok) {
        console.log('Profile updated successfully');
        setIsEditing(false);
      } else {
        console.error("Failed to update patient profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating patient profile:", error);
    }
  };
  

  return (
    <div>
      <HeaderPortalPatient />
      <div className="max-w-4xl mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-4">Settings</h1>
        <h2 className="text-3xl font-bold mb-0 text-base">Patient Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block mb-2">First Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="FName"
                value={editedProfile.FName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{editedProfile.FName}</div>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-2">Last Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="LName"
                value={editedProfile.LName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{editedProfile.LName}</div>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2">Gender:</label>
            {isEditing ? (
              <select
                name="Gender"
                value={editedProfile.Gender}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{editedProfile.Gender}</div>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block mb-2">Date of Birth:</label>
            {isEditing ? (
              <DatePicker
                selected={editedProfile.DOB}
                onChange={(date) => setEditedProfile({ ...editedProfile, DOB: date })}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{editedProfile.DOB.toLocaleDateString()}</div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2">Email:</label>
            {isEditing ? (
              <input
                type="email"
                name="Email"
                value={editedProfile.Email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{editedProfile.Email}</div>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-2">Phone Number:</label>
            {isEditing ? (
              <input
                type="tel"
                name="Phone_num"
                value={editedProfile.Phone_num}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{editedProfile.Phone_num}</div>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block mb-2">Address:</label>
            {isEditing ? (
              <input
                type="text"
                name="Address"
                value={editedProfile.Address}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{editedProfile.Address}</div>
            )}
          </div>

          {/* Insurance Company Name */}
          <div>
            <label className="block mb-2">Insurance Company Name:</label>
            {isEditing ? (
              <select
                name="Insurance_Company_Name"
                value={editedProfile.Insurance_Company_Name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              >
                <option value="Anthem">Anthem</option>
                <option value="Guardian">Guardian</option>
                <option value="Ameritas">Ameritas</option>
                <option value="Humana">Humana</option>
                <option value="Spirit Dental">Spirit Dental</option>
              </select>
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{editedProfile.Insurance_Company_Name}</div>
            )}
          </div>

          {/* Policy Number */}
          <div>
            <label className="block mb-2">Policy Number:</label>
            {isEditing ? (
              <input
                type="text"
                name="Policy_number"
                value={editedProfile.Policy_number}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{editedProfile.Policy_number}</div>
            )}
          </div>
        </div>

        {/* Edit Button */}
        <div>
          {isEditing ? (
            <div className="flex">
              <button
                onClick={handleProfileUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 block mb-2 mt-4 mr-2"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 block mb-2 mt-4"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 block mb-2 mt-4"
            >
              Edit Information
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfileSetting;
