import React, { useState, useEffect } from 'react';
import HeaderPortalDoctor from "../../components/HeaderPortalDoctor";
import { Link } from 'react-router-dom'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DoctorSettings = () => {
    const [editable, setEditable] = useState(false);
    const [doctorInfo, setDoctorInfo] = useState({
        firstName: '',
        lastName: '',
        dob: new Date(),
        email: '',
        phoneNumber: '',
        address: '',
        specialty: '',
        start_date: null,
        end_date: null,
        salary: null,
        is_active: true
    });

    useEffect(() => {
        fetchDoctorInfo();
    }, []); 

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
                dob: new Date(data.DOB),
                email: data.Email,
                phoneNumber: data.Phone_num,
                address: data.Address,
                specialty: data.Specialty,
                start_date: data.Start_date,
                end_date: data.End_date,
                salary: data.Salary,
                is_active: true
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
            const dobISOFormat = doctorInfo.dob.toISOString().split('T')[0];
            const updatedDoctorInfo = {
                ...doctorInfo,
                dob: dobISOFormat
            };
            const response = await fetch('http://localhost:5000/api/doctor/profile', {
                method: 'PATCH',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedDoctorInfo)
            });

            if (response.ok) {
                setEditable(false);
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

    const handleChange = (value, name) => {
        if (name === 'dob') {
            setDoctorInfo(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            const { name, value } = value.target;
            setDoctorInfo({
                ...doctorInfo,
                [name]: value
            });
        }
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
                        <label className="block mb-2">Date of Birth:</label>
                        {editable ? (
                            <DatePicker
                                selected={doctorInfo.dob}
                                onChange={(date) => handleChange(date, 'dob')}
                                dateFormat="MM/dd/yyyy"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            />
                        ) : (
                            <div className="border border-gray-300 rounded-md py-2 px-3">{doctorInfo.dob.toLocaleDateString()}</div>
                        )}
                    </div>

          <div>
            <label className="block mb-2">Email:</label>
            {editable ? (
              <input
                type="text"
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