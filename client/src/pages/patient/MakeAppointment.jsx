import React, { useState } from 'react';
import './MakeAppointment.css';

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
    <div className = "container">
      <h2 className = "header">Request an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className = "name">
        <label className = "text">Name: </label>
        <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div>
          <label>Preferred Date:</label>
          <input
            type="date"
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
          />
          <label>Preferred Time:</label>
          <select
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
          >
            {generateTimeOptions().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Alternate Date:</label>
          <input
            type="date"
            value={alternateDate}
            onChange={(e) => setAlternateDate(e.target.value)}
          />
          <label>Alternate Time:</label>
          <select
            value={alternateTime}
            onChange={(e) => setAlternateTime(e.target.value)}
          >
            {generateTimeOptions().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Practitioner:</label>
          <select
            value={practitioner}
            onChange={(e) => setPractitioner(e.target.value)}
          >
            <option value="" disabled selected>
            Select Practitioner
            </option>
            <option value="Practitioner 1">Practitioner 1</option>
            <option value="Practitioner 2">Practitioner 2</option>
          </select>
        </div>

        <div>
          <label>Location:</label>
          <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          >
          <option value="" disabled selected>
          Select Location
          </option>
          <option value="Location 1">Location 1</option>
          <option value="Location 2">Location 2</option>
          </select>
        </div>

        <div>
          <label>Reason for Appointment:</label>
          <textarea
            value={reasonForAppointment}
            onChange={(e) => setReasonForAppointment(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MakeAppointment;
