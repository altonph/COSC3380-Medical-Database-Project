const pool = require('../models/db');

const getAllPatients = (req, res) => {
    pool.query('SELECT * FROM patient', (error, results) => {
        if (error) {
            console.error('Error retrieving patients:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    });
};

const getPatientById = (req, res, patientId) => {
    pool.query('SELECT * FROM patient WHERE patientID = ?', [patientId], (error, results) => {
        if (error) {
            console.error('Error retrieving patient:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        if (results.length === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Patient not found' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results[0]));
    });
};

const getMedicalHistoryByPatientId = (req, res, patientId) => {
    pool.query('SELECT * FROM medical_records WHERE patientID = ?', [patientId], (error, results) => {
        if (error) {
            console.error('Error retrieving medical history:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    });
};

const getPrescriptionsByPatientId = (req, res, patientId) => {
    pool.query('SELECT * FROM prescription WHERE patientID = ?', [patientId], (error, results) => {
        if (error) {
            console.error('Error retrieving prescriptions:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    });
};

const getInvoicesByPatientId = (req, res, patientId) => {
    pool.query('SELECT * FROM invoice WHERE patientID = ?', [patientId], (error, results) => {
        if (error) {
            console.error('Error retrieving invoices:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    });
};

const getVisitDetailsByPatientId = (req, res, patientId) => {
    pool.query('SELECT * FROM visit_details WHERE patientID = ?', [patientId], (error, results) => {
        if (error) {
            console.error('Error retrieving visit details:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results));
    });
};

const updateMedicalHistoryByPatientId = (req, res, patientId) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const medicalHistoryData = JSON.parse(body);
        const { Allergies, Feet, Inches, Weight, Notes } = medicalHistoryData;
        const query = `
            UPDATE medical_records 
            SET Allergies = ?, Feet = ?, Inches = ?, Weight = ?, Notes = ? 
            WHERE patientID = ?`;
        pool.query(query, [Allergies, Feet, Inches, Weight, Notes, patientId], (error, results) => {
            if (error) {
                console.error('Error updating medical history:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }
            if (results.affectedRows === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Patient not found' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Medical history updated successfully' }));
        });
    });
};

const updatePrescriptionsByPatientId = (req, res, patientId) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const prescriptionsData = JSON.parse(body);
        const { prescriptionID, Medication_Name, National_Drug_Code, Medication_Dosage, Refills, notes } = prescriptionsData;
        const query = `
            UPDATE prescription 
            SET Medication_Name = ?, National_Drug_Code = ?, Medication_Dosage = ?, Refills = ?, notes = ? 
            WHERE prescriptionID = ? AND patientID = ?`; 
        pool.query(query, [Medication_Name, National_Drug_Code, Medication_Dosage, Refills, notes, prescriptionID, patientId], (error, results) => {
            if (error) {
                console.error('Error updating prescriptions:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }
            if (results.affectedRows === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Prescription or Patient not found' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Prescriptions updated successfully' }));
        });
    });
};

const updateVisitDetailsByPatientId = (req, res, patientId) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const visitDetailsData = JSON.parse(body);
        const { visitID, dentistID, Visit_Type, Diagnosis, Treatment, Notes } = visitDetailsData;
        const query = `
            UPDATE visit_details 
            SET dentistID = ?, Visit_Type = ?, Diagnosis = ?, Treatment = ?, Notes = ? 
            WHERE visitID = ? AND patientID = ?`; 
        pool.query(query, [dentistID, Visit_Type, Diagnosis, Treatment, Notes, visitID, patientId], (error, results) => {
            if (error) {
                console.error('Error updating visit details:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }
            if (results.affectedRows === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Visit details or Patient not found' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Visit details updated successfully' }));
        });
    });
};


const getAppointmentsByDoctorUsername = (req, res, username) => {
    pool.query('SELECT DentistID FROM login WHERE Username = ?', [username], (error, results) => {
        if (error) {
            console.error('Error retrieving doctor ID:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        if (results.length === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Doctor not found' }));
            return;
        }

        const doctorId = results[0].DentistID;
        pool.query('SELECT * FROM appointment WHERE dentistID = ?', [doctorId], (error, results) => {
            if (error) {
                console.error('Error retrieving appointments:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }

            const formattedResults = results.map(appointment => {
                const formattedDate = new Date(appointment.Date).toLocaleDateString();
                return { ...appointment, Date: formattedDate };
            });

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        });
    });
};

const getAppointmentsByStaffUsername = (req, res, username) => {
    pool.query('SELECT StaffID FROM login WHERE Username = ?', [username], (error, results) => {
        if (error) {
            console.error('Error retrieving staff ID:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        if (results.length === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Staff not found' }));
            return;
        }

        const staffId = results[0].StaffID;
        pool.query('SELECT * FROM appointment WHERE staffID = ?', [staffId], (error, results) => {
            if (error) {
                console.error('Error retrieving appointments:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }

            const formattedResults = results.map(appointment => {
                const formattedDate = new Date(appointment.Date).toLocaleDateString();
                return { ...appointment, Date: formattedDate };
            });

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(formattedResults));
        });
    });
};

const getInformationByPatientId = (req, res, patientId) => {
    pool.query('SELECT * FROM patient WHERE patientID = ?', [patientId], (error, results) => {
        if (error) {
            console.error('Error retrieving patient information:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        if (results.length === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Patient not found' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results[0]));
    });
};

const updatePatientInformationByPatientId = (req, res, patientId) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const patientData = JSON.parse(body);
        const { Policy_number, Gender, FName, LName, DOB, Email, Phone_num, Address } = patientData;
        const query = `
            UPDATE patient 
            SET Policy_number = ?, Gender = ?, FName = ?, LName = ?, DOB = ?, Email = ?, Phone_num = ?, Address = ? 
            WHERE patientID = ?`;
        pool.query(query, [Policy_number, Gender, FName, LName, DOB, Email, Phone_num, Address, patientId], (error, results) => {
            if (error) {
                console.error('Error updating patient information:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }
            if (results.affectedRows === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Patient not found' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Patient information updated successfully' }));
        });
    });
};

const insertVisitDetails = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const visitDetailsData = JSON.parse(body);
        const { patientID, dentistID, officeID, Date, Start_time, Diagnosis, Treatment, Notes } = visitDetailsData;
        const query = `
            INSERT INTO visit_details (patientID, dentistID, officeID, Date, Start_time, Diagnosis, Treatment, Notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        pool.query(query, [patientID, dentistID, officeID, Date, Start_time, Diagnosis, Treatment, Notes], (error, results) => {
            if (error) {
                console.error('Error inserting visit details:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Visit details inserted successfully', visitID: results.insertId }));
        });
    });
};

const insertPrescription = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const prescriptionData = JSON.parse(body);
        const { dentistID, patientID, visitID, National_Drug_Code, Medication_Name, Medication_Dosage, Refills, notes, Date_prescribed } = prescriptionData;
        const query = `
            INSERT INTO prescription 
            (dentistID, patientID, visitID, National_Drug_Code, Medication_Name, Medication_Dosage, Refills, notes, Date_prescribed) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        pool.query(query, [dentistID, patientID, visitID, National_Drug_Code, Medication_Name, Medication_Dosage, Refills, notes, Date_prescribed], (error, results) => {
            if (error) {
                console.error('Error inserting prescription:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Prescription inserted successfully', prescriptionID: results.insertId }));
        });
    });
};

const insertAppointment = (req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const appointmentData = JSON.parse(body);
        const { officeID, dentistID, staffID, patientID, Date, Start_time, End_time, Appointment_Type, Appointment_Status, Cancellation_Reason, Specialist_Approval, Is_active } = appointmentData;
        const query = `
            INSERT INTO appointment 
            (officeID, dentistID, staffID, patientID, Date, Start_time, End_time, Appointment_Type, Appointment_Status, Cancellation_Reason, Primary_Approval, Is_active) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        pool.query(query, [officeID, dentistID, staffID, patientID, Date, Start_time, End_time, Appointment_Type, Appointment_Status, Cancellation_Reason, Specialist_Approval, Is_active], (error, results) => {
            if (error) {
                console.error('Error inserting appointment:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Appointment inserted successfully', appointmentID: results.insertId }));
        });
    });
};

const checkVisitDetailsCount = (req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        try {
            const appointmentData = JSON.parse(body);
            const { officeID, dentistID, patientID, Date, Start_time } = appointmentData;

            pool.query(
                'SELECT COUNT(*) AS visitDetailsCount FROM visit_details WHERE officeID = ? AND dentistID = ? AND patientID = ? AND Date = ? AND Start_time = ?',
                [officeID, dentistID, patientID, Date, Start_time],
                (error, results) => {
                    if (error) {
                        console.error('Error checking visit details:', error);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Internal Server Error' }));
                        return;
                    }

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ visitDetailsCount: results[0].visitDetailsCount }));
                }
            );
        } catch (error) {
            console.error('Error parsing request body:', error);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Bad Request' }));
        }
    });
};

const updateAppointmentStatus = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        try {
            const appointmentData = JSON.parse(body);
            const { Appointment_Status, Cancellation_Reason } = appointmentData;
  
            let query = '';
            let queryParams = [];
  
            if (Appointment_Status === 'Completed') {
                query = `
                    UPDATE appointment 
                    SET Appointment_Status = ? 
                    WHERE dentistID = ? AND patientID = ? AND Date = ? AND Start_time = ?`;
                queryParams = [Appointment_Status, appointmentData.dentistID, appointmentData.patientID, appointmentData.Date, appointmentData.Start_time];
            } else if (Appointment_Status === 'Cancelled') {
                query = `
                    UPDATE appointment 
                    SET Appointment_Status = ?, Cancellation_Reason = ? 
                    WHERE dentistID = ? AND patientID = ? AND Date = ? AND Start_time = ?`;
                queryParams = [Appointment_Status, Cancellation_Reason, appointmentData.dentistID, appointmentData.patientID, appointmentData.Date, appointmentData.Start_time];
            } else {
                query = `
                    UPDATE appointment 
                    SET Appointment_Status = ? 
                    WHERE dentistID = ? AND patientID = ? AND Date = ? AND Start_time = ?`;
                queryParams = [Appointment_Status, appointmentData.dentistID, appointmentData.patientID, appointmentData.Date, appointmentData.Start_time];
            }
  
            pool.query(query, queryParams, (error, results) => {
                if (error) {
                    console.error('Error updating appointment status:', error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                    return;
                }
  
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Appointment status updated successfully' }));
            });
        } catch (error) {
            console.error('Error parsing request body:', error);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Bad Request' }));
        }
    });
};  

const checkPatientExistence = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        try {
            const requestData = JSON.parse(body);
            const { patientID } = requestData;

            pool.query(
                'SELECT COUNT(*) AS patientCount FROM patient WHERE patientID = ?',
                [patientID],
                (error, results) => {
                    if (error) {
                        console.error('Error checking patient existence:', error);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Internal Server Error' }));
                        return;
                    }

                    const patientCount = results[0].patientCount;
                    const patientExists = patientCount > 0;
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ patientExists }));
                }
            );
        } catch (error) {
            console.error('Error parsing request body:', error);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Bad Request' }));
        }
    });
};

const generateInvoice = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        try {
            const requestData = JSON.parse(body);
            const { visitID, dentistID, patientID, visitDate, Start_time } = requestData;
            
            pool.query(
                'SELECT * FROM visit_details WHERE visitID = ?',
                [visitID],
                (error, results) => {
                    if (error) {
                        console.error('Error retrieving visit details:', error);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Internal Server Error' }));
                        return;
                    }

                    if (results.length === 0) {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Visit not found' }));
                        return;
                    }

                    const visitDetails = results[0];

                    pool.query(
                        'SELECT Policy_number, Insurance_Company_Name FROM patient WHERE patientID = ?',
                        [patientID],
                        (error, results) => {
                            if (error) {
                                console.error('Error retrieving patient information:', error);
                                res.writeHead(500, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                                return;
                            }

                            if (results.length === 0) {
                                res.writeHead(404, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ error: 'Patient not found' }));
                                return;
                            }

                            const patientPolicyNumber = results[0].Policy_number;
                            const insuranceCompany = results[0].Insurance_Company_Name;

                            pool.query(
                                'SELECT Appointment_type FROM appointment WHERE dentistID = ? AND patientID = ? AND Date = ? AND Start_time = ?',
                                [dentistID, patientID, visitDate, Start_time],
                                (error, results) => {
                                    if (error) {
                                        console.error('Error retrieving appointment information:', error);
                                        res.writeHead(500, { 'Content-Type': 'application/json' });
                                        res.end(JSON.stringify({ error: 'Internal Server Error' }));
                                        return;
                                    }

                                    const appointmentType = results[0] ? results[0].Appointment_type : null;

                                    let grossAmount = 0;
                                    let insuranceCoverage = 0;
                                    let netAmount = 0;

                                    switch (appointmentType) {
                                        case 'Cleaning':
                                            grossAmount = 150.00;
                                            insuranceCoverage = insuranceCompany ? grossAmount * 0.8 : 0;
                                            break;
                                        case 'Whitening':
                                            grossAmount = 650.00;
                                            insuranceCoverage = insuranceCompany ? grossAmount * 0.5 : 0;
                                            break;
                                        case 'Extraction':
                                            grossAmount = 300.00;
                                            insuranceCoverage = insuranceCompany ? grossAmount * 0.5 : 0;
                                            break;
                                        case 'Root Canal':
                                            grossAmount = 1100.00;
                                            insuranceCoverage = insuranceCompany ? grossAmount * 0.3 : 0;
                                            break;
                                        default:
                                            break;
                                    }

                                    netAmount = grossAmount - insuranceCoverage + 20.00;

                                    const currentDate = new Date().toISOString().split('T')[0];
                                    pool.query(
                                        'INSERT INTO invoice (Policy_number, patientID, visitID, Date, Gross_Amount, Insurance_coverage, Net_Amount, Paid_Amount, Is_paid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                                        [patientPolicyNumber, patientID, visitID, currentDate, grossAmount, insuranceCoverage, netAmount, 0, false],
                                        (error, results) => {
                                            if (error) {
                                                console.error('Error generating invoice:', error);
                                                res.writeHead(500, { 'Content-Type': 'application/json' });
                                                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                                                return;
                                            }

                                            res.writeHead(201, { 'Content-Type': 'application/json' });
                                            res.end(JSON.stringify({ message: 'Invoice generated successfully', invoiceID: results.insertId }));
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
        } catch (error) {
            console.error('Error parsing request body:', error);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Bad Request' }));
        }
    });
};

module.exports = {
    getAllPatients,
    getPatientById,
    getMedicalHistoryByPatientId,
    getPrescriptionsByPatientId,
    getInvoicesByPatientId,
    getVisitDetailsByPatientId,
    updateMedicalHistoryByPatientId,
    updatePrescriptionsByPatientId,
    updateVisitDetailsByPatientId,
    getAppointmentsByDoctorUsername,
    getAppointmentsByStaffUsername,
    getInformationByPatientId,
    updatePatientInformationByPatientId,
    insertVisitDetails,
    insertPrescription,
    insertAppointment,
    checkVisitDetailsCount,
    updateAppointmentStatus,
    checkPatientExistence,
    generateInvoice
};