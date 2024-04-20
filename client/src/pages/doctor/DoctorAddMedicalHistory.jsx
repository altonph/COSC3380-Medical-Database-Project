import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import HeaderPortalDoctor from "../../components/HeaderPortalDoctor";
import { useNavigate } from 'react-router-dom';

const DoctorAddMedicalHistory = () => {
  const { patientID } = useParams();
  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    Allergies: "",
    Feet: "",
    Inches: "",
    Weight: "",
    Notes: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in local storage");
      }
      console.log("Sending request to backend");
      const response = await fetch(
        `https://cosc3380-medical-database-project-server.onrender.com/api/doctor/patients/${patientID}/medical-history`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

    } catch (error) {
      console.error("Error adding medical history:", error);
    }
    navigateTo(`/doctor/patients/${patientID}/medical-history`);
  };

  return (
    <>
      <HeaderPortalDoctor />

      <div className="flex flex-col min-h-screen">
        <div className="flex-1 flex">
          <aside className="w-1/6 bg-gray-200 text-black">
            <nav className="p-4 text-xl">
              <ul>
                <li><a href="/doctor/home" className="block py-2 text-center text-gray-600 hover:text-black">Home</a></li>
                <li><a href="/doctor/appointments" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</a></li>
                <li><a href="/doctor/patients" className="block py-2 text-center font-bold underline">Patients</a></li>
              </ul>
            </nav>
          </aside>

          <main className="flex-1 p-4">
            <h1 className="text-3xl font-bold mb-4 p-8">Add Medical History</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="allergies" className="font-semibold">Allergies:</label>
                <input type="text" id="allergies" name="Allergies" value={formData.Allergies} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="feet" className="font-semibold">Feet:</label>
                <input type="number" id="feet" name="Feet" value={formData.Feet} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="inches" className="font-semibold">Inches:</label>
                <input type="number" id="inches" name="Inches" value={formData.Inches} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="weight" className="font-semibold">Weight:</label>
                <input type="number" id="weight" name="Weight" value={formData.Weight} onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="notes" className="font-semibold">Notes:</label>
                <input type="text" id="notes" name="Notes" value={formData.Notes} onChange={handleInputChange} />
              </div>
              <div className="mt-4">
                <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
                <Link to={`/doctor/patients/${patientID}`} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2">Back to Patient {patientID}</Link>
              </div>
            </form>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default DoctorAddMedicalHistory;
