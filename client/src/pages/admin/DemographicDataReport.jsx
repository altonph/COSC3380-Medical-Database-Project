import React, { useState, useEffect } from 'react';
import HeaderPortalAdmin from '../../components/HeaderPortalAdmin';
import Footer from '../../components/Footer';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DemographicDataReport() {
    // search params
    const [office, setOffice] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [ageGroup, setAgeGroup] = useState('');
    const [gender, setGender] = useState('');
    const [insuranceType, setInsuranceType] = useState('');

    const [showReport, setShowReport] = useState(false);
    const [reportData, setReportData] = useState([]);

    const handleGenerateReport = async () => {
        try {
            // Construct the API URL with query parameters
            const apiUrl = `http://localhost:5000/api/admin/demographics-data-report?` + 
                           `office=${office}&` +
                           `startDate=${startDate}&` +
                           `endDate=${endDate}&` +
                           `ageGroup=${ageGroup}&` +
                           `gender=${gender}&` +
                           `insuranceType=${insuranceType}`;
    
            const response = await fetch(apiUrl);
    
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setReportData(data);
            setShowReport(true);
        } catch (error) {
            console.error('Error generating report:', error);
        }
    };
    
return (
    <div className="flex h-screen flex-col">
        <nav><HeaderPortalAdmin /></nav>

        <div className="flex flex-1">
            {/* Sidebar */}
            <aside className="w-1/6 bg-gray-200 text-black">
                <nav className="p-4 text-xl">
                    <ul>
                    <li><a href="/admin/home" className="block py-2 text-center text-gray-600 hover:text-black">Home</a></li>
                    <li><a href="/admin/appointments" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</a></li>
                    <li><a href="/admin/patients" className="block py-2 text-center text-gray-600 hover:text-black">Patients</a></li>
                    <li><a href="/admin/staff" className="block py-2 text-center text-gray-600 hover:text-black">Staff</a></li>
                    <li><a href="/admin/appointment-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Appointment Data Report</a></li>
                    <li><a href="/admin/finance-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Finance Data Report</a></li>
                    <li><a href="/admin/demographic-data-report" className="block py-2 text-center font-bold underline">Demographic Data Report</a></li>
                </ul>
                </nav>
            </aside>


            <div className="content p-4 flex-1">
                    <h1 className="text-3xl font-bold mb-4 pt-8 pl-8">Demographic Data Report</h1>
                    <div className="mt-8">
                        <h2 className="text-xl font-bold mb-4">Filters:</h2>
                        <div className="flex flex-wrap gap-4">

                            {/* Office Filter */}
                            <div className="flex items-center">
                                <label htmlFor="office" className="block mb-1"></label>
                                <select 
                                    id='office'
                                    value={office}
                                    onChange={(e) => setOffice(e.target.value)}
                                    className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
                                    >
                                        <option value="" disabled> Select Office</option>
                                        <option value="All">All</option>
                                        <option value="1">Austin</option>
                                        <option value="2">Pheonix</option>
                                    </select>
                            </div>

                            {/* Start Date */}
                            <div className="flex items-center">
                                <label htmlFor="startDate" className="block mb-1"></label>
                                <DatePicker
                                    id="startDate"
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    placeholderText="Select Start Date"
                                    className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
                                />
                            </div>

                            {/* End Date */}
                            <div className="flex items-center">
                                <label htmlFor="endDate" className="block mb-1"></label>
                                <DatePicker
                                    id="endDate"
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    placeholderText="Select End Date"
                                    className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
                                />
                            </div>
                            
                            {/* Age Group */}
                            <div className="flex items-center">
                                <label htmlFor="ageGroup" className="block mb-1"></label>
                                <select 
                                    id='ageGroup'
                                    value={ageGroup}
                                    onChange={(e) => setAgeGroup(e.target.value)}
                                    className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
                                >
                                    <option value="" disabled>Select Age Group</option>
                                    <option value="All">All</option>
                                    <option value="0-17">0-17</option>
                                    <option value="18-35">18-35</option>
                                    <option value="36-50">36-50</option>
                                    <option value="51-65">51-65</option>
                                    <option value="66+">66+</option>
                                </select>
                            </div>

                            {/* Gender */}
                            <div className="flex items-center">
                                <label htmlFor="gender" className="block mb-1"></label>
                                <select
                                    id='gender'
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
                                >
                                    <option value="" disabled>Select Gender</option>
                                    <option value="All">All</option>
                                    <option value="1">Male</option>
                                    <option value="2">Female</option>
                                </select>
                            </div>

                            {/* Insurance Type */}
                            <div className="flex items-center">
                                <label htmlFor="insuranceType" className="block mb-1"></label>
                                <select 
                                    id='insuranceType'
                                    value={insuranceType}
                                    onChange={(e) => setInsuranceType(e.target.value)}
                                    className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
                                >
                                    <option value="" disabled> Select Insurance Type</option>
                                    <option value="All">All</option>
                                    <option value="Anthem">Anthem</option>
                                    <option value="Guardian">Guardian</option>
                                    <option value="Ameritas">Ameritas</option>
                                    <option value="Humana">Humana</option>
                                    <option value="Spirit Dental">Spirit Dental</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={handleGenerateReport} className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300 hover:bg-blue-600 mt-4">Generate Report</button>
                    </div>

                    {/* Display report */}
                    {showReport && (
                        <div className="mt8 flex flex-wrap">
                            <div className="w-3/4 pr-4">
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse border border-gray-300">
                                        <thead>
                                                <tr className="bg-gray-100 border-b border-gray-300">
                                                <th className="py-2 px-4 border-r border-gray-300">Patient Name</th>
                                                <th className="py-2 px-4 border-r border-gray-300">Gender</th>
                                                <th className="py-2 px-4 border-r border-gray-300">Age</th>
                                                <th className="py-2 px-4 border-r border-gray-300">Insurance Type</th>
                                                <th className="py-2 px-4 border-r border-gray-300">Total Visits</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reportData.map((result, index) => (
                                                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                                                <td className="py-2 px-4 border-r border-gray-300">{`${result.Patient_FirstName} ${result.Patient_LastName}`}</td>
                                                <td className="py-2 px-4 border-r border-gray-300">{result.Gender}</td>
                                                <td className="py-2 px-4 border-r border-gray-300">{result.Age}</td>
                                                <td className="py-2 px-4 border-r border-gray-300">{result.InsuranceType}</td>
                                                <td className="py-2 px-4 border-r border-gray-300">{result.TotalVisits}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                                {/* Display Overall Metrics
                            <div className="w-1/4 bg-gray-100 p-4">
                                <h2 className='text-xl font-bold mb-4'>Metrics</h2>
                                <table className='w-full'>
                                    <tbody>
                                        <tr>
                                            <td className='py-2 font-bold'></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> */}
                        </div>

                    )}
                </div>

        </div>
        <Footer />
    </div>
)
}

export default DemographicDataReport;