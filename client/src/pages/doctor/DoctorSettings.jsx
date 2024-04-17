import React, { useState, useEffect } from 'react';
import HeaderPortalDoctor from "../../components/HeaderPortalDoctor";
import { Link } from 'react-router-dom'; 

const DoctorSettings = () => {
  const [editable, setEditable] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phoneNumber: '',
    address: '',
    specialty: ''
  });

  useEffect(() => {
    fetchDoctorInfo();
  }, []); 

  const formatDOB = (dob) => {
    const date = new Date(dob);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0'); 
    return `${year}-${month}-${day}`;
  };

  const fetchDoctorInfo = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/doctor/profile', {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
      });
      const data = await response.json();
    
      setDoctorInfo({
        firstName: data.FName,
        lastName: data.LName,
        dob: formatDOB(data.DOB),
        email: data.Email,
        phoneNumber: data.Phone_num,
        address: data.Address,
        specialty: data.Specialty
      });
    } catch (error) {
      console.error('Error fetching doctor information:', error);
    }
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/doctor/profile', {
        method: 'PATCH',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(doctorInfo)
      });

      if (response.ok) {
        setEditable(false);
        // Optionally, you can fetch updated information after save
        // fetchDoctorInfo();
      } else {
        console.error('Failed to update doctor profile');
      }
    } catch (error) {
      console.error('Error updating doctor profile:', error);
    }
  };

  const handleCancel = () => {
    fetchDoctorInfo(); 
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
          {Object.entries(doctorInfo).map(([key, value]) => (
            <div key={key}>
              <label className="block mb-2">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              {editable ? (
                key === 'dob' ? (
                  <input
                    type="date"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  />
                )
              ) : (
                <div className="border border-gray-300 rounded-md py-2 px-3">{value}</div>
              )}
            </div>
          ))}
        </div>

        {!editable && (
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 block mb-2 mt-4 mr-2"
          >
            Edit
          </button>
        )}
        {editable && (
          <div>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 block mb-2 mt-4 mr-2"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 block mb-2 mt-4"
            >
              Cancel
            </button>
          </div>
        )}

        <Link to="/doctor/home">
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DoctorSettings;