import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderPortalAdmin from "../../components/HeaderPortalDoctor"; 
import Footer from "../../components/Footer"; 

const PatientDetails = () => {
  const { patientID } = useParams();
  const [patient, setPatient] = useState(null);
  const [editedPatient, setEditedPatient] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [billingHistory, setBillingHistory] = useState([]);
  const [visitDetails, setVisitDetails] = useState([]);

  const patientPrescriptions = prescriptions.filter(prescription => prescription.patientID === parseInt(patientID));

  const patientBillingHistory = billingHistory.filter(entry => entry.patientID === parseInt(patientID));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return;
    }
    console.log("Patient ID before fetching patient details ", patientID);
    fetch(`http://localhost:5000/api/doctor/patients/${patientID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => setPatient(data))
    .catch(error => console.error('Error fetching patient details:', error));
  }, [patientID]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in local storage');
      return;
    }
    console.log("Patient ID before fetching medical history ", patientID);
    fetch(`http://localhost:5000/api/doctor/patients/${patientID}/medical-history`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => setMedicalHistory(data))
    .catch(error => console.error('Error fetching medical history:', error));
  }, [patientID]);
   
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in local storage");
        }

        const response = await fetch(
          `http://localhost:5000/api/doctor/patients/${patientID}/prescriptions`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setPrescriptions(data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, [patientID]);

  useEffect(() => {
    const fetchBillingHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in local storage");
        }

        const response = await fetch(
          `http://localhost:5000/api/doctor/patients/${patientID}/invoices`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setBillingHistory(data);
      } catch (error) {
        console.error("Error fetching billing history:", error);
      }
    };

    fetchBillingHistory();
  }, [patientID]);

  useEffect(() => {
    const fetchVisitDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in local storage");
        }

        const response = await fetch(
          `http://localhost:5000/api/doctor/patients/${patientID}/visit-details`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setVisitDetails(data);
      } catch (error) {
        console.error("Error fetching visit details:", error);
      }
    };

    fetchVisitDetails();
  }, [patientID]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    return formattedMonth + '/' + formattedDay + '/' + year;
  };

  const handleEditPatientInformation = () => {
    setEditedPatient({ ...patient });
  };

  const handleSavePatientInformation = () => {
    setPatient({ ...editedPatient });
    setEditedPatient(null);
  };

  const handleCancelPatientInformation = () => {
    setEditedPatient(null);
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderPortalAdmin /> 
      <div className="flex-1 flex">
        <aside className="w-1/6 bg-gray-200 text-black">
          <nav className="p-4 text-xl">
            <ul>
              <li><Link to="/doctor/home" className="block py-2 text-center text-gray-600 hover:text-black">Home</Link></li>
              <li><Link to="/doctor/appointments" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</Link></li>
              <li><Link to="/doctor/patients" className="block py-2 text-center font-bold underline">Patients</Link></li>
            </ul>
          </nav>
        </aside>
        
        <main className="flex-1 p-4">
          <h1 className="text-3xl font-bold mb-4 p-8">Patient Details</h1>
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Patient Information:</h2>
            {editedPatient ? (
              <>
                <p><span className="font-semibold">ID:</span> {patient.patientID}</p>
                <p>
                  <span className="font-semibold">Name:</span> 
                  <input 
                    type="text" 
                    value={editedPatient.FName} 
                    onChange={(e) => setEditedPatient({ ...editedPatient, FName: e.target.value })} 
                    className="border border-gray-400 p-1 mr-2"
                  /> 
                  <input 
                    type="text" 
                    value={editedPatient.LName} 
                    onChange={(e) => setEditedPatient({ ...editedPatient, LName: e.target.value })} 
                    className="border border-gray-400 p-1"
                  />
                </p>
                <p><span className="font-semibold">Gender:</span>
                <input 
                    type="gender" 
                    value={editedPatient.Gender} 
                    onChange={(e) => setEditedPatient({ ...editedPatient, Gender: e.target.value })} 
                    className="border border-gray-400 p-1"
                  />
                </p>
                <p>
                  <span className="font-semibold">Date of Birth:</span> 
                  <input 
                    type="date" 
                    value={editedPatient.DOB} 
                    onChange={(e) => setEditedPatient({ ...editedPatient, DOB: e.target.value })} 
                    className="border border-gray-400 p-1"
                  /> 
                </p>
                <p>
                  <span className="font-semibold">Email:</span> 
                  <input 
                    type="email" 
                    value={editedPatient.Email} 
                    onChange={(e) => setEditedPatient({ ...editedPatient, Email: e.target.value })} 
                    className="border border-gray-400 p-1"
                  /> 
                </p>
                <p>
                  <span className="font-semibold">Phone Number:</span> 
                  <input 
                    type="tel" 
                    value={editedPatient.Phone_num} 
                    onChange={(e) => setEditedPatient({ ...editedPatient, Phone_num: e.target.value })} 
                    className="border border-gray-400 p-1"
                  /> 
                </p>
                <p>
                  <span className="font-semibold">Address:</span> 
                  <input 
                    type="text" 
                    value={editedPatient.Address} 
                    onChange={(e) => setEditedPatient({ ...editedPatient, Address: e.target.value })} 
                    className="border border-gray-400 p-1"
                  /> 
                </p>
              </>
            ) : (
              <>
                <p><span className="font-semibold">ID:</span> {patient.patientID}</p>
                <p><span className="font-semibold">Name:</span> {patient.FName} {patient.LName}</p>
                <p><span className="font-semibold">Gender:</span> {patient.Gender}</p>
                <p><span className="font-semibold">Date of Birth:</span> {formatDate(patient.DOB)}</p>
                <p><span className="font-semibold">Email:</span> {patient.Email}</p>
                <p><span className="font-semibold">Phone Number:</span> {patient.Phone_num}</p>
                <p><span className="font-semibold">Address:</span> {patient.Address}</p>
              </>
            )}
            <div className="mt-4">
              {editedPatient ? (
                <>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSavePatientInformation}>Save</button>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={handleCancelPatientInformation}>Cancel</button>
                </>
              ) : (
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleEditPatientInformation}>Edit Patient Information</button>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Visit Details:</h2>
            {visitDetails && visitDetails.length > 0 ? (
              <ul>
                {visitDetails.map((visitDetail, index) => (
                  <li key={index} className="mb-4">
                    <p><span className="font-semibold">Visit ID:</span> {visitDetail.visitID}</p>
                    <p><span className="font-semibold">Dentist ID:</span> {visitDetail.dentistID}</p>
                    <p><span className="font-semibold">Visit Type:</span> {visitDetail.Visit_Type}</p>
                    <p><span className="font-semibold">Diagnosis:</span> {visitDetail.Diagnosis}</p>
                    <p><span className="font-semibold">Treatment:</span> {visitDetail.Treatment}</p>
                    <p><span className="font-semibold">Notes:</span> {visitDetail.Notes}</p>
                  </li>
                ))}
              </ul>
            ) : (
          <div>No visit details found</div>
          )}
          <div className="mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit Visit Details</button>
          </div>
        </div>          
          
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Medical History:</h2>
          {medicalHistory && medicalHistory.length > 0 ? (
            <ul>
            {medicalHistory.map((record, index) => (
              <li key={index}>
                <p><span className="font-semibold">Allergies:</span> {record.Allergies}</p>
                <p><span className="font-semibold">Height:</span> {record.Feet} feet {record.Inches} inches</p>
                <p><span className="font-semibold">Weight:</span> {record.Weight} lbs</p>
                <p><span className="font-semibold">Notes:</span> {record.Notes}</p>
                <p><span className="font-semibold">Date created:</span> {formatDate(record.Date_Created)}</p>
              </li>
            ))}
            </ul>
          ) : (
        <div>No medical history found</div>
        )}
        <div className="mt-4">
          <Link to={`/doctor/patients/${patientID}/medical-history`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit Medical History</Link>
        </div>
      </div>


          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Prescriptions:</h2>
            {patientPrescriptions.length > 0 ? (
              <ul>
                {patientPrescriptions.map(prescription => (
                  <li key={prescription.id} className="mb-4">
                    <p><span className="font-semibold">Prescription ID:</span> {prescription.prescriptionID}</p>
                    <p><span className="font-semibold">Medication name:</span> {prescription.Medication_Name}</p>
                    <p><span className="font-semibold">National Drug Code:</span> {prescription.National_Drug_Code}</p>
                    <p><span className="font-semibold">Dosage:</span> {prescription.Medication_Dosage}</p>
                    <p><span className="font-semibold">Refills:</span> {prescription.Refills}</p>
                    <p><span className="font-semibold">Notes:</span> {prescription.notes}</p>
                    <p><span className="font-semibold">Date prescribed:</span> {formatDate(prescription.Date_prescribed)}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div>No prescriptions found</div>
            )}
            {patientPrescriptions.length > 0 && (
              <div className="mt-4">
                <Link to={`/doctor/patients/${patientID}/prescriptions`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit Prescriptions</Link>
              </div>
            )}
          </div>
          
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Billing History:</h2>
            {patient && patientBillingHistory.length > 0 ? (
              <table className="border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-20 py-2">Date</th>
                    <th className="border border-gray-400 px-20 py-2">Description</th>
                    <th className="border border-gray-400 px-20 py-2">Paid Amount</th>
                    <th className="border border-gray-400 px-32 py-2">Total Amount</th>
                    <th className="border border-gray-400 px-20 py-2">Actions</th> 
                  </tr>
                </thead>
                <tbody>
                  {patientBillingHistory.map(entry => (
                    <tr key={entry.date}>
                      <td className="border border-gray-400 px-20 py-4">{formatDate(entry.Date)}</td>
                      <td className="border border-gray-400 px-20 py-4">{entry.Description}</td>
                      <td className="border border-gray-400 px-20 py-4">{entry.Paid_Amount}</td>
                      <td className="border border-gray-400 px-32 py-4">{entry.Total_Amount}</td>
                      <td className="border border-gray-400 px-20 py-4"> 
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit</button> 
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No billing history found</div>
            )}
          </div>
          
          <div className="mt-8">
            <Link to="/doctor/patients" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Back to Patients</Link>
          </div>
        </main>
      </div>
      <Footer /> 
    </div>
  );
}

export default PatientDetails;