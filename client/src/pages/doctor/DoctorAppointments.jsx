import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Footer from "../../components/Footer";
import HeaderPortalAdmin from '../../components/HeaderPortalDoctor';

const DoctorAppointment = () => {
    const [date, setDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedAppointment, setEditedAppointment] = useState(null);

    const isAppointmentDay = (day) => {
      const formattedDay = formatDate(day);
      return appointments.some((appointment) => {
        const appointmentDate = new Date(appointment.Date);
        const formattedAppointmentDate = formatDate(appointmentDate);
        return formattedAppointmentDate === formattedDay;
      });
    };
  
    const getAppointmentsForDate = (formattedDate) => {
      return appointments.filter((appointment) => appointment.Date === formattedDate);
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

    const handleEdit = (appointment) => {
      setEditMode(true);
      setEditedAppointment(appointment);
    };

    const handleSave = () => {
      setEditMode(false);
      setEditedAppointment(null);
    };

    const handleCancel = () => {
      setEditMode(false);
      setEditedAppointment(null);
    };

    useEffect(() => {
      const fetchAppointments = async () => {
        try {
          const token = localStorage.getItem('token'); 
          const response = await fetch('http://localhost:5000/api/doctor/appointments', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch appointments');
          }
          const data = await response.json();
          setAppointments(data);
          console.log(data);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      };

      fetchAppointments();
    }, []); 
  
    const formattedDate = formatDate(date);
    console.log(formattedDate);
    const appointmentsForDate = getAppointmentsForDate(formattedDate);

    const [calendarDate, setCalendarDate] = useState(new Date(formattedDate));
  
    return (
      <>
        <div className="flex h-screen flex-col">
          <nav>
            <HeaderPortalAdmin/>
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
            
            <main className="flex-1 p-4">
              <h1 className="text-3xl font-bold mt-14 mb-4 p-8">Edit Appointments</h1>
              
              <div className="flex justify-center items-center">
                <div className="mr-8">
                  <h2 className="text-lg font-semibold mb-2">Select Date:</h2>
                  <Calendar
                    onChange={handleDateChange}
                    value={calendarDate}
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
                        {editMode && editedAppointment === appointment ? (
                          <>
                            <div>
                              <p><span className="font-semibold">Start Time:</span> {appointment.Start_time}</p>
                              <p><span className="font-semibold">End Time:</span> {appointment.End_time}</p>
                              <p><span className="font-semibold">Appointment Type:</span> {appointment.Appointment_Type}</p>
                              <p><span className="font-semibold">Appointment Status:</span> {appointment.Appointment_Status}</p>
                              <p><span className="font-semibold">Cancellation Reason:</span> {appointment.Cancellation_Reason}</p>
                              <p><span className="font-semibold">Specialist Approval:</span> {appointment.Specialist_Approval}</p>
                              <p><span className="font-semibold">Is Active:</span> {appointment.Is_active}</p>
                            </div>
                            <div>
                              <p><span className="font-semibold">Office ID:</span> {appointment.officeID}</p>
                              <p><span className="font-semibold">Dentist ID:</span> {appointment.dentistID}</p>
                              <p><span className="font-semibold">Staff ID:</span> {appointment.staffID}</p>
                              <p><span className="font-semibold">Patient ID:</span> {appointment.patientID}</p>
                            </div>
                            <div>
                              <button onClick={handleSave} className="bg-green-500 text-white px-2 py-1 mr-2 ml-4">Save</button>
                              <button onClick={handleCancel} className="bg-red-500 text-white px-2 py-1 ml-4">Cancel</button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <p><span className="font-semibold">Start Time:</span> {appointment.Start_time}</p>
                              <p><span className="font-semibold">End Time:</span> {appointment.End_time}</p>
                              <p><span className="font-semibold">Appointment Type:</span> {appointment.Appointment_Type}</p>
                              <p><span className="font-semibold">Appointment Status:</span> {appointment.Appointment_Status}</p>
                              <p><span className="font-semibold">Cancellation Reason:</span> {appointment.Cancellation_Reason}</p>
                              <p><span className="font-semibold">Specialist Approval:</span> {appointment.Specialist_Approval}</p>
                              <p><span className="font-semibold">Is Active:</span> {appointment.Is_active}</p>
                            </div>
                            <div>
                              <p><span className="font-semibold">Office ID:</span> {appointment.officeID}</p>
                              <p><span className="font-semibold">Dentist ID:</span> {appointment.dentistID}</p>
                              <p><span className="font-semibold">Staff ID:</span> {appointment.staffID}</p>
                              <p><span className="font-semibold">Patient ID:</span> {appointment.patientID}</p>
                            </div>
                            <div>
                              <button onClick={() => handleEdit(appointment)} className="bg-blue-500 text-white px-2 py-1 mr-2 ml-4">Edit</button>
                              <button className="bg-red-500 text-white px-2 py-1 ml-4">Delete</button>
                            </div>
                          </>
                        )}
                      </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No appointments for {formattedDate}</p>
                  )}
                </div>
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
  
  export default DoctorAppointment;