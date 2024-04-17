import React, { useState, useEffect } from 'react';
import HeaderPortalPatient from "../../components/HeaderPortalPatient";

const StaffProfileSetting = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [editedProfile, setEditedProfile] = useState({
    staffID: null,
    Fname: '',
    Lname: '',
    Email: '',
    Phone_num: '',
    DOB: '',
    Address: '',
    Start_date: ''
  });

  useEffect(() => {
    fetchStaffProfile();
  }, []);

  const fetchStaffProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/staff/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setEditedProfile({
          ...data,
          DOB: formatDateForInput(data.DOB) // Format DOB for input
        });
      } else {
        console.error("Failed to fetch staff profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching staff profile:", error);
    }
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
    return `${year}-${month}-${day}`;
  };

  const handleProfileUpdate = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/staff/profile/update", {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...editedProfile,
          DOB: formatDateForInput(editedProfile.DOB), // Format DOB for server
          Start_date: formatDateForInput(editedProfile.Start_date)
        })
      });

      if (response.ok) {
        console.log('Profile updated successfully');
        setIsEditing(false);
      } else {
        console.error("Failed to update staff profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating staff profile:", error);
    }
  };  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value
    });
  };

  return (
    <div>
      <HeaderPortalPatient />
      <div className="max-w-4xl mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-4">Settings</h1>
        <h2 className="text-3xl font-bold mb-0 text-base">Staff Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block mb-2">First Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="Fname"
                value={editedProfile.Fname}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{editedProfile.Fname}</div>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-2">Last Name:</label>
            {isEditing ? (
              <input
                type="text"
                name="Lname"
                value={editedProfile.Lname}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{editedProfile.Lname}</div>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block mb-2">Date of Birth:</label>
            {isEditing ? (
              <input
                type="date"
                name="DOB"
                value={editedProfile.DOB} // Set the value directly without formatting
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />            
            ) : (
              <div className="border border-gray-300 rounded-md py-2 px-3">{editedProfile.DOB}</div>
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
                fetchStaffProfile(); // Refetch the profile to get original DOB
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

      </div>
    </div>
  );
};

export default StaffProfileSetting;
