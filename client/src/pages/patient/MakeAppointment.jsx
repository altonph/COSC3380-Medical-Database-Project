import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import HeaderPortalPatient from "../../components/HeaderPortalPatient";
import Footer from "../../components/Footer";
import { useNavigate } from 'react-router-dom';

const MakeAppointment = () => {

  const navigateTo = useNavigate();
  const [preferredDate, setPreferredDate] = useState(null);
  const [preferredTime, setPreferredTime] = useState('');
  const [practitioner, setPractitioner] = useState('');
  const [location, setLocation] = useState('');
  const [reasonForAppointment, setReasonForAppointment] = useState('');
  const [dentists, setDentists] = useState([]);
  const [notification, setNotification] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const timeParts = preferredTime.split(' ');
    const time = timeParts[1] === 'PM' ? parseInt(timeParts[0]) + 12 : parseInt(timeParts[0]);
    const formattedTime = `${time}:00:00`;

    const sqlFormattedDate = preferredDate.toISOString().split('T')[0];

    // console.log('Appointment submitted');
    // console.log('Selected Office ID:', location);
    // console.log('Preferred Date:', sqlFormattedDate);
    // console.log('Selected Dentist:', practitioner);
    // console.log('Preferred Time:', formattedTime);
    // console.log('Appointment Type:', reasonForAppointment);

    try {

      const response = await fetch('http://localhost:5000/api/patient/schedule', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          officeID: location,
          dentistID: practitioner,
          Date: sqlFormattedDate,
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
    setPractitioner('');

  };

  const getDayOfWeek = (date) => {

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = new Date(date).getDay();

    return daysOfWeek[dayIndex];
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
                  <option value="" disabled>Select Location</option>
                  <option value="1">5432 Magnolia Drive Austin, TX</option>
                  <option value="2">9876 Sunflower Boulevard Phoenix, AZ</option>
                </select>
              </div>

              {/* Preferred Date */}
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

              {/* Practitioner */}
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

              {/* Preferred Time */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Time:</label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                >
                  <option value="" disabled>Select Time</option>
                  {generateTimeOptions().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reason for Appointment */}
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
