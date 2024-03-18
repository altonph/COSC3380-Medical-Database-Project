import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const EditAppointment = () => {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([
    // Sample appointment data
    { 
        visitId: '1',
        date: '2024-01-15', 
        time: '10:00 AM', 
        officeName: 'Random Office 1',
        dentistId: '101',
        dentistName: 'Dr. First',
        staffName: 'Staff 1',
        patientId: '001',
        patientName: 'Patient 1',
        visitType: 'Regular Checkup',
        diagnosis: 'Tooth decay',
        treatment: 'Filling',
        notes: 'Patient needs to follow up in 6 months.'
      },
      { 
        visitId: '2',
        date: '2024-01-15', 
        time: '2:00 PM', 
        officeName: 'Random Office 1',
        dentistId: '101',
        dentistName: 'Dr. First',
        staffName: 'Staff 1',
        patientId: '001',
        patientName: 'Patient 1',
        visitType: 'Dental Cleaning',
        diagnosis: 'Healthy teeth and gums',
        treatment: 'Cleaning',
        notes: 'No additional instructions.'
      },
      { 
        visitId: '3',
        date: '2024-01-17', 
        time: '02:00 PM', 
        officeName: 'Random Office 2',
        dentistId: '102',
        dentistName: 'Dr. Second',
        staffName: 'Staff 2',
        patientId: '002',
        patientName: 'Patient 2',
        visitType: 'Tooth Extraction',
        diagnosis: 'Impacted wisdom tooth',
        treatment: 'Extraction',
        notes: 'Patient should avoid hard foods for a few days.'
      },
      { 
        visitId: '4',
        date: '2024-01-25', 
        time: '09:30 AM', 
        officeName: 'Random Office 3',
        dentistId: '103',
        dentistName: 'Dr. Third',
        staffName: 'Staff 3',
        patientId: '003',
        patientName: 'Patient 3',
        visitType: 'Root Canal Treatment',
        diagnosis: 'Infected tooth pulp',
        treatment: 'Root canal therapy',
        notes: 'Patient needs to take antibiotics as prescribed.'
      },
  ]);

  const isAppointmentDay = (day) => {
    const formattedDay = formatDate(day);
    return appointments.some((appointment) => appointment.date === formattedDay);
  };

  const getAppointmentsForDate = (formattedDate) => {
    return appointments.filter((appointment) => appointment.date === formattedDate);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const formattedDate = formatDate(date);
  const appointmentsForDate = getAppointmentsForDate(formattedDate);

  return (
    <>
      <div className="flex h-screen flex-col">
        <nav>
          <Header />
        </nav>

        <div className="flex flex-1">
          <aside className="w-1/6 bg-gray-200 text-black mt-14">
            <nav className="p-4 text-xl">
              <ul>
              <li><a href="#" className="block py-2 text-center text-gray-600 hover:text-black">Home</a></li>
                <li><a href="/admin/appointments" className="block py-2 text-center font-bold underline">Appointments</a></li>
                <li><a href="/admin/patients" className="block py-2 text-center text-gray-600 hover:text-black">Patients</a></li>
                <li><a href="/admin/staff" className="block py-2 text-center text-gray-600 hover:text-black">Staff</a></li>
                <li><a href="/admin/data-reports" className="block py-2 text-center text-gray-600 hover:text-black">Data Reports</a></li>
              </ul>
            </nav>
          </aside>
          
          <main className="flex-1 p-4">
            <h1 className="text-3xl font-bold mt-14 mb-4 p-8">Edit Appointments</h1>
            
            <div className="flex justify-center items-center">
              <div className="mr-8">
                <h2 className="text-lg font-semibold mb-2">Select Date:</h2>
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  tileClassName={({ date, view }) =>
                    view === 'month' && isAppointmentDay(date) ? 'bg-green-500' : ''
                  }
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Appointments for {formattedDate}:</h2>
                {appointmentsForDate.length > 0 ? (
                  <ul>
                    {appointmentsForDate.map((appointment, index) => (
                      <li key={index} className="mb-4 flex justify-between">
                        <div>
                          <p><span className="font-semibold">Time:</span> {appointment.time}</p>
                          <p><span className="font-semibold">Office Name:</span> {appointment.officeName}</p>
                          <p><span className="font-semibold">Dentist Name:</span> {appointment.dentistName}</p>
                        </div>
                        <div className = "ml-4">
                          <p><span className="font-semibold">Staff Name:</span> {appointment.staffName}</p>
                          <p><span className="font-semibold">Patient Name:</span> {appointment.patientName}</p>
                          <p><span className="font-semibold">Patient ID:</span> {appointment.patientId}</p>
                        </div>
                        <div>
                          <button className="bg-blue-500 text-white px-2 py-1 mr-2 ml-4">Edit</button>
                          <button className="bg-red-500 text-white px-2 py-1 ml-4">Delete</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No appointments for {formattedDate}</p>
                )}
              </div>
            </div>
            
            {/* Visit Details and Medical History */}
            <div className="mt-8 ml-8">
              {appointmentsForDate.map((appointment, index) => (
                <div key={index} className="border-t mt-4 pt-4">
                  {/* Visit Details */}
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Visit Details:</h2>
                    <ul>
                      <li>
                        <p><span className="font-semibold">Visit ID:</span> {appointment.visitId}</p>
                        <p><span className="font-semibold">Dentist ID and Name:</span> {appointment.dentistId} - {appointment.dentistName}</p>
                        <p><span className="font-semibold">Patient Name:</span> {appointment.patientName}</p>
                        <p><span className="font-semibold">Patient ID:</span> {appointment.patientId}</p>
                        <p><span className="font-semibold">Visit Type:</span> {appointment.visitType}</p>
                        <p><span className="font-semibold">Diagnosis:</span> {appointment.diagnosis}</p>
                        <p><span className="font-semibold">Treatment:</span> {appointment.treatment}</p>
                        <p><span className="font-semibold">Notes:</span> {appointment.notes}</p>
                      </li>
                    </ul>
                  </div>

                  {/* Medical History */}
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold mb-2">Medical History:</h2>
                    <ul>
                      <li>
                        <p><span className="font-semibold">Allergies:</span> {appointment.allergies}</p>
                        <p><span className="font-semibold">Height:</span> {appointment.height}</p>
                        <p><span className="font-semibold">Weight:</span> {appointment.weight}</p>
                        <p><span className="font-semibold">Notes:</span> {appointment.medicalNotes}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>

        <nav>
          <Footer/>
        </nav>
      </div>
    </>
  );
};

export default EditAppointment;
