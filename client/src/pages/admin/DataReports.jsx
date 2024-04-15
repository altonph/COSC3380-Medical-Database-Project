import React, { useState } from 'react';
import HeaderPortalAdmin from '../../components/HeaderPortalAdmin';
import Footer from '../../components/Footer';


function DataReports() {
  const [speciality, setSpeciality] = useState('');
  const [reportData, setReportData] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const handleGenerateReport = async () => {
    try {
      const response = await fetch(`https://cosc3380-medical-database-project-server.onrender.com/api/admin/salary-report?specialty=${speciality}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setReportData(data);
      setShowReport(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <nav>
        <HeaderPortalAdmin />
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/6 bg-gray-200 text-black">
          <nav className="p-4 text-xl">
            <ul>
              <li><a href="/admin/home" className="block py-2 text-center text-gray-600 hover:text-black">Home</a></li>
              <li><a href="/admin/appointments" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</a></li>
              <li><a href="/admin/patients" className="block py-2 text-center text-gray-600 hover:text-black">Patients</a></li>
              <li><a href="/admin/staff" className="block py-2 text-center text-gray-600 hover:text-black">Staff</a></li>
              <li><a href="/admin/data-reports" className="block py-2 text-center font-bold underline">Data Reports</a></li>
            </ul>
          </nav>
        </aside>

        <div className="content p-4">
          <h1 className="text-3xl font-bold mb-4">Dentist Salary Data Report</h1>
          
          <div className="mb-4">
            <label htmlFor="speciality" className="block mb-1">Specialty:</label>
            <select
              id="speciality"
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
            >
              <option value="" disabled>Select Specialty</option>
              <option value="All">All</option>
              <option value="General Dentistry">General Dentistry</option>
              <option value="Orthodontist">Orthodontist</option>
            </select>
          </div>
          <button onClick={handleGenerateReport} className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300 hover:bg-blue-600">Generate Report</button>
          
          {showReport && (
            <table className="mt-4 w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-4 py-2">First Name</th>
                  <th className="border border-gray-400 px-4 py-2">Last Name</th>
                  <th className="border border-gray-400 px-4 py-2">Email</th>
                  <th className="border border-gray-400 px-4 py-2">Start Date</th>
                  <th className="border border-gray-400 px-4 py-2">Salary</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                    <td className="border border-gray-400 px-4 py-2">{row.FName}</td>
                    <td className="border border-gray-400 px-4 py-2">{row.LName}</td>
                    <td className="border border-gray-400 px-4 py-2">{row.Email}</td>
                    <td className="border border-gray-400 px-4 py-2">{new Date(row.Start_date).toLocaleDateString()}</td>
                    <td className="border border-gray-400 px-4 py-2">${row.Salary.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DataReports;
