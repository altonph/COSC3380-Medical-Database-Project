import React, { useState } from 'react';
import HeaderPortalAdmin from '../../components/HeaderPortalAdmin';
import Footer from '../../components/Footer';

function DataReports() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportType, setReportType] = useState('');

  const handleGenerateReport = () => {
    console.log(`Generating ${reportType} report from ${startDate} to ${endDate}`);
    
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
          <h1 className="text-3xl font-bold mb-4">Data Reports</h1>
          <div className="mb-4">
            <label htmlFor="startDate" className="block mb-1">Start Date:</label>
            <input 
              type="date" 
              id="startDate" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
              className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="endDate" className="block mb-1">End Date:</label>
            <input 
              type="date" 
              id="endDate" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
              className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="reportType" className="block mb-1">Report Type:</label>
            <select
              id="reportType"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
            >
              <option value="">Select Report Type</option>
              <option value="Dentist Salary Data Report">Dentist Salary Data Report</option>
              <option value="Dental Cleaning Data Report">Dental Cleaning Data Report</option>
              <option value="Treatment Procedures Report">Treatment Procedures Data Report</option> // Types of treatments?
            </select>
          </div>
          <button onClick={handleGenerateReport} className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300 hover:bg-blue-600">Generate Report</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DataReports;
