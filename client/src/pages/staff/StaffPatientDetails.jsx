import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderPortalStaff from "../../components/HeaderPortalStaff"; 
import Footer from "../../components/Footer"; 

const StaffPatientDetails = () => {
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

    const fetchData = async () => {
      try {
        const patientPromise = fetch(`https://cosc3380-medical-database-project-server.onrender.com/api/staff/patients/${patientID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });

        const medicalHistoryPromise = fetch(`https://cosc3380-medical-database-project-server.onrender.com/api/staff/patients/${patientID}/medical-history`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });

        const prescriptionsPromise = fetch(`https://cosc3380-medical-database-project-server.onrender.com/api/staff/patients/${patientID}/prescriptions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });

        const billingHistoryPromise = fetch(`https://cosc3380-medical-database-project-server.onrender.com/api/staff/patients/${patientID}/invoices`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });

        const visitDetailsPromise = fetch(`https://cosc3380-medical-database-project-server.onrender.com/api/staff/patients/${patientID}/visit-details`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
          }
        });

        const [patientResponse, medicalHistoryResponse, prescriptionsResponse, billingHistoryResponse, visitDetailsResponse] = await Promise.all([
          patientPromise,
          medicalHistoryPromise,
          prescriptionsPromise,
          billingHistoryPromise,
          visitDetailsPromise
        ]);

        if (!patientResponse.ok || !medicalHistoryResponse.ok || !prescriptionsResponse.ok || !billingHistoryResponse.ok || !visitDetailsResponse.ok) {
          throw new Error('One or more network responses were not ok');
        }

        const patientData = await patientResponse.json();
        const medicalHistoryData = await medicalHistoryResponse.json();
        const prescriptionsData = await prescriptionsResponse.json();
        const billingHistoryData = await billingHistoryResponse.json();
        const visitDetailsData = await visitDetailsResponse.json();

        setPatient(patientData);
        setMedicalHistory(medicalHistoryData);
        setPrescriptions(prescriptionsData);
        setBillingHistory(billingHistoryData);
        setVisitDetails(visitDetailsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderPortalStaff /> 
      <div className="flex-1 flex">
        <aside className="w-1/6 bg-gray-200 text-black">
          <nav className="p-4 text-xl">
            <ul>
              <li><Link to="/staff/home" className="block py-2 text-center text-gray-600 hover:text-black">Home</Link></li>
              <li><Link to="/staff/appointments" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</Link></li>
              <li><Link to="/staff/patients" className="block py-2 text-center font-bold underline">Patients</Link></li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-4">
          <h1 className="text-3xl font-bold mb-4 p-8">Patient Details</h1>
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Patient Information:</h2>
            <>
              <p><span className="font-semibold">ID:</span> {patient.patientID}</p>
              <p><span className="font-semibold">Name:</span> {patient.FName} {patient.LName}</p>
              <p><span className="font-semibold">Gender:</span> {patient.Gender}</p>
              <p><span className="font-semibold">Date of Birth:</span> {formatDate(patient.DOB)}</p>
              <p><span className="font-semibold">Email:</span> {patient.Email}</p>
              <p><span className="font-semibold">Phone Number:</span> {patient.Phone_num}</p>
              <p><span className="font-semibold">Address:</span> {patient.Address}</p>
            </>
          </div>
          <div className="mt-4">
            <Link to={`/staff/patients/${patientID}/patient-information`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit Patient Information</Link>
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
          <Link to={`/staff/patients/${patientID}/medical-history`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit Medical History</Link>
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
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Billing History:</h2>
            {patient && patientBillingHistory.length > 0 ? (
              <table className="border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-20 py-2">Date Created</th>
                    <th className="border border-gray-400 px-20 py-2">Policy Number</th>
                    <th className="border border-gray-400 px-20 py-2">Gross Amount</th>
                    <th className="border border-gray-400 px-20 py-2">Insurance Coverage</th>
                    <th className="border border-gray-400 px-20 py-2">Net Amount</th>
                    <th className="border border-gray-400 px-20 py-2">Paid Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {patientBillingHistory.map(entry => (
                    <tr key={entry.date}>
                      <td className="border border-gray-400 px-20 py-4">{formatDate(entry.Date)}</td>
                      <td className="border border-gray-400 px-20 py-4">{entry.Policy_number}</td>
                      <td className="border border-gray-400 px-20 py-4">{entry.Gross_Amount}</td>
                      <td className="border border-gray-400 px-20 py-4">{entry.Insurance_coverage}</td>
                      <td className="border border-gray-400 px-20 py-4">{entry.Net_Amount}</td>
                      <td className="border border-gray-400 px-20 py-4">{entry.Paid_Amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No billing history found</div>
            )}
          </div>

          <div className="mt-8">
            <Link to="/staff/patients" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Back to Patients</Link>
          </div>
        </main>
      </div>
      <Footer /> 
    </div>
  );
}

export default StaffPatientDetails;