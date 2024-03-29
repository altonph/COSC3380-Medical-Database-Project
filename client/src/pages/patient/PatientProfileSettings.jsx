import React, { useState, useEffect } from 'react';
import HeaderPortalPatient from "../../components/HeaderPortalPatient";

const PatientProfileSetting = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [editedProfile, setEditedProfile] = useState({
    patientID: null,
    insuranceID: null,
    dentistID: null,
    FName: '',
    LName: '',
    Gender: '',
    DOB: '',
    Email: '',
    Phone_num: '',
    Address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });


  
  useEffect(() => {
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
        console.log(data);
        setEditedProfile(data);
      } else {
        console.error("Failed to fetch patient profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching patient profile:", error);
    }
  };

  const formatDOB = (dob) => {
    const date = new Date(dob);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value
    });
  };

  

  const handleProfileUpdate = async () => {
  
    try {
      const response = await fetch("https://cosc3380-medical-database-project-server.onrender.com/api/patient/profile/update", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedProfile)
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

  const handlePasswordChange = () => {
    console.log('Password changed');
    setIsChangingPassword(false);
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
              <input
                type="date"
                name="DOB"
                value={editedProfile.DOB}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{formatDOB(editedProfile.DOB)}</div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2">Email:</label>
            {isEditing ? (
              <input
                type="Email"
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
              onClick={() => {
                setIsEditing(false);
                setEditedProfile(defaultValues); // Reset editedProfile to default values
              }}
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

        {/* Password Management */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-4 text-base">Password Management</h2>
          {isChangingPassword ? (
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-2">Current Password:</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={editedProfile.currentPassword}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2">New Password:</label>
                <input
                  type="password"
                  name="newPassword"
                  value={editedProfile.newPassword}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2">Confirm Password:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={editedProfile.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                onClick={handlePasswordChange}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Change Password
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsChangingPassword(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Change Password
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfileSetting;