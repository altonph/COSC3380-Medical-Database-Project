import React, { useState, useEffect } from "react";
import HeaderPortalAdmin from "../../components/HeaderPortalAdmin";
import Footer from "../../components/Footer";

const AdminPortal = () => {
    const [dentists, setDentists] = useState([]);
    const [adminName, setAdminName] = useState('Admin Name');

    useEffect(() => {
        const firstName = localStorage.getItem('firstName');
        const lastName = localStorage.getItem('lastName');
        
        if (firstName && lastName) {
            setAdminName(`${firstName} ${lastName}`);
        }
    }, []);

    const [editedDentist, setEditedDentist] = useState({
        dentistID: null,
        originalOffices: []
    });
    
    const [schedules, setSchedules] = useState([]);
    const [editedSchedule, setEditedSchedule] = useState(null);

    useEffect(() => {
        fetchDentistsAndOffices();
        fetchSchedules();
    }, []);

    const fetchDentistsAndOffices = async () => {
        try {
            const dentistsResponse = await fetch("https://cosc3380-medical-database-project-server.onrender.com/api/admin/getDentists");
            const officesResponse = await fetch("https://cosc3380-medical-database-project-server.onrender.com/api/admin/getOfficeDentists");
    
            if (dentistsResponse.ok && officesResponse.ok) {
                const dentistsData = await dentistsResponse.json();
                const officesData = await officesResponse.json();
    
                // Filter out inactive dentists
                const activeDentists = dentistsData.filter(dentist => dentist.Is_active);
    
                // Merge data based on dentistID
                const mergedData = activeDentists.map(dentist => {
                    const dentistOffices = officesData
                        .filter(office => office.dentistID === dentist.dentistID)
                        .map(office => office.officeID);
                    return { ...dentist, offices: dentistOffices };
                });
    
                setDentists(mergedData);
            } else {
                console.error("Failed to fetch dentists or offices");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    

    const handleEditOffice = (dentistID, originalOffices) => {
        // Set the edited dentist ID and original offices
        setEditedDentist({ dentistID, originalOffices });
    };

    const handleCancelEdit = () => {
        // Revert the offices back to their original values for the edited dentist
        const updatedDentists = dentists.map(dentist => {
            if (dentist.dentistID === editedDentist.dentistID) {
                return { ...dentist, offices: editedDentist.originalOffices };
            }
            return dentist;
        });
        setDentists(updatedDentists);
        setEditedDentist({ dentistID: null, originalOffices: [] });
    };

    const handleOfficeChange = (e) => {
        const { value } = e.target;
        const offices = value.split(',').map(Number);
        setEditedDentist(prevState => ({ ...prevState, originalOffices: offices }));
    };
    
    const handleConfirmEdit = async () => {
        try {
            // Implement logic to update the offices for the edited dentist
            console.log(`New offices for Dentist ${editedDentist.dentistID}:`, editedDentist.originalOffices);
    
            const response = await fetch("https://cosc3380-medical-database-project-server.onrender.com/api/admin/updateDentistOffice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    dentistID: editedDentist.dentistID,
                    newOfficeIDs: editedDentist.originalOffices
                })
            });
    
            if (response.ok) {
                console.log("Offices updated successfully!");
                // Refresh the page to reflect the changes
                fetchDentistsAndOffices();
                fetchSchedules();
            } else {
                console.error("Failed to update offices");
            }
        } catch (error) {
            console.error("Error updating offices:", error);
        } finally {
            setEditedDentist({ dentistID: null, originalOffices: [] });
        }
    };

    const handleAssignOffice = async (dentistID, officeID) => {
        try {
            // Make a POST request to assign the dentist to the office
            const response = await fetch("https://cosc3380-medical-database-project-server.onrender.com/api/office/assignDentist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    officeID: officeID,
                    dentistID: dentistID
                })
            });
    
            if (response.ok) {
                console.log("Dentist assigned to office successfully!");
    
                // Assign schedule with all days set to false
                const scheduleResponse = await fetch("https://cosc3380-medical-database-project-server.onrender.com/api/dentist/assignSchedule", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        officeID: officeID,
                        dentistID: dentistID,
                        schedule: {
                            Monday: false,
                            Tuesday: false,
                            Wednesday: false,
                            Thursday: false,
                            Friday: false
                        }
                    })
                });
    
                if (scheduleResponse.ok) {
                    console.log("Schedule assigned successfully!");
                    fetchDentistsAndOffices();
                    fetchSchedules();
                } else {
                    console.error("Failed to assign schedule");
                }
            } else {
                console.error("Failed to assign dentist to office");
            }
        } catch (error) {
            console.error("Error assigning dentist to office:", error);
        }
    };
    
    const handleAssignBothOffices = async (dentistID) => {
        try {
            // Make two POST requests to assign the dentist to both offices
            const response1 = await fetch("https://cosc3380-medical-database-project-server.onrender.com/api/office/assignDentist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    officeID: 1, // Austin
                    dentistID: dentistID
                })
            });
    
            const response2 = await fetch("https://cosc3380-medical-database-project-server.onrender.com/api/office/assignDentist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    officeID: 2, // Phoenix
                    dentistID: dentistID
                })
            });
    
            if (response1.ok && response2.ok) {
                console.log("Dentist assigned to both offices successfully!");
    
                // Assign schedules for both offices
                const scheduleResponse1 = await fetch("https://cosc3380-medical-database-project-server.onrender.com/api/dentist/assignSchedule", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        officeID: 1, // Austin
                        dentistID: dentistID,
                        schedule: {
                            Monday: false,
                            Tuesday: false,
                            Wednesday: false,
                            Thursday: false,
                            Friday: false
                        }
                    })
                });
    
                const scheduleResponse2 = await fetch("https://cosc3380-medical-database-project-server.onrender.com/api/dentist/assignSchedule", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        officeID: 2, // Phoenix
                        dentistID: dentistID,
                        schedule: {
                            Monday: 0,
                            Tuesday: 0,
                            Wednesday: 0,
                            Thursday: 0,
                            Friday: 0
                        }
                    })
                });
    
                if (scheduleResponse1.ok && scheduleResponse2.ok) {
                    console.log("Schedules assigned successfully!");
                    fetchDentistsAndOffices();
                    fetchSchedules();
                } else {
                    console.error("Failed to assign schedules");
                }
            } else {
                console.error("Failed to assign dentist to both offices");
            }
        } catch (error) {
            console.error("Error assigning dentist to offices:", error);
        }
    };
    

    const renderActions = (dentist) => {
        if (dentist.offices.length > 0) {
            return (
                <>
                    <button className= 'mr-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded' onClick={() => handleEditOffice(dentist.dentistID, dentist.offices)}>Edit</button>
                </>
            );
        } else {
            return (
                <>
                    <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleAssignOffice(dentist.dentistID, 1)}>Assign Austin</button>
                    <button className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleAssignOffice(dentist.dentistID, 2)}>Assign Phoenix</button>
                    <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleAssignBothOffices(dentist.dentistID)}>Assign Both</button>
                </>
            );
        }
    };

    const fetchSchedules = async () => {
        try {
            const response = await fetch("https://cosc3380-medical-database-project-server.onrender.com/api/admin/getSchedules");
            if (response.ok) {
                const data = await response.json();
                setSchedules(data);
            } else {
                console.error("Failed to fetch schedules");
            }
        } catch (error) {
            console.error("Error fetching schedules:", error);
        }
    };

    const handleEditSchedule = (scheduleID) => {
        setEditedSchedule(scheduleID);
    };

    const handleCancelEditSchedule = () => {
        setEditedSchedule(null);
    };

    const handleScheduleChange = (e, day) => {
        const { value } = e.target;
        console.log("Value:", value);
        const newValue = value === '1' ? true : false;
        console.log("New Value:", newValue);
    
        setSchedules(prevSchedules => {
            return prevSchedules.map(schedule => {
                if (schedule.scheduleID === editedSchedule) {
                    return { ...schedule, [day]: newValue };
                }
                return schedule;
            });
        });
    };
    
    
    const handleConfirmEditSchedule = async (scheduleID, updatedSchedule) => {
        try {
            // Construct the request payload with the correct format
            const requestBody = {
                scheduleID: updatedSchedule.scheduleID,
                dentistID: updatedSchedule.dentistID,
                officeID: updatedSchedule.officeID,
                schedule: {
                    Monday: updatedSchedule.Monday, // Send as '1' or '0'
                    Tuesday: updatedSchedule.Tuesday, // Send as '1' or '0'
                    Wednesday: updatedSchedule.Wednesday, // Send as '1' or '0'
                    Thursday: updatedSchedule.Thursday, // Send as '1' or '0'
                    Friday: updatedSchedule.Friday, // Send as '1' or '0'
                }
            };
    
            // Send the request with the updated payload
            const response = await fetch("https://cosc3380-medical-database-project-server.onrender.com/api/admin/updateSchedule", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });
    
            if (response.ok) {
                console.log("Schedule updated successfully!");
                // Refresh the page to reflect the changes
                fetchSchedules();
            } else {
                console.error("Failed to update schedule");
                window.alert("Dentist cannot have overlapping schedules.");
                fetchSchedules();
            }
        } catch (error) {
            console.error("Error updating schedule:", error);
        } finally {
            setEditedSchedule(null);
        }
    };
    

    return (
        <>
            <div className="flex h-screen flex-col">
                <nav>
                    <HeaderPortalAdmin />
                </nav>

                <div className="flex flex-1">
                    {/* Sidebar */}
                    <aside className="w-1/6 bg-gray-200 text-black">
                        <nav className="p-4 text-xl">
                            <ul>
                                <li><a href="/admin/home" className="block py-2 text-center font-bold underline">Home</a></li>
                                <li><a href="/admin/appointments" className="block py-2 text-center text-gray-600 hover:text-black">Appointments</a></li>
                                <li><a href="/admin/patients" className="block py-2 text-center text-gray-600 hover:text-black">Patients</a></li>
                                <li><a href="/admin/dentists" className="block py-2 text-center text-gray-600 hover:text-black">Dentists</a></li>
                                <li><a href="/admin/staff" className="block py-2 text-center text-gray-600 hover:text-black">Staff</a></li>
                                <li><a href="/admin/appointment-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Appointment Data Report</a></li>
                                <li><a href="/admin/finance-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Finance Data Report</a></li>
                                <li><a href="/admin/demographic-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Demographic Data Report</a></li>
                            </ul>
                        </nav>
                    </aside>
                    
                    <main className="flex-1 p-4">
                        <h1 className="text-3xl font-bold mb-4 p-8">Welcome {adminName}!</h1>
                        <h1 className="text-2xl font-bold mb-4 p-8">Dentist Offices Management</h1>
                        
                        {/* Dentist table */}
                        <table className="w-full border-collapse border border-gray-400 mb-8">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-400 px-4 py-2">Dentist ID</th>
                                    <th className="border border-gray-400 px-4 py-2">Dentist Name</th>
                                    <th className="border border-gray-400 px-4 py-2">Offices</th>
                                    <th className="border border-gray-400 px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {dentists && dentists.map(dentist => (
                                <tr key={dentist.dentistID} className="bg-white">
                                    <td className="border border-gray-400 px-4 py-2">{dentist.dentistID}</td>
                                    <td className="border border-gray-400 px-4 py-2">{`${dentist.FName} ${dentist.LName}`}</td>
                                    <td className="border border-gray-400 px-4 py-2">
                                        {editedDentist.dentistID === dentist.dentistID ? (
                                            <select value={editedDentist.originalOffices.join(',')} onChange={handleOfficeChange}>
                                                <option value="1">Austin</option>
                                                <option value="2">Phoenix</option>
                                                <option value="1,2">Both</option>
                                            </select>
                                        ) : (
                                            <span>
                                                {dentist.offices.length > 0 ? (
                                                    <span>
                                                        {dentist.offices.includes(1) && dentist.offices.includes(2) ? 'Both' :
                                                            dentist.offices.map(officeID => (
                                                                <span key={officeID}>
                                                                    {officeID === 1 ? 'Austin' : officeID === 2 ? 'Phoenix' : ''}
                                                                </span>
                                                            ))}
                                                    </span>
                                                ) : (
                                                    'None'
                                                )}
                                            </span>
                                        )}
                                    </td>

                                    <td className="border border-gray-400 px-4 py-2">
                                        {/* Render actions based on dentist's offices */}
                                        {editedDentist.dentistID === dentist.dentistID ? (
                                            <>
                                                <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded" onClick={handleConfirmEdit}>Confirm</button>
                                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded" onClick={handleCancelEdit}>Cancel</button>
                                            </>
                                        ) : (
                                            renderActions(dentist)
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <h1 className="text-2xl font-bold mb-4 p-8">Dentist Schedule Management</h1>
                        {/* Schedule table */}
                        <table className="w-full border-collapse border border-gray-400">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-400 px-4 py-2">Dentist ID</th>
                                    <th className="border border-gray-400 px-4 py-2">Office</th>
                                    {/* <th className="border border-gray-400 px-4 py-2">Dentist Name</th> */}
                                    <th className="border border-gray-400 px-4 py-2">Monday</th>
                                    <th className="border border-gray-400 px-4 py-2">Tuesday</th>
                                    <th className="border border-gray-400 px-4 py-2">Wednesday</th>
                                    <th className="border border-gray-400 px-4 py-2">Thursday</th>
                                    <th className="border border-gray-400 px-4 py-2">Friday</th>
                                    <th className="border border-gray-400 px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {schedules.map(schedule => (
                                <tr key={schedule.scheduleID} className="bg-white">
                                <td className="border border-gray-400 px-4 py-2">{schedule.dentistID}</td>
                                <td className="border border-gray-400 px-4 py-2">{schedule.officeID === 1 ? 'Austin' : schedule.officeID === 2 ? 'Phoenix' : 'Unknown'}</td>
                                <td className="border border-gray-400 px-4 py-2">
                                    {editedSchedule === schedule.scheduleID ? (
                                        <select value={schedule.Monday ? '1' : '0'} onChange={(e) => handleScheduleChange(e, 'Monday')}>
                                            <option value="1" style={{ color: schedule.Monday ? 'green' : 'red' }}>Yes</option>
                                            <option value="0" style={{ color: schedule.Monday ? 'red' : 'green' }}>No</option>
                                        </select>
                                    ) : (
                                        <span style={{ color: schedule.Monday ? 'green' : 'red' }}>{schedule.Monday ? 'Yes' : 'No'}</span>
                                    )}
                                </td>
                                <td className="border border-gray-400 px-4 py-2">
                                    {editedSchedule === schedule.scheduleID ? (
                                            <select value={schedule.Tuesday ? '1' : '0'} onChange={(e) => handleScheduleChange(e, 'Tuesday')}>
                                                <option value="1" style={{ color: schedule.Tuesday ? 'green' : 'red' }}>Yes</option>
                                                <option value="0" style={{ color: schedule.Tuesday ? 'red' : 'green' }}>No</option>
                                            </select>
                                        ) : (
                                            <span style={{ color: schedule.Tuesday ? 'green' : 'red' }}>{schedule.Tuesday ? 'Yes' : 'No'}</span>
                                        )}
                                </td>
                                <td className="border border-gray-400 px-4 py-2">
                                    {editedSchedule === schedule.scheduleID ? (
                                            <select value={schedule.Wednesday ? '1' : '0'} onChange={(e) => handleScheduleChange(e, 'Wednesday')}>
                                                <option value="1" style={{ color: schedule.Wednesday ? 'green' : 'red' }}>Yes</option>
                                                <option value="0" style={{ color: schedule.Wednesday ? 'red' : 'green' }}>No</option>
                                            </select>
                                        ) : (
                                            <span style={{ color: schedule.Wednesday ? 'green' : 'red' }}>{schedule.Wednesday ? 'Yes' : 'No'}</span>
                                        )}
                                </td>
                                <td className="border border-gray-400 px-4 py-2">
                                    {editedSchedule === schedule.scheduleID ? (
                                            <select value={schedule.Thursday ? '1' : '0'} onChange={(e) => handleScheduleChange(e, 'Thursday')}>
                                                <option value="1" style={{ color: schedule.Thursday ? 'green' : 'red' }}>Yes</option>
                                                <option value="0" style={{ color: schedule.Thursday ? 'red' : 'green' }}>No</option>
                                            </select>
                                        ) : (
                                            <span style={{ color: schedule.Thursday ? 'green' : 'red' }}>{schedule.Thursday ? 'Yes' : 'No'}</span>
                                        )}
                                </td>
                                <td className="border border-gray-400 px-4 py-2">
                                    {editedSchedule === schedule.scheduleID ? (
                                            <select value={schedule.Friday ? '1' : '0'} onChange={(e) => handleScheduleChange(e, 'Friday')}>
                                                <option value="1" style={{ color: schedule.Friday ? 'green' : 'red' }}>Yes</option>
                                                <option value="0" style={{ color: schedule.Friday ? 'red' : 'green' }}>No</option>
                                            </select>
                                        ) : (
                                            <span style={{ color: schedule.Friday ? 'green' : 'red' }}>{schedule.Friday ? 'Yes' : 'No'}</span>
                                        )}
                                </td>
                                <td className="border border-gray-400 px-4 py-2">
                                    {editedSchedule === schedule.scheduleID ? (
                                        <>
                                            <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded" onClick={() => handleConfirmEditSchedule(schedule.scheduleID, schedule)}>Confirm</button>
                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded" onClick={handleCancelEditSchedule}>Cancel</button>
                                        </>
                                    ) : (
                                        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded" onClick={() => handleEditSchedule(schedule.scheduleID)}>Edit</button>
                                    )}
                                </td>
                            </tr>
                            ))}
                            </tbody>
                        </table>
                    </main>

                </div>

                <nav>
                    <Footer/>
                </nav>
            </div>
        </>
    );
};

export default AdminPortal;
