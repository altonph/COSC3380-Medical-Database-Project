import React, { useState, useEffect } from 'react';
import HeaderPortalDoctor from "../../components/HeaderPortalDoctor";
import { Link } from 'react-router-dom'; 

const DoctorProfile = () => {
  const defaultValues = {
    firstName: 'DoctorFirstName',
    lastName: 'DoctorLastName',
    gender: 'DoctorGender',
    dob: '00/00/0000',
    email: 'doctoremail@gmail.com',
    phoneNumber: '000-000-0000',
    address: 'DoctorAddress',
    specialty: 'DoctorSpecialty'
  };

  const [doctorProfile, setDoctorProfile] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    email: '',
    phoneNumber: '',
    address: '',
    specialty: ''
  });

  useEffect(() => {
    fetchDoctorProfile();
  }, []);

  const fetchDoctorProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/doctor/profile', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch doctor profile');
      }
      const data = await response.json();
      // Update component state with fetched data
      setDoctorProfile({
        firstName: data.FName,
        lastName: data.LName,
        gender: data.Gender,
        dob: data.DOB,
        email: data.Email,
        phoneNumber: data.Phone_num,
        address: data.Address,
        specialty: data.Specialty
      });
    } catch (error) {
      console.error('Error fetching doctor profile:', error);
      // Handle error
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Months are zero-indexed
    const day = date.getDate();
    const year = date.getFullYear();
  
    // Pad single digit month or day with leading zero
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
  
    return `${formattedMonth}/${formattedDay}/${year}`;
  };

  return (
    <div>
      <HeaderPortalDoctor />
      <div className="max-w-4xl mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-4">Dentist Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">First Name:</label>
            <div className="border border-gray-300 rounded-md py-2 px-3">{doctorProfile.firstName}</div>
          </div>

          <div>
            <label className="block mb-2">Last Name:</label>
            <div className="border border-gray-300 rounded-md py-2 px-3">{doctorProfile.lastName}</div>
          </div>

        <div>
        <label className="block mb-2">Date of Birth:</label>
            <div className="border border-gray-300 rounded-md py-2 px-3">{formatDate(doctorProfile.dob)}</div>
        </div>

        <div>
        <label className="block mb-2">Email:</label>
            <div className="border border-gray-300 rounded-md py-2 px-3">{doctorProfile.email}</div>
        </div>

        <div>
        <label className="block mb-2">Phone Number:</label>
            <div className="border border-gray-300 rounded-md py-2 px-3">{doctorProfile.phoneNumber}</div>
        </div>

        <div>
        <label className="block mb-2">Address:</label>
            <div className="border border-gray-300 rounded-md py-2 px-3">{doctorProfile.address}</div>
        </div>

        <div>
        <label className="block mb-2">Specialty:</label>
            <div className="border border-gray-300 rounded-md py-2 px-3">{doctorProfile.specialty}</div>
        </div>

        </div>

        <Link to="/doctor/home">
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Back to Home
          </button>
        </Link>

      </div>
    </div>
  );
};

export default DoctorProfile;
