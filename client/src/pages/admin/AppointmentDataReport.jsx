import React, { useState, useEffect } from 'react';
import HeaderPortalAdmin from '../../components/HeaderPortalAdmin';
import Footer from '../../components/Footer';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AppointmentDataReport() {
  const [office_id, setOfficeId] = useState('');
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [status, setStatus] = useState('');
  const [appointmentType, setAppointmentType] = useState(''); // State for appointment type filter
  const [mainResults, setMainResults] = useState([]);
  const [percentageResults, setPercentageResults] = useState({});
  const [showReport, setShowReport] = useState(false);
  const [totalAppointments, setTotalAppointments] = useState(0);

  const [filterLogs, setFilterLogs] = useState({}); // State to store filter logs

  const logSetter = (setter, value) => {
    setFilterLogs({ ...filterLogs, [setter]: value }); // Log the setter and its value
  };

  const handleGenerateReport = async () => {
    try {
      console.log("Sending request with filters:", { office_id, start_date, end_date, status, specialty, appointmentType }); // Log filter values before sending request

      const formData = new URLSearchParams();
      formData.append('office_id', office_id);
      formData.append('start_date', start_date || ''); // Set empty string if start_date is null
      formData.append('end_date', end_date || ''); // Set empty string if end_date is null
      formData.append('status', status);
      formData.append('specialty', specialty);
      formData.append('appointmentType', appointmentType); // Include appointment type in the request

      const response = await fetch('http://localhost:5000/api/admin/appointment-data-report', {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log("Received data:", data.mainResults);
      setMainResults(data.mainResults);
      calculatePercentageResults(data.mainResults);
      setShowReport(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const calculatePercentageResults = (mainResults) => {
    let scheduledCount = 0;
    let completedCount = 0;
    let cancelledCount = 0;

    mainResults.forEach(result => {
      switch (result.Appointment_status) {
        case 'Scheduled':
          scheduledCount++;
          break;
        case 'Completed':
          completedCount++;
          break;
        case 'Cancelled':
          cancelledCount++;
          break;
        default:
          break;
      }
    });

    const total = scheduledCount + completedCount + cancelledCount;
    const scheduledPercentage = (scheduledCount / total) * 100 || 0;
    const completedPercentage = (completedCount / total) * 100 || 0;
    const cancelledPercentage = (cancelledCount / total) * 100 || 0;

    setPercentageResults({
      Total: total,
      Scheduled: scheduledPercentage.toFixed(2) + '%',
      Completed: completedPercentage.toFixed(2) + '%',
      Cancelled: cancelledPercentage.toFixed(2) + '%'
    });

    setTotalAppointments(total);
  };

  const handleApplyFilters = () => {
    setShowReport(false); // Hide the report until the data is fetched with new filters
    handleGenerateReport();
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
              <li><a href="/admin/dentists" className="block py-2 text-center text-gray-600 hover:text-black">Dentists</a></li>
              <li><a href="/admin/staff" className="block py-2 text-center text-gray-600 hover:text-black">Staff</a></li>
              <li><a href="/admin/appointment-data-report" className="block py-2 text-center font-bold underline">Appointment Data Report</a></li>
              <li><a href="/admin/finance-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Finance Data Report</a></li>
              <li><a href="/admin/demographic-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Demographic Data Report</a></li>

            </ul>
          </nav>
        </aside>

        <div className="content p-4 flex-1">
          <h1 className="text-3xl font-bold mb-4 pt-8 pl-8">Appointments Data Report</h1>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Filters:</h2>
            <div className="flex flex-wrap gap-4">
              {/* Office Filter */}
              <div className="flex items-center">
                <select
                  value={office_id}
                  onChange={(e) => { setOfficeId(e.target.value); logSetter('setOfficeId', e.target.value); }}
                  className="border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
                >
                  <option value="">Select Office</option>
                  <option value="1">Austin Office</option>
                  <option value="2">Arizona Office</option>
                </select>
              </div>
              {/* Start Date Filter */}
              <div className="flex items-center">
                <DatePicker
                  selected={start_date ? new Date(start_date) : null}
                  onChange={(date) => { setStartDate(date ? date.toISOString() : ''); logSetter('setStartDate', date ? date.toISOString() : ''); }}
                  className="border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
                  isClearable={true} // Allow unselecting dates
                  placeholderText="Select Date"
                />
              </div>

              {/* End Date Filter */}
              <div className="flex items-center">
                <DatePicker
                  selected={end_date ? new Date(end_date) : null}
                  onChange={(date) => { setEndDate(date ? date.toISOString() : ''); logSetter('setEndDate', date ? date.toISOString() : ''); }}
                  className="border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
                  isClearable={true} // Allow unselecting dates
                  placeholderText="Select Date"
                />
              </div>
              {/* Specialty Filter */}
              <div className="flex items-center">
                <select
                  value={specialty}
                  onChange={(e) => { setSpecialty(e.target.value); logSetter('setSpecialty', e.target.value); }}
                  className="border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
                >
                  <option value="">Select Specialty</option>
                  <option value="General Dentistry">General Dentistry</option>
                  <option value="Endodontist">Endodontist</option>
                </select>
              </div>
              {/* Status Filter */}
              <div className="flex items-center">
                <select
                  value={status}
                  onChange={(e) => { setStatus(e.target.value); logSetter('setStatus', e.target.value); }}
                  className="border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
                >
                  <option value="">Select Status</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              {/* Appointment Type Filter */}
              <div className="flex items-center">
                <select
                  value={appointmentType}
                  onChange={(e) => { setAppointmentType(e.target.value); logSetter('setAppointmentType', e.target.value); }}
                  className="border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
                >
                  <option value="">Select Appointment Type</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Extraction">Extraction</option>
                  <option value="Root Canal">Root Canal</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
            {/* Generate Report Button */}
            <div className="mt-4">
              <button onClick={handleApplyFilters} className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300 hover:bg-blue-600">Generate Report</button>
            </div>
          </div>
          {/* Display main results table */}
          {showReport && (
            <div className="mt-8 flex flex-wrap">
              <div className="w-3/4 pr-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100 border-b border-gray-300">
                        <th className="py-2 px-4 border-r border-gray-300">Dentist</th>
                        <th className="py-2 px-4 border-r border-gray-300">Appointment Type</th>
                        <th className="py-2 px-4 border-r border-gray-300">Start Time</th>
                        <th className="py-2 px-4 border-r border-gray-300">End Time</th>
                        <th className="py-2 px-4 border-r border-gray-300">Appointment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mainResults.map((result, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                          <td className="py-2 px-4 border-r border-gray-300">{`${result.Dentist_FirstName} ${result.Dentist_LastName}`}</td>
                          <td className="py-2 px-4 border-r border-gray-300">{result.Appointment_type}</td>
                          <td className="py-2 px-4 border-r border-gray-300">{result.Start_time}</td>
                          <td className="py-2 px-4 border-r border-gray-300">{result.End_time}</td>
                          <td className="py-2 px-4 border-r border-gray-300">{result.Appointment_status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Display percentage results table */}
              <div className="w-1/4 bg-gray-100 p-4">
                <h2 className="text-xl font-bold mb-4">Metrics</h2>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="py-2 font-bold">Total Appointments:</td>
                      <td className="py-2">{totalAppointments}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold">Scheduled: (%)</td>
                      <td className="py-2">{percentageResults.Scheduled}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold">Completed: (%)</td>
                      <td className="py-2">{percentageResults.Completed}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold">Cancelled: (%)</td>
                      <td className="py-2">{percentageResults.Cancelled}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AppointmentDataReport;
