import React, { useState } from 'react';
import HeaderPortalPatient from "../../components/HeaderPortalPatient";

const PatientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const defaultValues = {
    firstName: 'Random',
    lastName: 'Patient',
    gender: 'Male',
    dob: '00/00/0000',
    email: 'randompatient@gmail.com',
    phoneNumber: '000-000-0000',
    address: '1234 Random Place',
    insuranceName: 'Random Insurance',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  const [editedProfile, setEditedProfile] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value
    });
  };

  const handleProfileUpdate = () => {
    console.log('Updated profile:', editedProfile);
    setIsEditing(false); 
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
                name="firstName"
                value={editedProfile.firstName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{editedProfile.firstName}</div>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-2">Last Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={editedProfile.lastName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{editedProfile.lastName}</div>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2">Gender:</label>
            {isEditing ? (
              <select
                name="gender"
                value={editedProfile.gender}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{editedProfile.gender}</div>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block mb-2">Date of Birth:</label>
            {isEditing ? (
              <input
                type="date"
                name="dob"
                value={editedProfile.dob}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{editedProfile.dob}</div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2">Email:</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedProfile.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{editedProfile.email}</div>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-2">Phone Number:</label>
            {isEditing ? (
              <input
                type="tel"
                name="phoneNumber"
                value={editedProfile.phoneNumber}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{editedProfile.phoneNumber}</div>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block mb-2">Address:</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={editedProfile.address}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{editedProfile.address}</div>
            )}
          </div>
        </div>
        {/* Edit Button */}
        <div>
            {isEditing ? (
              <button
                onClick={handleProfileUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 block mb-2 mt-4"
              >
                Save Changes
              </button>
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

export default PatientProfile;
