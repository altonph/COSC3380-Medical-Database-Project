import React, { useState } from 'react';
import HeaderPortalPatient from "../../components/HeaderPortalPatient";
import Footer from "../../components/Footer";

const MakeAppointment = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [alternateDate, setAlternateDate] = useState('');
  const [alternateTime, setAlternateTime] = useState('');
  const [practitioner, setPractitioner] = useState('');
  const [location, setLocation] = useState('');
  const [reasonForAppointment, setReasonForAppointment] = useState('');

  const generateTimeOptions = () => {
    const options = [];
    for (let i = 8; i <= 17; i++) {
      const formattedHour = i > 12 ? i - 12 : i;
      const amPm = i >= 12 ? 'PM' : 'AM';
      options.push(`${formattedHour}:00 ${amPm}`);
    }
    return options;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted!');
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
              <li><a href="/patient/home" className="block py-2 text-center text-gray-600 hover:text-black">Home</a></li>
              <li><a href="/patient/appointment" className="block py-2 text-center font-bold underline">Appointments</a></li>
              <li><a href="/patient/payment" className="block py-2 text-center text-gray-600 hover:text-black">Billing & Payments</a></li>
              <li><a href="/patient/visit" className="block py-2 text-center text-gray-600 hover:text-black">Visit Details</a></li>
              <li><a href="/patient/history" className="block py-2 text-center text-gray-600 hover:text-black">Medical History</a></li>
              <li><a href="/patient/prescriptions" className="block py-2 text-center text-gray-600 hover:text-black">Prescriptions</a></li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-4 mt-4">
          <h1 className="text-3xl font-bold p-2 ml-8 mb-4">Request an Appointment</h1>

          <div className="container mx-auto mt-4">
            <form onSubmit={handleSubmit} className="px-4 py-8">
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Name:</label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md mt-2 py-2 px-3 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Phone Number */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Phone Number:</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Preferred Date */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Preferred Date:</label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Preferred Time */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Preferred Time:</label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                >
                  {generateTimeOptions().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              {/* Alternate Date */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Alternate Date:</label>
                <input
                  type="date"
                  value={alternateDate}
                  onChange={(e) => setAlternateDate(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Alternate Time */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Alternate Time:</label>
                <select
                  value={alternateTime}
                  onChange={(e) => setAlternateTime(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                >
                  {generateTimeOptions().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              {/* Practitioner */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Practitioner:</label>
                <select
                  value={practitioner}
                  onChange={(e) => setPractitioner(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                >
                  <option value="" disabled selected>Select Practitioner</option>
                  <option value="Practitioner 1">Practitioner 1</option>
                  <option value="Practitioner 2">Practitioner 2</option>
                </select>
              </div>

              {/* Location */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Location:</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                >
                  <option value="" disabled selected>Select Location</option>
                  <option value="Location 1">Location 1</option>
                  <option value="Location 2">Location 2</option>
                </select>
              </div>

              {/* Reason for Appointment */}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Reason for Appointment:</label>
                <textarea
                  value={reasonForAppointment}
                  onChange={(e) => setReasonForAppointment(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 h-40 resize-none"
                />
              </div>

              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
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

export default MakeAppointment;
