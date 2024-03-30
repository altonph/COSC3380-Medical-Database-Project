import React, { useState, useEffect } from 'react';
import HeaderPortalPatient from "../../components/HeaderPortalPatient";
import Footer from "../../components/Footer";
import { useNavigate } from 'react-router-dom';

const MakeAppointment = () => {
  const navigateTo = useNavigate();
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [practitioner, setPractitioner] = useState('');
  const [location, setLocation] = useState('');
  const [reasonForAppointment, setReasonForAppointment] = useState('');
  const [dentists, setDentists] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (location) {
      fetchDentistsByOffice(location);
    }
  }, [location]);

  const fetchDentistsByOffice = async (officeID) => {
    try {
      const response = await fetch(`http://localhost:5000/api/getDentistsByOfficeID?officeID=${officeID}`);
      if (response.ok) {
        const data = await response.json();
        //console.log(data);
        setDentists(data.results);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert preferredTime to SQL acceptable format
    const timeParts = preferredTime.split(' ');
    const time = timeParts[1] === 'PM' ? parseInt(timeParts[0]) + 12 : parseInt(timeParts[0]);
    const formattedTime = `${time}:00:00`;
    console.log('Appointment submitted');
    console.log('Selected Office ID:', location);
    console.log('Selected Dentist:', dentists.find(dentist => `${dentist.FName} ${dentist.LName}` === practitioner)?.dentistID);
    console.log('Preferred Date:', preferredDate);
    console.log('Preferred Time (SQL format):', formattedTime);
    console.log('Appointment Type:', reasonForAppointment);
  
    try {
      const response = await fetch('http://localhost:5000/api/patient/schedule', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          officeID: location,
          dentistID: dentists.find(dentist => `${dentist.FName} ${dentist.LName}` === practitioner)?.dentistID,
          Date: preferredDate,
          Start_time: formattedTime,
          Appointment_Type: reasonForAppointment
        }),
      });
      if (response.ok) {
        console.log('Appointment successfully scheduled!');
        setNotification('Appointment scheduled successfully!');
        setTimeout(() => {
          setNotification('');
          navigateTo('/patient/home');
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
    console.log('Selected Office ID:', e.target.value);
    setPractitioner('');
    fetchDentistsByOffice(e.target.value);
  };

  return (
    <div className="flex h-screen flex-col">
      {/* header */}
      <nav>
        <HeaderPortalPatient />
      </nav>
      {/* sidebar */}
      <div className="flex flex-1">
        <aside className="w-1/6 bg-gray-200 text-black">
          <nav className="p-4 text-xl">
            <ul>
              <li><a href="/patient/home" className="block py-2 text-center text-gray-600 hover:text-black">Home</a></li>
              <li><a href="/patient/appointment" className="block py-2 text-center font-bold underline">Appointments</a></li>
              <li><a href="/patient/payment" className="block py-2 text-center text-gray-600 hover:text-black">Billing & Payments</a></li>
              <li><a href="/patient/visit" className="block py-2 text-center text-gray-600 hover:text-black">Visit Details</a></li>
              <li><a href="/patient/history" className="block py-2 text-center text-gray-600 hover:text-black">Medical History</a></li>
              <li><a href="/patient/prescriptions" className="block py-2 text-center text-gray-600 hover:text-black">Prescriptions</a></li>
            </ul>
          </nav>
        </aside>
        {/* main section */}
        <main className="flex-1 p-4 mt-4">
          <h1 className="text-3xl font-bold p-2 ml-8 mb-4">Request an Appointment</h1>

          <div className="container mx-auto mt-4">
            <form onSubmit={handleSubmit} className="px-4 py-8">

              {/* Location */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Location:</label>
                <select
                  value={location}
                  onChange={handleLocationChange}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                >
                  <option value="" disabled selected>Select Location</option>
                  <option value="1">123 Main St, Houston, TX</option>
                  <option value="2">321 2nd St, Katy, TX</option>
                </select>
              </div>
               {/* Practitioner */}
               <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Practitioner:</label>
              <select
                value={practitioner}
                onChange={(e) => {
                  const selectedPractitionerName = e.target.value;
                  const selectedDentist = dentists.find(dentist => `${dentist.FName} ${dentist.LName}` === selectedPractitionerName);
                  if (selectedDentist) {
                    setPractitioner(selectedPractitionerName);
                    console.log('Selected Dentist ID:', selectedDentist.dentistID); //debug statement
                  }
                }}
                className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              >
                <option value="" disabled selected>Select Practitioner</option>
                {dentists.length > 0 ? (
                  dentists.map(dentist => (
                    <option key={dentist.dentistID} value={`${dentist.FName} ${dentist.LName}`}>
                      {`Dr. ${dentist.FName} ${dentist.LName}`}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No Practitioners available</option>
                )}
              </select>
            </div>
              {/* Preferred Date */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Date:</label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                />
              </div>
              {/* Preferred Time */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Time:</label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                >
                  <option value="" disabled selected>Select Time</option>
                  {generateTimeOptions().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Reason for Appointment:</label>
                <select
                  value={reasonForAppointment}
                  onChange={(e) => setReasonForAppointment(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                >
                  <option value="" disabled selected>Select Reason</option>
                  <option value="Checkup">Checkup</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Filling">Filling</option>
                  <option value="Extraction">Extraction</option>
                  <option value="Root Canal">Root Canal</option>
                </select>
              </div>

              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
              {notification && (
                <span className="text-green-600 ml-2">{notification}</span>
              )}
            </form>
          </div>
        </main>
      </div>
      {/* footer */}
      <nav>
        <Footer />
      </nav>
    </div>
  );
};

export default MakeAppointment;
