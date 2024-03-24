import React, { useState } from 'react';
import HeaderPortalAdmin from '../../components/HeaderPortalAdmin';
import Footer from '../../components/Footer';

function DataReports() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportType, setReportType] = useState('');
  const [reportData, setReportData] = useState(null); // State to store the generated report data
  const [loading, setLoading] = useState(false); // State to track loading status

  const handleGenerateReport = async () => {
    try {
      setLoading(true); // Set loading state to true
      const token = localStorage.getItem('token');
  
      // Construct the URL with query parameters
      const url = `http://cosc-3380-medical-database-project.vercel.app/api/admin/generate-report?reportType=${reportType}&startDate=${startDate}&endDate=${endDate}`;
  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate report');
      }
  
      const data = await response.json();
      setReportData(data.report);
    } catch (error) {
      console.error('Error generating report:', error);
      // Handle error condition
    } finally {
      setLoading(false); // Set loading state back to false
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
              <option value="Dentist Salary Data Report">List Staff Assignments</option>
              <option value="Dental Cleaning Data Report">Calculate Staff Efficiency</option>
              <option value="Treatment Procedures Report">Workload Distribution</option>
            </select>
          </div>
          <button onClick={handleGenerateReport} className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300 hover:bg-blue-600">Generate Report</button>
          
          {/* Display loading message while fetching data */}
          {loading && <p>Loading...</p>}

          {/* Display the generated report data */}
          {reportData && (
            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-2">Generated Report</h2>
              {/* Render the report data here */}
              <pre>{JSON.stringify(reportData, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DataReports;
