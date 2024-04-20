import React, { useState, useEffect, useRef } from 'react';
import 'react-calendar/dist/Calendar.css';
import Footer from "../../components/Footer";
import HeaderPortalAdmin from '../../components/HeaderPortalAdmin';
import { Link } from "react-router-dom";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

const AdminAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const fullCalendarRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(selectedEvent?.extendedProps.appointment.Appointment_Status || '');
    const [modalPosition, setModalPosition] = useState({ top: '50%', left: '50%' });
    const [hasVisitDetailsForSelected, setHasVisitDetailsForSelected] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [cancelled, setCancelled] = useState(false);
    const [doctorSpecialty, setDoctorSpecialty] = useState(null);

    useEffect(() => {
      const fetchDoctorSpecialty = async () => {
          try {
              const token = localStorage.getItem('token');

              const response = await fetch('https://cosc3380-medical-database-project-server.onrender.com/api/doctor/appointments/get-specialty', {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                  }
              });

              if (!response.ok) {
                  throw new Error('Failed to fetch doctor specialty');
              }
              const data = await response.json();
              setDoctorSpecialty(data);
              console.log('Doctor Specialty:', data);
          } catch (error) {
              console.error('Error fetching doctor specialty:', error);
          }
      };
      fetchDoctorSpecialty();
  }, []);

    const convertTo12HourFormat = (time) => {
      const [hours, minutes] = time.split(':');
      const amOrPm = parseInt(hours) >= 12 ? 'PM' : 'AM';
      const twelveHourFormatHours = parseInt(hours) % 12 || 12;
      return `${twelveHourFormatHours}:${minutes} ${amOrPm}`;
    };
    
    const eventContent = (eventInfo) => {
      const appointment = eventInfo.event.extendedProps.appointment;
      let eventClass = '';
      let textColorClass = '';
    
      if (appointment.Appointment_status === 'Scheduled') {
        eventClass = 'bg-blue-100'; 
      } else if (appointment.Appointment_status === 'Completed') {
        eventClass = 'bg-green-100'; 
      } else {
        eventClass = 'bg-white'; 
      }
      
      textColorClass = 'text-black';
    
      return (
        <div className={`${eventClass} ${textColorClass}`}>
          <p><span className="font-semibold">Patient:</span> {appointment.PatientFirstName} {appointment.PatientLastName}</p>
          <p><span className="font-semibold">Appointment type:</span> {appointment.Appointment_type}</p>
        </div>
      );
    };    

    const handleEventClick = (clickInfo) => {
      setSelectedEvent(clickInfo.event);
      setShowModal(true);
      const appointmentData = { ...clickInfo.event.extendedProps.appointment }; 
      fetchVisitDetailsCount(appointmentData);
    };
    

    const handleCloseModal = () => {
      setShowModal(false);
      setSelectedEvent(null);
      setCompleted(false); 
      setCancelled(false); 
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

    const handleAddVisitDetails = async () => {
      try {
        if (!selectedEvent) return;
    
        const appointmentDate = new Date(selectedEvent.extendedProps.appointment.Date);
        const currentDate = new Date();
    
        if (appointmentDate > currentDate) {
          alert("You cannot add visit details for future appointments.");
          return;
        }
    
        if (hasVisitDetailsForSelected) {
          alert("Sorry, this appointment already has an associated visit details.");
          return;
        }
    
        const appointmentData = selectedEvent.extendedProps.appointment;
        localStorage.setItem('appointmentDetails', JSON.stringify(appointmentData));
    
        window.location.href = "/doctor/appointments/add-visit-details";
      } catch (error) {
        console.error('Error handling add visit details:', error);
      }
    };

    const handleAppointmentSubmission = async () => {
      try {
        if (!selectedEvent) return;
        
        if (!hasVisitDetailsForSelected && completed) {
          alert("Please submit visit details for this appointment before marking it as complete.");
          return;
        }
    
        if (hasVisitDetailsForSelected && cancelled) {
          alert("Sorry, you can't cancel an appointment after its visit details have been submitted.");
          return;
        }
        
        let appointmentStatus = '';
        let cancellationReason = null; 
        if (completed) {
          appointmentStatus = 'Completed';
        } else if (cancelled) {
          appointmentStatus = 'Cancelled';
          cancellationReason = document.getElementById('cancellationReason').value;
        } else {
          const appointmentData = selectedEvent.extendedProps.appointment;
          appointmentStatus = appointmentData.Appointment_status;
        }
    
        const appointmentData = selectedEvent.extendedProps.appointment;
        const token = localStorage.getItem('token');
        const requestBody = {
          dentistID: appointmentData.dentistID,
          patientID: appointmentData.patientID,
          Date: formatDate(new Date(appointmentData.Date)),
          Start_time: appointmentData.Start_time,
          End_time: appointmentData.End_time,
          Appointment_Status: appointmentStatus,
          Cancellation_Reason: cancellationReason 
        };
    
        const response = await fetch(`https://cosc3380-medical-database-project-server.onrender.com/api/doctor/appointments/update-status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(requestBody)
        });
    
        if (!response.ok) {
          throw new Error('Failed to update appointment status');
        }
    
        const updatedAppointment = { ...appointmentData, Appointment_Status: appointmentStatus };
        const updatedAppointments = appointments.map(appointment => {
          if (appointment.patientID === updatedAppointment.patientID && appointment.dentistID === updatedAppointment.dentistID && appointment.Start_time === updatedAppointment.Start_time
          && formatDate(new Date(appointment.Date)) === formatDate(new Date(updatedAppointment.Date))) {
            console.log("Matching appointment found");
            return updatedAppointment;
          }
          return appointment;
        });
        setAppointments(updatedAppointments);
        handleCloseModal();
      } catch (error) {
        console.error('Error updating appointment status:', error);
      }
    };      

    const fetchVisitDetailsCount = async (appointmentData) => {
      try {
          const formattedDate = formatDate(new Date(appointmentData.Date));
          appointmentData.Date = formattedDate;
  
          const token = localStorage.getItem('token');
          const response = await fetch('https://cosc3380-medical-database-project-server.onrender.com/api/doctor/appointments/check-visit-details', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(appointmentData)
          });
          if (!response.ok) {
              throw new Error('Failed to fetch visit details count');
          }
          const data = await response.json();
          const visitDetailsCount = data.visitDetailsCount;
          console.log(visitDetailsCount);
          setHasVisitDetailsForSelected(visitDetailsCount > 0);
      } catch (error) {
          console.error('Error fetching visit details count:', error);
      }
  };
    

    useEffect(() => {
      const fetchAppointments = async () => {
        try {
          const token = localStorage.getItem('token'); 
          const response = await fetch('https://cosc3380-medical-database-project-server.onrender.com/api/doctor/appointments', {
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

    useEffect(() => {
      setSelectedStatus(selectedEvent?.extendedProps.appointment.Appointment_Status || '');
    }, [selectedEvent]);

    const handleCancelledCheckboxChange = () => {
      if (!cancelled) {
        setCompleted(false);
      }
      setCancelled(!cancelled);
    };
    
    const handleCompletedCheckboxChange = () => {
      if (!completed) {
        setCancelled(false);
      }
      setCompleted(!completed);
    };  

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
                <li><a href="/admin/home" className="block py-2 text-center text-gray-600 hover:text-black">Home</a></li>
                <li><a href="/admin/appointments" className="block py-2 text-center font-bold underline">Appointments</a></li>
                <li><a href="/admin/patients" className="block py-2 text-center text-gray-600 hover:text-black">Patients</a></li>
                <li><a href="/admin/dentists" className="block py-2 text-center text-gray-600 hover:text-black">Dentists</a></li>
                <li><a href="/admin/staff" className="block py-2 text-center text-gray-600 hover:text-black">Staff</a></li>
                <li><a href="/admin/appointment-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Appointment Data Report</a></li>
                <li><a href="/admin/finance-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Finance Data Report</a></li>
                <li><a href="/admin/demographic-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Demographic Data Report</a></li>
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
                <Link to="/admin/appointments/make-appointment" className="bg-blue-500 text-white px-4 py-2 mr-2">Add New Appointment</Link>
              </div>
    
              <div className="flex justify-center items-center">
                <div className="mr-8">
                  <h2 className="text-lg font-semibold mb-2">Select Date:</h2>
                  <FullCalendar
                    ref={fullCalendarRef}
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    initialView="dayGridMonth"
                    events={appointments
                      .filter(appointment => appointment.Appointment_status !== 'Cancelled') 
                      .map(appointment => {
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
    
              {selectedEvent && showModal && (
                <>
                  <div className="fixed inset-0 bg-black opacity-50 z-50"></div> 
                  <div
                    id="appointment-modal"
                    className="fixed bg-white border rounded p-4 shadow-lg z-50"
                    style={{ top: modalPosition.top, left: modalPosition.left, transform: 'translate(-50%, -50%)' }}
                  >
                    <h3 className="font-bold mb-2">Appointment Details</h3>
                    <div>
                      <p><span className="font-semibold">Start Time:</span> {convertTo12HourFormat(selectedEvent.extendedProps.appointment.Start_time)}</p>
                      <p><span className="font-semibold">End Time:</span> {convertTo12HourFormat(selectedEvent.extendedProps.appointment.End_time)}</p>
                      <p><span className="font-semibold">Patient:</span> {selectedEvent.extendedProps.appointment.PatientFirstName} {selectedEvent.extendedProps.appointment.PatientLastName}</p>
                      <p><span className="font-semibold">Staff:</span> {selectedEvent.extendedProps.appointment.StaffFirstName} {selectedEvent.extendedProps.appointment.StaffLastName}</p>
                      <p><span className="font-semibold">Appointment Type:</span> {selectedEvent.extendedProps.appointment.Appointment_type}</p>
                      <p><span className="font-semibold">Appointment Status:</span> {selectedEvent.extendedProps.appointment.Appointment_status}</p>
                      <p><span className="font-semibold">Primary Approval:</span> {selectedEvent.extendedProps.appointment.Primary_approval}</p>
                      {cancelled && (
                        <div>
                          <label htmlFor="cancellationReason" className="font-semibold">Cancellation Reason:</label>
                          <input 
                            type="text" 
                            id="cancellationReason" 
                            name="cancellationReason" 
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
                          />
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={handleAddVisitDetails}
                        disabled={hasVisitDetailsForSelected}
                        className={`px-4 py-2 mr-2 ${hasVisitDetailsForSelected ? 'bg-gray-500' : 'bg-blue-500'} text-white`}
                      >
                        Add Visit Details
                      </button>
                      <div className="font-semibold mb-2 flex items-center mt-4">
                      <span>Cancel Appointment:</span>
                        <input 
                        type="checkbox" 
                        id="cancelledCheckbox"
                        className="ml-4"
                        checked={cancelled} 
                        onChange={handleCancelledCheckboxChange}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <button onClick={handleAppointmentSubmission} className="bg-blue-500 text-white px-4 py-2 mr-2">Submit</button>
                    </div>
                  </div>
                </>
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

export default AdminAppointments;