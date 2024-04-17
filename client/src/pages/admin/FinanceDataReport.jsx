import React, { useState } from 'react';
import HeaderPortalAdmin from '../../components/HeaderPortalAdmin';
import Footer from '../../components/Footer';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function FinanceDataReport() {
    const [office, setOffice] = useState('');
    const [type, setType] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [revenueReportData, setRevenueReportData] = useState([]);
    const [showRevenueReport, setShowRevenueReport] = useState(false);  
    
    const handleGenerateReport2 = async () => {
        try {
            const apiUrl = `http://localhost:5000/api/admin/finance-revenue-report?office=${office}&type=${type}`;
            let dateParams = '';
            
            if (startDate && endDate) {
                dateParams = `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
            }
    
            const response = await fetch(apiUrl + dateParams);
    
            if (!response.ok) {
                throw new Error('Failed to fetch revenue report data');
            }
            const data = await response.json();
            setRevenueReportData(data);
            setShowRevenueReport(true);
        } catch (error) {
            console.error('Error fetching revenue report data:', error);
        }
    };
    

    // calculating total for each appt type //
    const getTotalForAppointmentType = (rows, appointmentType) => {
        let total = 0;
        rows.filter(row => row.Appointment_Type === appointmentType).forEach(row => total += parseFloat(row.Gross_Amount))
        return total;
    }
    
    // helper function for sorting // 
    function compare(a, b, fieldName) {
        if (fieldName === 'Date') {
            const dateA = new Date(a[fieldName]);
            const dateB = new Date(b[fieldName]);
            return dateA - dateB;
        } 
        else if (fieldName === 'Gross_Amount') {
            return parseFloat(a[fieldName]) - parseFloat(b[fieldName]);
        }
        else {
            if (a[fieldName] < b[fieldName]) {
                return -1;
            }
            if (a[fieldName] > b[fieldName]) {
                return 1;
            }
            return 0;
        }
    }

    // function to sort table //
    const sort = (fieldName) => {
        const sorted = [...revenueReportData];
        sorted.sort((a, b) => compare(a, b, fieldName));
        setRevenueReportData(sorted);
    };
    
    // function to calculate total revenue //
    const getTotalRevenue = (rows) => {
        return rows.reduce((total, row) => total + parseFloat(row.Gross_Amount), 0);
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
                    <li><a href="/admin/dentists" className="block py-2 text-center text-gray-600 hover:text-black">Dentists</a></li>
                    <li><a href="/admin/staff" className="block py-2 text-center text-gray-600 hover:text-black">Staff</a></li>
                    <li><a href="/admin/appointment-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Appointment Data Report</a></li>
                    <li><a href="/admin/finance-data-report" className="block py-2 text-center font-bold underline">Finance Data Report</a></li>
                    <li><a href="/admin/demographic-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Demographic Data Report</a></li>
                </ul>
                </nav>
            </aside>
            
            <div className="content p-4 flex-1">
                <h1 className="text-3xl font-bold mb-4 pt-8 pl-8">Finance Data Report</h1>
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Filters:</h2>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center">
                            <label htmlFor="office" className="block mb-1"></label>
                                <select
                                    id="office"
                                    value={office}
                                    onChange={(e) => setOffice(e.target.value)}
                                    className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
                                >
                                    <option value="" disabled>Select Office</option>
                                    <option value="All">All</option>
                                    <option value="1">Austin</option>
                                    <option value="2">Phoenix</option>
                                </select>
                        </div>
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
                        <div className="flex items-center">
                            <label htmlFor="type" className="block mb-1"></label>
                                <select
                                    id="type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
                                >
                                    <option value="" disabled>Select Appointment Type</option>
                                    <option value="All">All</option>
                                    <option value="Cleaning">Cleaning</option>
                                    <option value="Whitening">Whitening</option>
                                    <option value="Extraction">Extraction</option>
                                    <option value="Root Canal">Root Canal</option>
                                </select>
                        </div>
                    </div>
                    <button onClick={handleGenerateReport2} className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300 hover:bg-blue-600 mt-4">Generate Report</button>
                </div>
                {showRevenueReport && (
                <div className="flex flex flex-wrap">
                    <div className="w-3/4 pr-4">
                        <div className="overflow-x-auto">
                            {/* <h2 className="text-2xl font-bold my-4">All Appointment Amounts</h2> */}
                            <p className="text-medium my-4">Click on column names to sort</p>
                            <table className="mt-4 w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100 border-b border-gray-300">
                                        <th onClick={() => sort('Appointment_Type')} className="py-2 px-4 border-r border-gray-300">Type</th>
                                        <th onClick={() => sort('Date')} className="py-2 px-4 border-r border-gray-300">Date</th>
                                        <th onClick={() => sort('Dentist_FirstName')} className="py-2 px-4 border-r border-gray-300">Dentist Name</th>
                                        <th onClick={() => sort('Patient_FirstName')} className="py-2 px-4 border-r border-gray-300">Patient Name</th>
                                        <th onClick={() => sort('Gross_Amount')} className="py-2 px-4 border-r border-gray-300">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {revenueReportData.map((row, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                        <td className="py-2 px-4 border-r border-gray-300">{row.Appointment_Type}</td>
                                        <td className="py-2 px-4 border-r border-gray-300">{new Date(row.Date).toLocaleDateString()}</td>
                                        <td className="py-2 px-4 border-r border-gray-300">{`${row.Dentist_FirstName} ${row.Dentist_LastName}`}</td>
                                        <td className="py-2 px-4 border-r border-gray-300">{`${row.Patient_FirstName} ${row.Patient_LastName}`}</td>
                                        <td className="py-2 px-4 border-r border-gray-300">${row.Gross_Amount}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="w-1/4 bg-gray-100 p-4">
                        <h2 className="text-2xl font-bold my-4">Revenue Metrics</h2>
                        <div className="w-full">
                            <div className="mb-4">
                                <div className="py-2 font-bold">Total Revenue Summed:</div>
                                <div>Total: ${getTotalRevenue(revenueReportData)}</div>
                            </div>
                            <div className="mb-4">
                                <div className="py-2 font-bold">Cleaning:</div>
                                <div>Total: ${getTotalForAppointmentType(revenueReportData, 'Cleaning')}</div>
                                <div>Percentage of Total Revenue: {(getTotalForAppointmentType(revenueReportData, 'Cleaning') / getTotalRevenue(revenueReportData) * 100).toFixed(2)}%</div>
                            </div>
                            <div className="mb-4">
                                <div className="py-2 font-bold">Whitening:</div>
                                <div>Total: ${getTotalForAppointmentType(revenueReportData, 'Whitening')}</div>
                                <div>Percentage of Total Revenue: {(getTotalForAppointmentType(revenueReportData, 'Whitening') / getTotalRevenue(revenueReportData) * 100).toFixed(2)}%</div>
                            </div>
                            <div className="mb-4">
                                <div className="py-2 font-bold">Extraction:</div>
                                <div>Total: ${getTotalForAppointmentType(revenueReportData, 'Extraction')}</div>
                                <div>Percentage of Total Revenue: {(getTotalForAppointmentType(revenueReportData, 'Extraction') / getTotalRevenue(revenueReportData) * 100).toFixed(2)}%</div>
                            </div>
                            <div>
                                <div className="py-2 font-bold">Root Canal:</div>
                                <div>Total: ${getTotalForAppointmentType(revenueReportData, 'Root Canal')}</div>
                                <div>Percentage of Total Revenue: {(getTotalForAppointmentType(revenueReportData, 'Root Canal') / getTotalRevenue(revenueReportData) * 100).toFixed(2)}%</div>
                            </div>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
        <Footer />
    </div>
  );
}

export default FinanceDataReport;