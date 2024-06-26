import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderPortalAdmin from "../../components/HeaderPortalAdmin";
import Footer from "../../components/Footer";

const AdminAddVisitDetails = () => {
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [notes, setNotes] = useState('');
  const token = localStorage.getItem('token'); 
  const [prescriptions, setPrescriptions] = useState([]);
  const [showPrescriptionDropdown, setShowPrescriptionDropdown] = useState(false);
  const [numberOfPrescriptions, setNumberOfPrescriptions] = useState(1);
  const [isInsertSuccess, setIsInsertSuccess] = useState(false);
  const [isInsertSuccessPrescriptions, setIsInsertSuccessPrescriptions] = useState(false);
  const [scheduleFollowUp, setScheduleFollowUp] = useState(false);
  const [approveForSpecialist, setApproveForSpecialist] = useState(false);
  const [doctorSpecialty, setDoctorSpecialty] = useState(null);
  const [discountMessage, setDiscountMessage] = useState("");

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
              setDoctorSpecialty(data.Specialty);
              console.log('Doctor Specialty:', data.Specialty);
          } catch (error) {
              console.error('Error fetching doctor specialty:', error);
          }
      };
      fetchDoctorSpecialty();
  }, []);

  useEffect(() => {
    const storedAppointment = localStorage.getItem('appointmentDetails');
    if (storedAppointment) {
      const appointment = JSON.parse(storedAppointment);
      setAppointmentDetails(appointment);
    }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const isoDateString = date.toISOString(); 
    return isoDateString.split('T')[0]; 
  };

  const updateAppointmentStatus = async (appointmentStatus, cancellationReason) => {
    try {
      const requestBody = {
        dentistID: appointmentDetails.dentistID,
        patientID: appointmentDetails.patientID,
        Date: formatDate(appointmentDetails.Date),
        Start_time: appointmentDetails.Start_time,
        Appointment_Status: appointmentStatus,
        Cancellation_Reason: cancellationReason
      };

      const response = await fetch('https://cosc3380-medical-database-project-server.onrender.com/api/doctor/appointments/update-status', {
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

      console.log('Appointment status updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating appointment status:', error);
      return false;
    }
  };


  const handleConfirm = async () => {
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

    try {
        const response = await fetch('https://cosc3380-medical-database-project-server.onrender.com/api/doctor/appointments/visit-details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(visitDetailsData)
        });

        if (!response.ok) {
            throw new Error('Failed to submit visit details');
        }

        const data = await response.json();
        const { visitID } = data;

        const success = await updateAppointmentStatus('Completed', null);
        if (!success) {
            throw new Error('Failed to update appointment status');
        }

        if (approveForSpecialist) {
            const patchRequestBody = {
                dentistID: appointmentDetails.dentistID,
                patientID: appointmentDetails.patientID,
                Date: formatDate(appointmentDetails.Date),
                Start_time: appointmentDetails.Start_time
            };
            const patchResponse = await fetch('https://cosc3380-medical-database-project-server.onrender.com/api/doctor/appointments/update-primary-approval', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(patchRequestBody)
            });
            if (!patchResponse.ok) {
                throw new Error('Failed to update primary approval');
            }
        }

        const invoiceRequestData = {
            visitID: visitID,
            dentistID: appointmentDetails.dentistID,
            patientID: appointmentDetails.patientID,
            visitDate: formatDate(appointmentDetails.Date),
            Start_time: appointmentDetails.Start_time
        };

        const invoiceResponse = await fetch('https://cosc3380-medical-database-project-server.onrender.com/api/doctor/appointments/generate-invoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(invoiceRequestData)
        });

        if (!invoiceResponse.ok) {
            throw new Error('Failed to generate invoice');
        }

        const invoiceData = await invoiceResponse.json();
        console.log('Invoice generated successfully:', invoiceData);

        if (invoiceData.invoice.cleaning_discount_applied) {
          setDiscountMessage(`Patient ${appointmentDetails.patientID} just received a 20% discount on their first cleaning!`);
      } 

        setIsInsertSuccess(true);
    } catch (error) {
        console.error('Error confirming visit details:', error);
    }
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

        fetch('https://cosc3380-medical-database-project-server.onrender.com/api/doctor/appointments/prescriptions', {
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
            setIsInsertSuccessPrescriptions(true);
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
          <HeaderPortalAdmin />
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

          {discountMessage && (
        <div className="fixed top-0 left-0 w-full bg-green-200 text-green-800 p-4 shadow-md z-50">
          {discountMessage}
        </div>
          )}
          
          <main className="flex-1 p-4">
            <div className="max-w-4xl mx-auto mt-8 p-4">
              <h1 className="text-3xl font-bold mb-4">Appointment Details</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Dentist ID:</label>
                  <div className="border border-gray-300 rounded-md py-2 px-3">{appointmentDetails ? appointmentDetails.dentistID : ''}</div>
                </div>
  
                <div>
                  <label className="block mb-2">Patient:</label>
                  <div className="border border-gray-300 rounded-md py-2 px-3">{appointmentDetails ? appointmentDetails.PatientFirstName : ''} {appointmentDetails ? appointmentDetails.PatientLastName : ''}</div>
                </div>
  
                <div>
                  <label className="block mb-2">Staff:</label>
                  <div className="border border-gray-300 rounded-md py-2 px-3">{appointmentDetails ? appointmentDetails.StaffFirstName : ''} {appointmentDetails ? appointmentDetails.StaffLastName : ''}</div>
                </div>
  
                <div>
                <label className="block mb-2">Office:</label>
                <div className="border border-gray-300 rounded-md py-2 px-3">
                  {appointmentDetails ? (
                    appointmentDetails.officeID === 1 ? "5432 Magnolia Drive" :
                    appointmentDetails.officeID === 2 ? "9876 Sunflower Boulevard" : 
                    "Unknown Office"
                  ) : ''}
                </div>
              </div>
  
                <div>
                  <label className="block mb-2">Date:</label>
                  <div className="border border-gray-300 rounded-md py-2 px-3">{appointmentDetails ? appointmentDetails.Date : ''}</div>
                </div>
  
                <div>
                  <label className="block mb-2">Appointment Type:</label>
                  <div className="border border-gray-300 rounded-md py-2 px-3">{appointmentDetails ? appointmentDetails.Appointment_type : ''}</div>
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

              {doctorSpecialty === 'General Dentistry' && (
                <div>
                  <label className="block mt-2 text-lg">
                    <input
                      type="checkbox"
                      className="mr-2 h-6 w-6 mt-4"
                      onChange={(e) => setApproveForSpecialist(e.target.checked)}
                    />
                    Approve for patient to see specialist
                  </label>
                </div>
              )}
  
              <div className="col-span-2">
              <button
              onClick={handleConfirm}
              className={`bg-${isInsertSuccess ? 'gray' : 'blue'}-500 text-white px-4 py-2 mr-2 mt-4 mb-4`}
              disabled={isInsertSuccess} 
              >
              Confirm
              </button>
              {isInsertSuccess && (
                <label className="block mt-2 text-lg"> 
                  <input type="checkbox" className="mr-2 h-6 w-6 mt-4 mb-8" onChange={handleCheckboxChange} /> 
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
                <button onClick={handleConfirmPrescriptions} className={`bg-${isInsertSuccessPrescriptions ? 'gray' : 'blue'}-500 text-white px-4 py-2 mr-2 mt-4 mb-4`} disabled={isInsertSuccessPrescriptions} >Confirm Prescriptions</button>
              )}
            </div>
            <Link to="/admin/appointments" className="bg-blue-500 text-white px-4 py-2 mt-4">Return to Appointments Page</Link>
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

export default AdminAddVisitDetails;