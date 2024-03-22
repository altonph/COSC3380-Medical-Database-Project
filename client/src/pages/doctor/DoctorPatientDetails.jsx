import React from "react";
import { Link, useParams } from "react-router-dom";
import HeaderPortalAdmin from "../../components/HeaderPortalDoctor"; 
import Footer from "../../components/Footer"; 

const PatientDetails = () => {
  const { patientID } = useParams();

  const patients = [
    {patientID: 12345, insuranceID: 1, dentistID: 2, Gender: "Male", FName: "John", LName: "Apple", DOB: "05/06/1991", Email: "johnapple@gmail.com", Phone_num: 123456789, Address: "12 Calhoun Rd"},
    {patientID: 54321, insuranceID: 2, dentistID: 1, Gender: "Female", FName: "Jane", LName: "Apple", DOB: "10/05/1981", Email: "janeapple@gmail.com", Phone_num: 987654321, Address: "5543 Houston St"},
    {patientID: 9876, insuranceID: 3, dentistID: 3, Gender: "Male", FName: "Michael", LName: "Smith", DOB: "03/15/1975", Email: "michaelsmith@gmail.com", Phone_num: 5551234567, Address: "789 Elm St"},
    {patientID: 5432, insuranceID: 4, dentistID: 4, Gender: "Female", FName: "Emily", LName: "Johnson", DOB: "07/20/1988", Email: "emilyjohnson@gmail.com", Phone_num: 4449876543, Address: "456 Pine St"},
    {patientID: 4567, insuranceID: 2, dentistID: 1, Gender: "Male", FName: "David", LName: "Brown", DOB: "11/25/1965", Email: "davidbrown@gmail.com", Phone_num: 2223456789, Address: "234 Oak St"}
  ];

  const patient = patients.find(p => p.patientID === parseInt(patientID));

  const visitDetails = {
    patientID: 12345,
    visitId: "V123456",
    dentistId: 2,
    dentistName: "Dr. Smith",
    patientName: `${patient ? patient.FName : ''} ${patient ? patient.LName : ''}`,
    visitType: "Regular checkup",
    diagnosis: "Healthy",
    treatment: "No treatment required",
    notes: "Patient is in good health condition"
  };

  const medicalHistory = {
    patientID: 12345,
    allergies: "None",
    height: "180 cm",
    weight: "75 kg",
    medicalNotes: "No significant medical history"
  };

  const prescriptions = [
    { id: 1, patientID: 12345, medication: "Medication A", dosage: "10mg", instructions: "Take twice daily" },
    { id: 2, patientID: 12345, medication: "Medication B", dosage: "20mg", instructions: "Take once daily" },
    { id: 3, patientID: 54321, medication: "Medication C", dosage: "5mg", instructions: "Take with food" }
  ];

  const patientPrescriptions = prescriptions.filter(prescription => prescription.patientID === parseInt(patientID));

  const billingHistory = [
    { patientID: 12345, date: "03/12/2024", description: "Dental Checkup", status: "Paid", amount: "$50.00" },
    { patientID: 54321, date: "03/15/2024", description: "X-ray", status: "Pending", amount: "$100.00" },
    { patientID: 12345, date: "03/20/2024", description: "Dental Cleaning", status: "Paid", amount: "$80.00" },
  ];

  const patientBillingHistory = billingHistory.filter(entry => entry.patientID === parseInt(patientID));

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
            {patient ? (
              <>
                <p><span className="font-semibold">ID:</span> {patient.patientID}</p>
                <p><span className="font-semibold">Name:</span> {patient.FName} {patient.LName}</p>
                <p><span className="font-semibold">Gender:</span> {patient.Gender}</p>
                <p><span className="font-semibold">Date of Birth:</span> {patient.DOB}</p>
                <p><span className="font-semibold">Email:</span> {patient.Email}</p>
                <p><span className="font-semibold">Phone Number:</span> {patient.Phone_num}</p>
                <p><span className="font-semibold">Address:</span> {patient.Address}</p>
              </>
            ) : (
              <div>No patient information found</div>
            )}
            <div className="mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit Patient Information</button>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Visit Details:</h2>
            {visitDetails.patientID === (patient ? patient.patientID : null) && patientPrescriptions.length > 0 ? (
              <ul>
                <li>
                  <p><span className="font-semibold">Visit ID:</span> {visitDetails.visitId}</p>
                  <p><span className="font-semibold">Dentist ID and Name:</span> {visitDetails.dentistId} - {visitDetails.dentistName}</p>
                  <p><span className="font-semibold">Patient Name:</span> {visitDetails.patientName}</p>
                  <p><span className="font-semibold">Patient ID:</span> {visitDetails.patientID}</p>
                  <p><span className="font-semibold">Visit Type:</span> {visitDetails.visitType}</p>
                  <p><span className="font-semibold">Diagnosis:</span> {visitDetails.diagnosis}</p>
                  <p><span className="font-semibold">Treatment:</span> {visitDetails.treatment}</p>
                  <p><span className="font-semibold">Notes:</span> {visitDetails.notes}</p>
                </li>
              </ul>
            ) : (
              <div>No visit details found</div>
            )}
            {visitDetails.patientID && patientPrescriptions.length > 0 && (
              <div className="mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit Visit Details</button>
              </div>
            )}
          </div>
          
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Medical History:</h2>
            {medicalHistory.patientID === (patient ? patient.patientID : null) && patientPrescriptions.length > 0 ? (
              <ul>
                <li>
                  <p><span className="font-semibold">Allergies:</span> {medicalHistory.allergies}</p>
                  <p><span className="font-semibold">Height:</span> {medicalHistory.height}</p>
                  <p><span className="font-semibold">Weight:</span> {medicalHistory.weight}</p>
                  <p><span className="font-semibold">Notes:</span> {medicalHistory.medicalNotes}</p>
                </li>
              </ul>
            ) : (
              <div>No medical history found</div>
            )}
            {medicalHistory.patientID && patientPrescriptions.length > 0 && (
              <div className="mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit Medical History</button>
              </div>
            )}
          </div>
          
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Prescriptions:</h2>
            {patientPrescriptions.length > 0 ? (
              <ul>
                {patientPrescriptions.map(prescription => (
                  <li key={prescription.id}>
                    <p><span className="font-semibold">Medication:</span> {prescription.medication}</p>
                    <p><span className="font-semibold">Dosage:</span> {prescription.dosage}</p>
                    <p><span className="font-semibold">Instructions:</span> {prescription.instructions}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div>No prescriptions found</div>
            )}
            {patientPrescriptions.length > 0 && (
              <div className="mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit Prescriptions</button>
              </div>
            )}
          </div>
          
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Billing History:</h2>
            {patientBillingHistory.length > 0 ? (
              <table className="border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-20 py-2">Date</th>
                    <th className="border border-gray-400 px-20 py-2">Description</th>
                    <th className="border border-gray-400 px-20 py-2">Status</th>
                    <th className="border border-gray-400 px-32 py-2">Amount</th>
                    <th className="border border-gray-400 px-20 py-2">Actions</th> {/* New column for actions */}
                  </tr>
                </thead>
                <tbody>
                  {patientBillingHistory.map(entry => (
                    <tr key={entry.date}>
                      <td className="border border-gray-400 px-20 py-4">{entry.date}</td>
                      <td className="border border-gray-400 px-20 py-4">{entry.description}</td>
                      <td className="border border-gray-400 px-20 py-4">{entry.status}</td>
                      <td className="border border-gray-400 px-32 py-4">{entry.amount}</td>
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
};

export default PatientDetails;
