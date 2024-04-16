import React, { useState, useEffect } from "react";
import HeaderPortalAdmin from "../../components/HeaderPortalAdmin";
import Footer from "../../components/Footer";

const AdminPortal = () => {
    const [dentists, setDentists] = useState([]);
    const [editedDentist, setEditedDentist] = useState({
        dentistID: null,
        originalOffices: []
    });

    useEffect(() => {
        fetchDentistsAndOffices();
    }, []);

    const fetchDentistsAndOffices = async () => {
        try {
            const dentistsResponse = await fetch("http://localhost:5000/api/admin/getDentists");
            const officesResponse = await fetch("http://localhost:5000/api/admin/getOfficeDentists");

            if (dentistsResponse.ok && officesResponse.ok) {
                const dentistsData = await dentistsResponse.json();
                const officesData = await officesResponse.json();

                // Merge data based on dentistID
                const mergedData = dentistsData.map(dentist => {
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
    
            const response = await fetch("http://localhost:5000/api/admin/updateDentistOffice", {
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
            const response = await fetch("http://localhost:5000/api/office/assignDentist", {
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
                // Refresh the page to reflect the changes
                fetchDentistsAndOffices();
            } else {
                console.error("Failed to assign dentist to office");
            }
        } catch (error) {
            console.error("Error assigning dentist to office:", error);
        }
    };

    const handleAssignBothOffices = async (dentistID) => {
        try {
            const response1 = await fetch("http://localhost:5000/api/office/assignDentist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    officeID: 1, // Austin
                    dentistID: dentistID
                })
            });
    
            const response2 = await fetch("http://localhost:5000/api/office/assignDentist", {
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
                // Refresh the page to reflect the changes
                fetchDentistsAndOffices();
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
                    <button onClick={() => handleEditOffice(dentist.dentistID, dentist.offices)}>Edit</button>
                </>
            );
        } else {
            return (
                <>
                    <button onClick={() => handleAssignOffice(dentist.dentistID, 1)}>Assign Austin</button>
                    <button onClick={() => handleAssignOffice(dentist.dentistID, 2)}>Assign Phoenix</button>
                    <button onClick={() => handleAssignBothOffices(dentist.dentistID)}>Assign Both</button>
                </>
            );
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
                                <li><a href="/admin/staff" className="block py-2 text-center text-gray-600 hover:text-black">Staff</a></li>
                                <li><a href="/admin/appointment-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Appointment Data Report</a></li>
                                <li><a href="/admin/finance-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Finance Data Report</a></li>
                                <li><a href="/admin/demographic-data-report" className="block py-2 text-center text-gray-600 hover:text-black">Demographic Data Report</a></li>
                            </ul>
                        </nav>
                    </aside>
                    
                    <main className="flex-1 p-4">
                        <h1 className="text-3xl font-bold mb-4 p-8">Dentist Office and Schedules</h1>
                        
                        {/* Dentist table */}
                        <table className="w-full border-collapse border border-gray-400">
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
                                                <button onClick={handleConfirmEdit}>Confirm</button>
                                                <button onClick={handleCancelEdit}>Cancel</button>
                                            </>
                                        ) : (
                                            renderActions(dentist)
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
