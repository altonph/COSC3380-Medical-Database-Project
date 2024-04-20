import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderPortalStaff from "../../components/HeaderPortalStaff";
import Footer from "../../components/Footer";

const StaffAddVisitDetails = () => {
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [notes, setNotes] = useState('');
  const token = localStorage.getItem('token'); 
  const [prescriptions, setPrescriptions] = useState([]);
  const [showPrescriptionDropdown, setShowPrescriptionDropdown] = useState(false);
  const [numberOfPrescriptions, setNumberOfPrescriptions] = useState(1);
  const [isInsertSuccess, setIsInsertSuccess] = useState(false);
  const [scheduleFollowUp, setScheduleFollowUp] = useState(false);

  useEffect(() => {
    const storedAppointment = localStorage.getItem('appointmentDetails');
    if (storedAppointment) {
      const appointment = JSON.parse(storedAppointment);
      setAppointmentDetails(appointment);
    }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleConfirm = () => {
    const visitDetailsData = {
        patientID: appointmentDetails.patientID,
        dentistID: appointmentDetails.dentistID,
        officeID: appointmentDetails.officeID,
        Date: formatDate(appointmentDetails.Date),
        Start_time: appointmentDetails.Start_time,
        Diagnosis: diagnosis,
        Treatment: treatment,
        Notes: notes
    };

    fetch('https://cosc3380-medical-database-project-server.onrender.com/api/staff/appointments/visit-details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(visitDetailsData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        const { visitID } = data;
        console.log('VisitID:', visitID);
        setIsInsertSuccess(true);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  };

  const handleConfirmPrescriptions = () => {
    const { visitID } = appointmentDetails;

    prescriptions.forEach(prescription => {
        const prescriptionData = {
            dentistID: appointmentDetails.dentistID,
            patientID: appointmentDetails.patientID,
            visitID: visitID,
            National_Drug_Code: prescription.National_Drug_Code,
            Medication_Name: prescription.Medication_Name,
            Medication_Dosage: prescription.Medication_Dosage,
            Refills: prescription.Refills,
            notes: prescription.notes,
            Date_prescribed: new Date().toISOString().split('T')[0]
        };

        fetch('https://cosc3380-medical-database-project-server.onrender.com/api/staff/appointments/prescriptions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(prescriptionData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Prescription inserted successfully:', data);
        })
        .catch(error => {
            console.error('Error inserting prescription:', error);
        });
    });
  };


  const handleCheckboxChange = (e) => {
    setShowPrescriptionDropdown(e.target.checked);
  };

  const handleDropdownChange = (e) => {
    setNumberOfPrescriptions(parseInt(e.target.value));
  };

  const handlePrescriptionChange = (index, field, value) => {
    const updatedPrescriptions = prescriptions.map((prescription, i) => {
      if (i === index) {
        return { ...prescription, [field]: value };
      }
      return prescription;
    });
    setPrescriptions(updatedPrescriptions);
  };

  const renderPrescriptionInputs = () => {
    return prescriptions.map((prescription, index) => (
      <div key={index}>
        <h2 className="text-xl font-bold mb-2">Prescription {index + 1}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>National Drug Code:</label>
            <input
              type="text"
              value={prescription.National_Drug_Code || ''}
              onChange={(e) => handlePrescriptionChange(index, 'National_Drug_Code', e.target.value)}
            />
          </div>
          <div>
            <label>Medication Name:</label>
            <input
              type="text"
              value={prescription.Medication_Name || ''}
              onChange={(e) => handlePrescriptionChange(index, 'Medication_Name', e.target.value)}
            />
          </div>
          <div>
            <label>Medication Dosage:</label>
            <input
              type="text"
              value={prescription.Medication_Dosage || ''}
              onChange={(e) => handlePrescriptionChange(index, 'Medication_Dosage', e.target.value)}
            />
          </div>
          <div>
            <label>Refills:</label>
            <input
              type="number"
              value={prescription.Refills || ''}
              onChange={(e) => handlePrescriptionChange(index, 'Refills', parseInt(e.target.value))}
            />
          </div>
          <div>
            <label>Notes:</label>
            <input
              type="text"
              value={prescription.notes || ''}
              onChange={(e) => handlePrescriptionChange(index, 'notes', e.target.value)}
            />
          </div>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    const initialPrescriptions = Array.from({ length: numberOfPrescriptions }, (_, index) => ({
      National_Drug_Code: '',
      Medication_Name: '',
      Medication_Dosage: '',
      Refills: 0,
      notes: '',
    }));
    setPrescriptions(initialPrescriptions);
  }, [numberOfPrescriptions]);

  return (
    <>
      <div className="flex h-screen flex-col">
        <nav>
          <HeaderPortalStaff />
        </nav>

        <div className="flex flex-1">
          <aside className="w-1/6 bg-gray-200 text-black">
            <nav className="p-4 text-xl">
              <ul>
                <li><a href="#" className="block py-2 text-center font-bold underline">Home</a></li>
                <li><a href="/staff/appointments" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</a></li>
                <li><a href="/staff/patients" className="block py-2 text-center text-gray-600 hover:text-black">Patients</a></li>
              </ul>
            </nav>
          </aside>

          <main className="flex-1 p-4">
            <div className="max-w-4xl mx-auto mt-8 p-4">
              <h1 className="text-3xl font-bold mb-4">Appointment Details</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Dentist ID:</label>
                  <div className="border border-gray-300 rounded-md py-2 px-3">{appointmentDetails ? appointmentDetails.dentistID : ''}</div>
                </div>

                <div>
                  <label className="block mb-2">Patient ID:</label>
                  <div className="border border-gray-300 rounded-md py-2 px-3">{appointmentDetails ? appointmentDetails.patientID : ''}</div>
                </div>

                <div>
                  <label className="block mb-2">Staff ID:</label>
                  <div className="border border-gray-300 rounded-md py-2 px-3">{appointmentDetails ? appointmentDetails.staffID : ''}</div>
                </div>

                <div>
                  <label className="block mb-2">Office:</label>
                  <div className="border border-gray-300 rounded-md py-2 px-3">{appointmentDetails ? appointmentDetails.officeID : ''}</div>
                </div>

                <div>
                  <label className="block mb-2">Date:</label>
                  <div className="border border-gray-300 rounded-md py-2 px-3">{appointmentDetails ? appointmentDetails.Date : ''}</div>
                </div>

                <div>
                  <label className="block mb-2">Appointment Type:</label>
                  <div className="border border-gray-300 rounded-md py-2 px-3">{appointmentDetails ? appointmentDetails.Appointment_Type : ''}</div>
                </div>

                <div>
                  <label className="block mb-2">Start Time:</label>
                  <div className="border border-gray-300 rounded-md py-2 px-3">{appointmentDetails ? appointmentDetails.Start_time : ''}</div>
                </div>

                <div>
                  <label className="block mb-2">End Time:</label>
                  <div className="border border-gray-300 rounded-md py-2 px-3">{appointmentDetails ? appointmentDetails.End_time : ''}</div>
                </div>
              </div>

              <div className="col-span-2">
                <h2 className="text-2xl font-bold mb-4 mt-4">Add Visit Details</h2>
              </div>

              <div>
                <label className="block mb-2">Diagnosis:</label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-3 w-full"
                />
              </div>

              <div>
                <label className="block mb-2">Treatment:</label>
                <input
                  type="text"
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-3 w-full"
                />
              </div>

              <div>
                <label className="block mb-2">Notes:</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-3 w-full"
                  rows="4"
                />
              </div>

              <div className="col-span-2">
              <button onClick={handleConfirm} className="bg-blue-500 text-white px-4 py-2 mr-2 mt-4 mb-4">Confirm</button>
              {isInsertSuccess && (
                <label className="block mt-2 text-lg"> 
                  <input type="checkbox" className="mr-2 h-6 w-6 mt-4" onChange={handleCheckboxChange} /> 
                  Add Prescriptions
                </label>
              )}
              {showPrescriptionDropdown && (
                <>
                  <label className="block mt-2 text-lg">Number of Prescriptions:</label>
                  <select value={numberOfPrescriptions} onChange={handleDropdownChange} className="mt-2 p-2 rounded-md">
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </>
              )}
              {showPrescriptionDropdown && renderPrescriptionInputs()}
              {showPrescriptionDropdown && (
                <button onClick={handleConfirmPrescriptions} className="bg-blue-500 text-white px-4 py-2 mt-4">Confirm Prescriptions</button>
              )}
              {isInsertSuccess && (
                <div>
                  <label className="block mt-2 text-lg"> 
                    <input type="checkbox" className="mr-2 h-6 w-6 mt-4" onChange={(e) => setScheduleFollowUp(e.target.checked)} /> 
                    Schedule Follow Up Appointment
                  </label>
                </div>
              )}
            </div>
            <Link to="/staff/appointments" className="bg-blue-500 text-white px-4 py-2 mt-4">Return to Appointments Page</Link>
            </div>
          </main>
        </div>

        <nav>
          <Footer />
        </nav>
      </div>
    </>
  );    
};

export default StaffAddVisitDetails;