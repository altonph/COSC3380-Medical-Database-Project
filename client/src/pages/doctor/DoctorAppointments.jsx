import React, { useState, useEffect, useRef } from 'react';
import 'react-calendar/dist/Calendar.css';
import Footer from "../../components/Footer";
import HeaderPortalAdmin from '../../components/HeaderPortalDoctor';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

const DoctorAppointment = () => {
    const [date, setDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const fullCalendarRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: '50%', left: '50%' });
  
    const getAppointmentsForDate = (formattedDate) => {
      return appointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.Date);
        return formatDate(appointmentDate) === formattedDate;
      });
    };

    const convertTo12HourFormat = (time) => {
      const [hours, minutes] = time.split(':');
      const amOrPm = parseInt(hours) >= 12 ? 'PM' : 'AM';
      const twelveHourFormatHours = parseInt(hours) % 12 || 12;
      return `${twelveHourFormatHours}:${minutes} ${amOrPm}`;
    };
    
    const eventContent = (eventInfo) => {
      const appointment = eventInfo.event.extendedProps.appointment;
      return (
          <div>
              <p><span className="font-semibold">Patient:</span> {appointment.patientID}</p>
              <p><span className="font-semibold">Appointment type:</span> {appointment.Appointment_Type}</p>
          </div>
      );
    };

    const handleEventClick = (clickInfo) => {
      setSelectedEvent(clickInfo.event);
      setShowModal(true);
    };

    const handleCloseModal = () => {
      setShowModal(false);
      setSelectedEvent(null);
    };

    useEffect(() => {
      const handleClickOutsideModal = (event) => {
        if (selectedEvent && showModal && !event.target.closest("#appointment-modal")) {
          handleCloseModal();
        }
      };
      
      document.addEventListener('mousedown', handleClickOutsideModal);
      return () => {
        document.removeEventListener('mousedown', handleClickOutsideModal);
      };
    }, [selectedEvent, showModal]);

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
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
    const appointmentsForDate = getAppointmentsForDate(formattedDate);

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
              
              <div className="flex justify-center items-center mb-4">
                <button onClick={() => fullCalendarRef.current.getApi().changeView('dayGridMonth')} className="bg-blue-500 text-white px-4 py-2 mr-2">Month View</button>
                <button onClick={() => fullCalendarRef.current.getApi().changeView('timeGridWeek')} className="bg-blue-500 text-white px-4 py-2 mr-2">Week View</button>
                <button onClick={() => fullCalendarRef.current.getApi().changeView('timeGridDay')} className="bg-blue-500 text-white px-4 py-2">Day View</button>
              </div>

              <div className="flex justify-center items-center mb-4">
                <button className="bg-blue-500 text-white px-4 py-2 mr-2">Add New Appointment</button>
                <button className="bg-gray-500 text-white px-4 py-2">Delete Existing Appointment</button>
              </div>

              <div className="flex justify-center items-center">
                <div className="mr-8">
                  <h2 className="text-lg font-semibold mb-2">Select Date:</h2>
                  <FullCalendar
                    ref={fullCalendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    initialView="dayGridMonth"
                    events={appointments.map(appointment => {
                      const formattedDate = new Date(appointment.Date).toISOString().split('T')[0];
                      const startTime = `${formattedDate}T${appointment.Start_time}`;
                      const endTime = `${formattedDate}T${appointment.End_time}`;
                      console.log('Start Time:', startTime);
                      console.log('End Time:', endTime);
                      return {
                        title: `${appointment.Start_time} - ${appointment.End_time}`,
                        start: startTime,
                        end: endTime,
                        appointment: appointment || {},
                      };
                    })}
                    aspectRatio={2} 
                    contentHeight="auto" 
                    slotLabelFormat={{ hour: 'numeric', minute: '2-digit', omitZeroMinute: false }} 
                    eventContent={eventContent}
                    eventClick={handleEventClick}
                  />
                </div>
              </div>

              {showModal && (
                <div className="fixed inset-0 bg-black opacity-50 z-50"></div>
              )}

              {selectedEvent && showModal && (
                <div
                id="appointment-modal"
                className="fixed bg-white border rounded p-4 shadow-lg z-50"
                style={{ top: modalPosition.top, left: modalPosition.left, transform: 'translate(-50%, -50%)' }}
                >
                  <h3 className="font-bold mb-2">Appointment Details</h3>
                  <div>
                    <p><span className="font-semibold">Start Time:</span> {convertTo12HourFormat(selectedEvent.extendedProps.appointment.Start_time)}</p>
                    <p><span className="font-semibold">End Time:</span> {convertTo12HourFormat(selectedEvent.extendedProps.appointment.End_time)}</p>
                    <p><span className="font-semibold">Patient:</span> {selectedEvent.extendedProps.appointment.patientID}</p>
                    <p><span className="font-semibold">Appointment Type:</span> {selectedEvent.extendedProps.appointment.Appointment_Type}</p>
                    <p><span className="font-semibold">Appointment Status:</span> {selectedEvent.extendedProps.appointment.Appointment_Status}</p>
                    <p><span className="font-semibold">Cancellation Reason:</span> {selectedEvent.extendedProps.appointment.Cancellation_Reason}</p>
                    <p><span className="font-semibold">Specialist Approval:</span> {selectedEvent.extendedProps.appointment.Specialist_Approval}</p>
                    <p><span className="font-semibold">Is Active:</span> {selectedEvent.extendedProps.appointment.Is_active}</p>
                  </div>
                </div>
              )}
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
