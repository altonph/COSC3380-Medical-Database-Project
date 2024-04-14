import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import HeaderPortalDoctor from "../../components/HeaderPortalDoctor";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const DoctorMakeAppointment = () => {

  const navigateTo = useNavigate();
  const [preferredDate, setPreferredDate] = useState(null);
  const [practitioner, setPractitioner] = useState('');
  const [location, setLocation] = useState('');
  const [reasonForAppointment, setReasonForAppointment] = useState('');
  const [dentists, setDentists] = useState([]);
  const [notification, setNotification] = useState('');
  const [patientID, setPatientID] = useState('');
  const [availableTimeBlocks, setAvailableTimeBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null); 
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [availableStaff, setAvailableStaff] = useState([]);
  const [selectedAssistingHygienist, setSelectedAssistingHygienist] = useState('');

  useEffect(() => {
    if (location && preferredDate) {
      fetchDentistsByOfficeAndDay(location, getDayOfWeek(preferredDate));
    }
  }, [location, preferredDate]);

  useEffect(() => {
    if (practitioner && preferredDate) {
      fetchDentistAvailability(practitioner, preferredDate);
    }
  }, [practitioner, preferredDate]);

  useEffect(() => {
    if (location && preferredDate && selectedStartTime && selectedEndTime) {
      fetchAvailableStaff(location, preferredDate, selectedStartTime, selectedEndTime);
    }
  }, [location, preferredDate, selectedStartTime, selectedEndTime]);

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

  const fetchDentistAvailability = async (dentistID, date) => {
    try {
      const formattedDate = date.toISOString().split('T')[0];
  
      const response = await fetch(`http://localhost:5000/api/dentist/getAvailableTimeBlocks?dentistID=${dentistID}&date=${formattedDate}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Dentist availability:', data);
        setAvailableTimeBlocks(data);
      } else {
        console.error('Failed to fetch dentist availability:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching dentist availability:', error);
    }
  };

  const fetchAvailableStaff = async (officeID, date, startTime, endTime) => {
    try {
        const response = await fetch('http://localhost:5000/api/doctor/appointments/available-staff', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ officeID, date, startTime, endTime })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Available staff:', data);
            setAvailableStaff(data.availableStaff);
        } else {
            console.error('Failed to fetch available staff:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching available staff:', error);
    }
  };


  const generateTimeOptions = (block) => {
    const options = [];
    const startTime = new Date(`01/01/0001 ${block.start}`);
    const endTime = new Date(`01/01/0001 ${block.end}`);
    const interval = 60 * 60 * 1000; 
  
    for (let time = startTime; time <= endTime; time.setTime(time.getTime() + interval)) {
      options.push(formatTime(time));
    }
  
    return options;
  };
  
  const formatTime = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; 
  
    return `${formattedHours}:${minutes} ${period}`;
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

    const staffID = selectedAssistingHygienist !== "" ? selectedAssistingHygienist : null;

    const startTimeParts = selectedStartTime.split(' ');
    const startHour = parseInt(startTimeParts[0].split(':')[0]);
    const startMinute = parseInt(startTimeParts[0].split(':')[1]);
    const startPeriod = startTimeParts[1];

    const endTimeParts = selectedEndTime.split(' ');
    const endHour = parseInt(endTimeParts[0].split(':')[0]);
    const endMinute = parseInt(endTimeParts[0].split(':')[1]);
    const endPeriod = endTimeParts[1];

    const startHour24 = (startPeriod === 'PM' && startHour !== 12) ? startHour + 12 : startHour;
    const endHour24 = (endPeriod === 'PM' && endHour !== 12) ? endHour + 12 : endHour;

    const startTimeInMinutes = startHour24 * 60 + startMinute;
    const endTimeInMinutes = endHour24 * 60 + endMinute;

    if (endTimeInMinutes <= startTimeInMinutes) {
        console.log('End time must be after start time');
        return;
    }

    const patientExists = await checkPatientExistence();
    if (!patientExists) {
        console.log('Insertion failed, patient does not exist');
        return;
    }

    const timePartsStart = selectedStartTime.split(' ');
    let timeStart = parseInt(timePartsStart[0]);
    if (timePartsStart[1] === 'PM' && timeStart !== 12) {
        timeStart += 12;
    }
    const formattedStartTime = `${timeStart}:00:00`;

    const timePartsEnd = selectedEndTime.split(' ');
    let timeEnd = parseInt(timePartsEnd[0]);
    if (timePartsEnd[1] === 'PM' && timeEnd !== 12) {
        timeEnd += 12;
    }
    const formattedEndTime = `${timeEnd}:00:00`;

    console.log("Formatted start time is ", formattedStartTime);
    console.log("Formatted end time is ", formattedEndTime);
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
                staffID: staffID, 
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

  const handleBlockSelection = (block) => {
    setSelectedBlock(block);
    setSelectedStartTime(block.start);
    setSelectedEndTime(block.end);
  };

  const formatBlockLabel = (block) => {
    const start = formatTime(new Date(`01/01/2000 ${block.start}`)); 
    const end = formatTime(new Date(`01/01/2000 ${block.end}`)); 
    return `${start} - ${end}`;
  };
  

  return (
    <div className="flex h-screen flex-col">
      <nav>
        <HeaderPortalDoctor />
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
                <label className="block text-sm font-bold mb-2">Available Time Blocks:</label>
                {availableTimeBlocks.map((block, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBlock === block}
                      onChange={() => handleBlockSelection(block)}
                      className="mr-2"
                    />
                    <label>{formatBlockLabel(block)}</label> 
                  </div>
                ))}
              </div>
  
              {(selectedBlock && (
                <div className="mb-4">
                  <div className="flex">
                    <div className="w-1/2 mr-2">
                      <label className="block text-sm font-bold mb-2">Start Time:</label>
                      <select
                        value={selectedStartTime}
                        onChange={(e) => setSelectedStartTime(e.target.value)}
                        className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      >
                        {generateTimeOptions(selectedBlock).map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-1/2 ml-2">
                      <label className="block text-sm font-bold mb-2">End Time:</label>
                      <select
                        value={selectedEndTime}
                        onChange={(e) => setSelectedEndTime(e.target.value)}
                        className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                      >
                        {generateTimeOptions(selectedBlock).map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Assisting Hygienist:</label>
                <select
                  value={selectedAssistingHygienist}
                  onChange={(e) => setSelectedAssistingHygienist(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                >
                <option value="">None</option>
                {availableStaff.map((staffID) => (
                  <option key={staffID} value={staffID}>
                    {`Staff ID: ${staffID}`}
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
                  <option value="" disabled>Select Reason</option>
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