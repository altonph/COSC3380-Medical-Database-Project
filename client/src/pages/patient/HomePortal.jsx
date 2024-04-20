import React, { useEffect, useState } from 'react';
import HeaderPortalPatient from '../../components/HeaderPortalPatient';
import Footer from '../../components/Footer';

const HomePortal = () => {
    const [appointments, setAppointments] = useState([]);
    const [patientName, setPatientName] = useState('Patient Name');
    const [cancellationReason, setCancellationReason] = useState('');

    useEffect(() => {
        const firstName = localStorage.getItem('firstName');
        const lastName = localStorage.getItem('lastName');
        if (firstName && lastName) {
            setPatientName(`${firstName} ${lastName}`);
        }

        fetchAppointments();
    }, []);

    const fetchAppointments = () => {
        fetch('http://localhost:5000/api/patient/appointments', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch appointments');
            }
            return response.json();
        })
        .then(data => {
            const filteredAppointments = data.filter(appointment => {
                const appointmentDate = new Date(appointment.Date);
                const currentDate = new Date();
                return appointmentDate > currentDate;
            });
            setAppointments(filteredAppointments);
        })
        .catch(error => {
            console.error('Error fetching appointments:', error);
        });
    };

    const handleCancelAppointment = (date, startTime, dentistID, patientID) => {
        const confirmation = window.confirm('Are you sure you want to cancel this appointment?');
        if (!confirmation) {
            return; 
        }

        const reason = prompt('Cancellation Reason:');
        if (!reason) {
            return; 
        }

        setCancellationReason(reason);
        console.log(reason);

        fetch('http://localhost:5000/api/patient/cancel-appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ date, startTime, dentistID, patientID, reason })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to cancel appointment');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message); 
            fetchAppointments(); 
        })
        .catch(error => {
            console.error('Error cancelling appointment:', error);
        });
    };
    
    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        let hour = parseInt(hours, 10);
        const period = hour >= 12 ? 'PM' : 'AM';
        if (hour > 12) {
            hour -= 12;
        } else if (hour === 0) {
            hour = 12;
        }
        return `${hour}:${minutes} ${period}`;
    }
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }

    function formatDateForBackend(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString();
        let day = date.getDate().toString();
        if (month.length === 1) {
            month = '0' + month;
        }
        if (day.length === 1) {
            day = '0' + day;
        }
    
        return `${year}-${month}-${day}`;
    }

    return (
        <>
            <div className="flex h-screen flex-col">
                <nav>
                    <HeaderPortalPatient />
                </nav>

                <div className="flex flex-1">
                    <aside className="w-1/6 bg-gray-200 text-black">
                        <nav className="p-4 text-xl">
                            <ul>
                            <li><a href="/patient/home" className="block py-2 text-center font-bold underline">Home</a></li>
                            <li><a href="/patient/appointment" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</a></li>
                            <li><a href="/patient/payment" className="block py-2 text-center text-gray-600 hover:text-black">Billing & Payments</a></li>
                            <li><a href="/patient/visit" className="block py-2 text-center text-gray-600 hover:text-black">Visit Details</a></li>
                            <li><a href="/patient/history" className="block py-2 text-center text-gray-600 hover:text-black">Medical History</a></li>
                            <li><a href="/patient/prescriptions" className="block py-2 text-center text-gray-600 hover:text-black">Prescriptions</a></li>
                            </ul>
                        </nav>
                    </aside>
                    
                    <main className="flex-1 p-4">
                        <h1 className="text-3xl font-bold mb-4 p-8">Welcome {patientName}!</h1>
                        
                        <h1 className= "text-xl font-bold pb-4 ml-4">Upcoming Appointments</h1>
                        
                        {appointments.length > 0 ? (
                            <div className="container mx-auto mt-4">
                                {appointments.map((detail, index) => (
                                    <div key={index} className="border border-gray-200 rounded p-4 mb-4">
                                        <h2 className="text-lg font-semibold">Date: {formatDate(detail.Date)}</h2>
                                        <p className="text-lg text-gray-600">Start time: {formatTime(detail.Start_time)}</p>
                                        <p className="text-lg text-gray-600">Office: {detail.office_address} </p>
                                        <p className="text-lg text-gray-600">Doctor: Dr. {detail.Dentist_FirstName} {detail.Dentist_LastName} </p>
                                        <p className="text-lg text-gray-600">Appointment type: {detail.Appointment_type}</p>
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 mr-4 rounded-md hover:bg-blue-600 hover:text-white mt-4"
                                            onClick={() => handleCancelAppointment(formatDateForBackend(detail.Date), detail.Start_time, detail.dentistID, detail.patientID)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className= "flex p-4 justify-between border rounded-lg mx-8 px-4 py-2 bg-white py-4">
                                <p className= "ml-8 p-2 flex-grow">Need to schedule a new appointment?</p>
                                <a className="bg-blue-500 text-white px-4 py-2 mr-4 rounded-md hover:bg-blue-600 hover:text-white" href="/patient/appointment">Schedule Now</a>
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

export default HomePortal;