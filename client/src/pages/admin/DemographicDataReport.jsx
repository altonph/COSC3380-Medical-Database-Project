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
    const [gender, setGender] = useState('');
    const [insuranceType, setInsuranceType] = useState('');

    const [mainResults, setMainResults] = useState([]);
    const [sidebarMetrics, setsidebarMetrics] = useState({});

    const [showReport, setShowReport] = useState(false);
    //calculated metrics

    const [filterLogs, setFilterLogs] = useState({});

    const logSetter = (setter, value) => {
        setFilterLogs({ ...filterLogs, [setter]: value });
      };

    const handleGenerateReport = async () => {
        try {
            const formData = new URLSearchParams();
            formData.append('office', office);
            formData.append('startDate', startDate || '');
            formData.append('endDate', endDate || '');
            formData.append('gender', gender);
            formData.append('insuranceType', insuranceType);

            const response = await fetch('http://localhost:5000/api/admin/demographic-data-report', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();

            //sort by date in ascending order
            const sortedResults = data.mainResults.sort((a, b) => new Date(a.date) - new Date(b.date));

            setMainResults(sortedResults);
            calculateSidebarMetrics(sortedResults);
            setShowReport(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // calculating metrics data

    const calculateSidebarMetrics = (mainResults) => {
        let genderDistribution = { Male: 0, Female: 0 };
        let genderRatio = 0;
        let insuranceCoverage = {
            'Anthem': 0,
            'Guardian': 0,
            'Ameritas': 0,
            'Humana': 0,
            'Spirit Dental': 0
        };
        let totalPatientVisits = 0;
        let visitsPerPatient = 0;
        let totalPatientCount = 0;
        let totalAge = 0;
        let ageDistribution = {
            '0-17': 0,
            '18-24': 0,
            '25-34': 0,
            '35-44': 0,
            '45-54': 0,
            '55-64': 0,
            '65+': 0
        };
        let averageAge = 0;
        
        mainResults.forEach(result => {
            // total patients
            totalPatientCount++;

            // total age and age distribution
            totalAge += result.Age;
            if (result.Age >= 0 && result.Age <= 17) {
                ageDistribution['0-17']++;
            } else if (result.Age >= 18 && result.Age <= 24) {
                ageDistribution['18-24']++;
            } else if (result.Age >= 25 && result.Age <= 34) {
                ageDistribution['25-34']++;
            } else if (result.Age >= 35 && result.Age <= 44) {
                ageDistribution['35-44']++;
            } else if (result.Age >= 45 && result.Age <= 54) {
                ageDistribution['45-54']++;
            } else if (result.Age >= 55 && result.Age <= 64) {
                ageDistribution['55-64']++;
            } else {
                ageDistribution['65+']++;
            }


            // Insurance Coverage
            insuranceCoverage[result.Insurance_Company_Name]++;  
            
            // gender distribuiton
            if (result.Gender === 'Male') {
                genderDistribution['Male']++;
            } else if (result.Gender === 'Female') {
                genderDistribution['Female']++;
            }

            totalPatientVisits += result.Completed_Appointments;
            totalPatientVisits += result.Scheduled_Appointments;
            
        })
        // gender ratio
        genderRatio = genderDistribution['Male'] / genderDistribution['Female'];
        console.log(totalAge);
        // Calculate percentage of patients in each age group and average age
        averageAge = (totalAge / totalPatientCount).toFixed(2);
        const ageGroupPercentages = {};
        for (const [group, count] of Object.entries(ageDistribution)) {
            ageGroupPercentages[group] = ((count / totalPatientCount) * 100).toFixed(2) + '%';
        }

        // average visits per patient
        visitsPerPatient = totalPatientVisits / totalPatientCount;

        // Find top insurance provider
        let topInsuranceProvider = '';
        let maxInsuranceCoverage = 0;
        for (const [insurance, coverage] of Object.entries(insuranceCoverage)) {
            if (coverage > maxInsuranceCoverage) {
                topInsuranceProvider = insurance;
                maxInsuranceCoverage = coverage;
            }
        }



        setsidebarMetrics({
            ageDistribution,
            ageGroupPercentages,
            totalPatientCount,
            genderDistribution,
            genderRatio,
            insuranceCoverage,
            topInsuranceProvider,
            totalPatientVisits,
            averageAge,
            visitsPerPatient,
        })
    }
    
    const handleApplyFilters = () => {
        setShowReport(false);
        handleGenerateReport();
    }

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
                                <select 
                                    value={office}
                                    onChange={(e) => {setOffice(e.target.value); logSetter('setOffice', e.target.value); }}
                                    className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
                                    >
                                        <option value="" > Select Office</option>
                                        <option value="1">Austin</option>
                                        <option value="2">Pheonix</option>
                                    </select>
                            </div>

                            {/* Start Date */}
                            <div className="flex items-center">
                                <DatePicker
                                    selected={startDate ? new Date(startDate) : null}
                                    onChange={(date) => { setStartDate(date ? date.toISOString() : ''); logSetter('setStartDate', date ? date.toISOString() : ''); }}
                                    className="border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
                                    isClearable={true}
                                    placeholderText="Select Date"
                                />
                            </div>

                            {/* End Date */}
                            <div className="flex items-center">
                                <DatePicker
                                    selected={endDate ? new Date(endDate) : null}
                                    onChange={(date) => { setEndDate(date ? date.toISOString() : ''); logSetter('setEndDate', date ? date.toISOString() : ''); }}
                                    className="border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
                                    isClearable={true}
                                    placeholderText="Select Date"
                                />
                            </div>
                            
                            {/* Gender */}
                            <div className="flex items-center">
                                <select
                                    value={gender}
                                    onChange={(e) => {setGender(e.target.value); logSetter('setGender', e.target.value); }}
                                    className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            {/* Insurance Type */}
                            <div className="flex items-center">
                                <select 
                                    value={insuranceType}
                                    onChange={(e) => {setInsuranceType(e.target.value); logSetter('setInsuranceType', e.target.value); }}
                                    className="w-full border py-2 px-3 rounded focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"
                                >
                                    <option value="" > Select Insurance Type</option>
                                    <option value="Anthem">Anthem</option>
                                    <option value="Guardian">Guardian</option>
                                    <option value="Ameritas">Ameritas</option>
                                    <option value="Humana">Humana</option>
                                    <option value="Spirit Dental">Spirit Dental</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={handleApplyFilters} className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300 hover:bg-blue-600 mt-4">Generate Report</button>
                    </div>

                    {/* Display report */}
                    {showReport && (
                        <div className="mt-8 flex flex-wrap">
                            <div className="w-3/4 pr-4">
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse border border-gray-300">
                                        <thead>
                                                <tr className="bg-gray-100 border-b border-gray-300">
                                                <th className="py-2 px-4 border-r border-gray-300">Patient Name</th>
                                                <th className="py-2 px-4 border-r border-gray-300">Gender</th>
                                                <th className="py-2 px-4 border-r border-gray-300">Age</th>
                                                <th className="py-2 px-4 border-r border-gray-300">Insurance Type</th>
                                                {/* <th className="py-2 px-4 border-r border-gray-300">Total Visits</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {mainResults.map((result, index) => (
                                                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                                                <td className="py-2 px-4 border-r border-gray-300">{`${result.FName} ${result.LName}`}</td>
                                                <td className="py-2 px-4 border-r border-gray-300">{result.Gender}</td>
                                                <td className="py-2 px-4 border-r border-gray-300">{result.Age}</td>
                                                <td className="py-2 px-4 border-r border-gray-300">{result.Insurance_Company_Name}</td>
                                                {/* <td className="py-2 px-4 border-r border-gray-300">{result.TotalVisits}</td> */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Display Overall Metrics */}
                            <div className="w-1/4 bg-gray-100 p-4">
                                <h2 className='text-xl font-bold mb-4'>Metrics</h2>
                                <table className='w-full'>
                                    <tbody>
                                        <tr>
                                            <td className='py-2 font-bold'>Age Distribution:</td>
                                            <td className='py-2'>
                                                <ul>
                                                    {Object.entries(sidebarMetrics.ageGroupPercentages).map(([group, percentage]) => (
                                                        <li key={group}>{group}: {percentage}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='py-2 font-bold'>Gender Distribution:</td>
                                            <td className='py-2'>
                                                Male: {sidebarMetrics.genderDistribution.Male}, Female: {sidebarMetrics.genderDistribution.Female}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='py-2 font-bold'>Male-to-Female Ratio:</td>
                                            <td className='py-2'>{sidebarMetrics.genderRatio}</td>
                                        </tr>
                                        <tr>
                                            <td className='py-2 font-bold'>Insurance Coverage:</td>
                                            <td className='py-2'>
                                                <ul>
                                                    {Object.entries(sidebarMetrics.insuranceCoverage).map(([insurance, count]) => (
                                                        <li key={insurance}>
                                                            {insurance}: {count}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='py-2 font-bold'>Total Patient Visits:</td>
                                            <td className='py-2'>{sidebarMetrics.totalPatientVisits}</td>
                                        </tr>
                                        <tr>
                                            <td className='py-2 font-bold'>Total Patient Count:</td>
                                            <td className='py-2'>{sidebarMetrics.totalPatientCount}</td>
                                        </tr>
                                        <tr>
                                            <td className='py-2 font-bold'>Average Age:</td>
                                            <td className='py-2'>{sidebarMetrics.averageAge}</td>
                                        </tr>
                                        <tr>
                                            <td className='py-2 font-bold'>Top Insurance Provider:</td>
                                            <td className='py-2'>{sidebarMetrics.topInsuranceProvider}</td>
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
)
}

export default DemographicDataReport;