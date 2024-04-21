import React, { useState, useEffect } from 'react';
import HeaderPortalStaff from "../../components/HeaderPortalStaff";
import { Link } from 'react-router-dom';

const StaffProfile = () => {
  const [staffData, setStaffData] = useState(null);

  useEffect(() => {
    // Fetch staff profile data from backend
    fetchStaffProfile();
  }, []);

  const fetchStaffProfile = async () => {
    try {
      const response = await fetch("https://cosc3380-medical-database-project-server.onrender.com/api/staff/profile", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStaffData(data);
      } else {
        console.error("Failed to fetch staff profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching staff profile:", error);
    }
  };

  const renderEndDate = () => {
    return staffData && staffData.End_date ? staffData.End_date : "N/A";
  };

  const renderOfficeName = () => {
    if (!staffData || !staffData.officeID) {
      return "Unknown";
    } else {
      return staffData.officeID === 1 ? "Austin" : "Phoenix";
    }
  };

  const formatDOB = (dob) => {
    const date = new Date(dob);
    return date.toLocaleDateString('en-US');
  };

  const formatStartDate = (startDate) => {
    const date = new Date(startDate);
    return date.toLocaleDateString('en-US');
  };
  

  return (
    <div>
      <HeaderPortalStaff />
      <div className="max-w-4xl mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-4">Staff Profile</h1>

        {staffData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">First Name:</label>
              <div className="border border-gray-300 rounded-md py-2 px-3">{staffData.Fname}</div>
            </div>

            <div>
              <label className="block mb-2">Last Name:</label>
              <div className="border border-gray-300 rounded-md py-2 px-3">{staffData.Lname}</div>
            </div>

            <div>
              <label className="block mb-2">Email:</label>
              <div className="border border-gray-300 rounded-md py-2 px-3">{staffData.Email}</div>
            </div>

            <div>
              <label className="block mb-2">Phone Number:</label>
              <div className="border border-gray-300 rounded-md py-2 px-3">{staffData.Phone_num}</div>
            </div>

            <div>
              <label className="block mb-2">Date of Birth:</label>
              <div className="border border-gray-300 rounded-md py-2 px-3">{formatDOB(staffData.DOB)}</div>
            </div>

            <div>
              <label className="block mb-2">Address:</label>
              <div className="border border-gray-300 rounded-md py-2 px-3">{staffData.Address}</div>
            </div>

            <div>
              <label className="block mb-2">Position:</label>
              <div className="border border-gray-300 rounded-md py-2 px-3">{staffData.Position}</div>
            </div>

            <div>
              <label className="block mb-2">Start Date:</label>
              <div className="border border-gray-300 rounded-md py-2 px-3">{formatStartDate(staffData.Start_date)}</div>
            </div>

            <div>
              <label className="block mb-2">End Date:</label>
              <div className="border border-gray-300 rounded-md py-2 px-3">{renderEndDate()}</div>
            </div>

            <div>
              <label className="block mb-2">Office:</label>
              <div className="border border-gray-300 rounded-md py-2 px-3">{renderOfficeName()}</div>
            </div>

            <div>
              <label className="block mb-2">Salary:</label>
              <div className="border border-gray-300 rounded-md py-2 px-3">{staffData.Salary}</div>
            </div>
          </div>
        )}

        <Link to="/staff/home">
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StaffProfile;
