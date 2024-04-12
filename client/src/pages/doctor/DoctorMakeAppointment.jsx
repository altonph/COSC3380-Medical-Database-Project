import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import HeaderPortalPatient from "../../components/HeaderPortalPatient";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const DoctorMakeAppointment = () => {

  const navigateTo = useNavigate();
  const [preferredDate, setPreferredDate] = useState(null);
  const [preferredTime, setPreferredTime] = useState('');
  const [practitioner, setPractitioner] = useState('');
  const [location, setLocation] = useState('');
  const [reasonForAppointment, setReasonForAppointment] = useState('');
  const [dentists, setDentists] = useState([]);
  const [notification, setNotification] = useState('');
  const [patientID, setPatientID] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [patientExists, setPatientExists] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    if (location && preferredDate) {
      fetchDentistsByOfficeAndDay(location, getDayOfWeek(preferredDate));
    }
  }, [location, preferredDate]);

  const fetchDentistsByOfficeAndDay = async (officeID, dayOfWeek) => {
    try {
      const response = await fetch(`http://localhost:5000/api/dentist/getDentist?officeID=${officeID}&dayOfWeek=${dayOfWeek}`);

      if (response.ok) {
        const data = await response.json();
        setDentists(data);
      } else {
        console.error('Failed to fetch dentists:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching dentists:', error);
    }
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let i = 8; i <= 16; i++) {
      const formattedHour = i > 12 ? i - 12 : i;
      const amPm = i >= 12 ? 'PM' : 'AM';
      options.push(`${formattedHour}:00 ${amPm}`);
    }
    return options;
  };

  const checkPatientExistence = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/doctor/appointments/check-patientID', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ patientID })
      });
      if (response.ok) {
        const data = await response.json();
        return data.patientExists;
      } else {
        console.error('Error checking patient existence:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error checking patient existence:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientExists = await checkPatientExistence();
    if (!patientExists) {
      console.log('Insertion failed, patient does not exist');
      return;
    }
  
    const timePartsStart = startTime.split(' ');
    const timeStart = timePartsStart[1] === 'PM' ? parseInt(timePartsStart[0]) + 12 : parseInt(timePartsStart[0]);
    const formattedStartTime = `${timeStart}:00:00`;
  
    const timePartsEnd = endTime.split(' ');
    const timeEnd = timePartsEnd[1] === 'PM' ? parseInt(timePartsEnd[0]) + 12 : parseInt(timePartsEnd[0]);
    const formattedEndTime = `${timeEnd}:00:00`;
  
    const sqlFormattedDate = preferredDate.toISOString().split('T')[0];
  
    try {
      
      const response = await fetch('http://localhost:5000/api/doctor/appointments', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          officeID: location,
          dentistID: practitioner,
          staffID: 1, 
          patientID: patientID, 
          Date: sqlFormattedDate,
          Start_time: formattedStartTime,
          End_time: formattedEndTime,
          Appointment_Type: reasonForAppointment,
          Appointment_Status: "Scheduled",
          Primary_Approval: false,
          Is_active: true
        }),
      });
  
      if (response.ok) {
        console.log('Appointment successfully scheduled!');
        setNotification('Appointment scheduled successfully!');
        setTimeout(() => {
          setNotification('');
          navigateTo('/doctor/appointments');
        }, 1000);
  
      } else {
        console.error('Failed to make appointment:', response.statusText);
      }
  
    } catch (error) {
      console.error('Error making appointment:', error);
    }
  };

  const handleLocationChange = (e) => {

    setLocation(e.target.value);
    setPractitioner('');

  };

  const getDayOfWeek = (date) => {

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = new Date(date).getDay();

    return daysOfWeek[dayIndex];
  };

  return (
    <div className="flex h-screen flex-col">
      <nav>
        <HeaderPortalPatient />
      </nav>
      <div className="flex flex-1">
        <aside className="w-1/6 bg-gray-200 text-black">
          <nav className="p-4 text-xl">
            <ul>
              <li><a href="/doctor/home" className="block py-2 text-center text-gray-600 hover:text-black">Home</a></li>
              <li><a href="/doctor/appointments" className="block py-2 text-center font-bold underline">Appointments</a></li>
              <li><a href="/doctor/patients" className="block py-2 text-center text-gray-600 hover:text-black">Patients</a></li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-4 mt-4">
          <h1 className="text-3xl font-bold p-2 ml-8 mb-4">Make an Appointment</h1>
  
          <div className="container mx-auto mt-4">
            <form onSubmit={handleSubmit} className="px-4 py-8">
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Patient ID:</label>
                <input
                  type="text"
                  value={patientID}
                  onChange={(e) => setPatientID(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  placeholder="Enter Patient ID"
                />
              </div>
  
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Location:</label>
                <select
                  value={location}
                  onChange={handleLocationChange}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                >
                  <option value="" disabled>Select Location</option>
                  <option value="1">5432 Magnolia Drive Austin, TX</option>
                  <option value="2">9876 Sunflower Boulevard Phoenix, AZ</option>
                </select>
              </div>
  
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Date:</label>
                <DatePicker
                  selected={preferredDate}
                  onChange={date => setPreferredDate(date)}
                  minDate={new Date()}
                  filterDate={date => date.getDay() !== 0 && date.getDay() !== 6}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                />
              </div>
  
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Primary Practitioner:</label>
                <select
                  value={practitioner}
                  onChange={(e) => setPractitioner(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                >
                  <option value="" disabled>Select Practitioner</option>
                  {dentists.map(dentist => (
                    <option key={dentist.dentistID} value={dentist.dentistID}>
                      {`Dr. ${dentist.FName} ${dentist.LName}`}
                    </option>
                  ))}
                </select>
              </div>
  
              <div className="mb-4">
                <div className="flex">
                  <div className="w-1/2 mr-2">
                    <label className="block text-sm font-bold mb-2">Start Time:</label>
                    <select
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    >
                      <option value="" disabled>Select Start Time</option>
                      {generateTimeOptions().map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/2 ml-2">
                    <label className="block text-sm font-bold mb-2">End Time:</label>
                    <select
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    >
                      <option value="" disabled>Select End Time</option>
                      {generateTimeOptions().map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
  
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Reason for Appointment:</label>
                <select
                  value={reasonForAppointment}
                  onChange={(e) => setReasonForAppointment(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                >
                  <option value="" disabled>Select Reason</option>
                  <option value="Checkup">Checkup</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Whitening">Whitening</option>
                  <option value="Extraction">Extraction</option>
                  <option value="Root Canal">Root Canal</option>
                </select>
              </div>
  
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
              <Link to="/doctor/appointments" type="cancel" className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Cancel</Link>
              {notification && (
                <span className="text-green-600 ml-2">{notification}</span>
              )}
            </form>
          </div>
        </main>
      </div>
      <nav>
        <Footer />
      </nav>
    </div>
  );  
};

export default DoctorMakeAppointment;
