const pool = require('../models/db');
const jwt = require('jsonwebtoken');

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

const insertMedicalHistoryByPatientId = (req, res, patientId) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const medicalHistoryData = JSON.parse(body);
        const { Allergies, Feet, Inches, Weight, Notes } = medicalHistoryData;
        const currentDate = new Date().toISOString().split('T')[0];
        const query = `
            INSERT INTO medical_records (patientID, Date_Created, Allergies, Feet, Inches, Weight, Notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
        pool.query(query, [patientId, currentDate, Allergies, Feet, Inches, Weight, Notes], (error, results) => {
            if (error) {
                console.error('Error inserting medical history:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Medical history inserted successfully', recordsID: results.insertId }));
        });
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
        pool.query('SELECT appointment.*, patient.FName AS PatientFirstName, patient.LName AS PatientLastName, staff.Fname AS StaffFirstName, staff.Lname AS StaffLastName FROM appointment JOIN patient ON appointment.patientID = patient.patientID LEFT JOIN staff ON appointment.staffID = staff.staffID WHERE appointment.dentistID = ?', [doctorId], (error, results) => {
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
        pool.query('SELECT appointment.*, patient.FName AS PatientFirstName, patient.LName AS PatientLastName, staff.Fname AS StaffFirstName, staff.Lname AS StaffLastName, dentist.FName AS DentistFirstName, dentist.LName AS DentistLastName FROM appointment LEFT JOIN patient ON appointment.patientID = patient.patientID LEFT JOIN staff ON appointment.staffID = staff.staffID LEFT JOIN dentist ON appointment.dentistID = dentist.dentistID WHERE appointment.staffID = ?', [staffId], (error, results) => {
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
        console.log(appointmentData);
        const { officeID, dentistID, staffID, patientFirstName, patientLastName, patientDOB, Date, Start_time, End_time, Appointment_Type, Appointment_Status, Cancellation_Reason, Specialist_Approval, Is_active } = appointmentData;

        const patientQuery = `
            SELECT patientID FROM patient 
            WHERE FName = ? AND LName = ? AND DOB = ?`;

        pool.query(patientQuery, [patientFirstName, patientLastName, patientDOB], (error, results) => {
            if (error) {
                console.error('Error querying patient:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }

            if (results.length === 0) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Patient not found' }));
                return;
            }

            const patientID = results[0].patientID;

            const query = `
                INSERT INTO appointment 
                (officeID, dentistID, staffID, patientID, Date, Start_time, End_time, Appointment_Type, Appointment_Status, Cancellation_Reason, Primary_Approval, Is_active) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            pool.query(query, [officeID, dentistID, staffID, patientID, Date, Start_time, End_time, Appointment_Type, Appointment_Status, Cancellation_Reason, Specialist_Approval, Is_active], (error, results) => {
                if (error) {
                    if (error.sqlState === '45000') {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Overlapping appointments detected. Please choose another time slot.' }));
                    } else {
                        console.error('Error inserting appointment:', error);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Internal Server Error' }));
                    }
                    return;
                }
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Appointment inserted successfully', appointmentID: results.insertId }));
            });
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
            const { patientFirstName, patientLastName, patientDOB } = requestData;

            pool.query(
                'SELECT COUNT(*) AS patientCount FROM patient WHERE FName = ? AND LName = ? AND DOB = ?',
                [patientFirstName, patientLastName, patientDOB],
                (error, results) => {
                    if (error) {
                        console.error('Error checking patient existence:', error);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Internal Server Error' }));
                        return;
                    }

                    const patientCount = results[0].patientCount;
                    if (patientCount > 0) {
                        pool.query(
                            'SELECT patientID FROM patient WHERE FName = ? AND LName = ? AND DOB = ?',
                            [patientFirstName, patientLastName, patientDOB],
                            (error, results) => {
                                if (error) {
                                    console.error('Error retrieving patientID:', error);
                                    res.writeHead(500, { 'Content-Type': 'application/json' });
                                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                                    return;
                                }
                                const patientID = results[0].patientID;
                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ patientExists: true, patientID }));
                            }
                        );
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ patientExists: false }));
                    }
                }
            );
        } catch (error) {
            console.error('Error parsing request body:', error);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Bad Request' }));
        }
    });
};

const updatePrimaryApproval = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        try {
            const appointmentData = JSON.parse(body);
            const { dentistID, patientID, Date, Start_time } = appointmentData;

            const query = `
                UPDATE appointment 
                SET Primary_Approval = 'Approved'
                WHERE dentistID = ? AND patientID = ? AND Date = ? AND Start_time = ?`;
            const queryParams = [dentistID, patientID, Date, Start_time];

            pool.query(query, queryParams, (error, results) => {
                if (error) {
                    console.error('Error updating primary approval:', error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Primary approval updated successfully' }));
            });
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

                                    netAmount = grossAmount - insuranceCoverage;
                                    grossAmount = parseFloat(grossAmount.toFixed(2));
                                    insuranceCoverage = parseFloat(insuranceCoverage.toFixed(2));
                                    netAmount = parseFloat(netAmount.toFixed(2));

                                    const currentDate = new Date().toISOString().split('T')[0];
                                    const query = 'INSERT INTO invoice (Policy_number, patientID, visitID, Date, Description, Gross_Amount, Insurance_coverage, Net_Amount, Paid_Amount, Is_paid, cleaning_discount_applied) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

                                    pool.query(
                                        query,
                                        [patientPolicyNumber, patientID, visitID, currentDate, appointmentType, grossAmount, insuranceCoverage, netAmount, 0, false, 0], 
                                        (error, results) => {
                                            if (error) {
                                                console.error('Error generating invoice:', error);
                                                res.writeHead(500, { 'Content-Type': 'application/json' });
                                                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                                                return;
                                            }

                                            const insertedInvoiceId = results.insertId;

                                            pool.query(
                                                'UPDATE invoice SET Net_Amount = ? WHERE invoiceID = ?',
                                                [grossAmount - insuranceCoverage + 20.00, insertedInvoiceId],
                                                (error, results) => {
                                                    if (error) {
                                                        console.error('Error updating invoice:', error);
                                                        res.writeHead(500, { 'Content-Type': 'application/json' });
                                                        res.end(JSON.stringify({ error: 'Internal Server Error' }));
                                                        return;
                                                    }

                                                    pool.query(
                                                        'SELECT * FROM invoice WHERE invoiceID = ?',
                                                        [insertedInvoiceId],
                                                        (error, results) => {
                                                            if (error) {
                                                                console.error('Error retrieving inserted invoice:', error);
                                                                res.writeHead(500, { 'Content-Type': 'application/json' });
                                                                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                                                                return;
                                                            }

                                                            const insertedInvoice = results[0];
                                                            let message = 'Invoice generated successfully';
                                                            if (requestData.cleaning_discount_applied) {
                                                                message += ' with cleaning discount';
                                                            }
                                                            res.writeHead(201, { 'Content-Type': 'application/json' });
                                                            res.end(JSON.stringify({ message: message, invoice: insertedInvoice, cleaning_discount_applied: requestData.cleaning_discount_applied }));
                                                        }
                                                    );
                                                }
                                            );
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

const getAvailableStaff = (req, res) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const requestData = JSON.parse(body);
            const { officeID, date, startTime, endTime } = requestData;

            const overlappingStaffQuery = `
                SELECT DISTINCT staffID
                FROM appointment
                WHERE officeID = ? 
                AND Date = ?
                AND Appointment_status <> 'Cancelled'
                AND ((Start_time >= ? AND Start_time < ?)
                OR (End_time > ? AND End_time <= ?)
                OR (Start_time <= ? AND End_time >= ?))
            `;

            const availableStaffQuery = `
                SELECT DISTINCT staff.staffID, staff.Fname, staff.Lname
                FROM staff
                LEFT JOIN appointment ON staff.staffID = appointment.staffID
                WHERE staff.officeID = ?
                AND staff.position = 'Hygienist'
                AND (appointment.staffID IS NULL OR (
                    appointment.Date != ?
                    OR NOT (
                        (appointment.Start_time >= ? AND appointment.Start_time < ?)
                        OR (appointment.End_time > ? AND appointment.End_time <= ?)
                        OR (appointment.Start_time <= ? AND appointment.End_time >= ?)
                    )
                ))
            `;

            const overlappingStaffResults = await pool.promise().query(overlappingStaffQuery, [officeID, date, startTime, endTime, startTime, endTime, startTime, endTime]);
            const availableStaffResults = await pool.promise().query(availableStaffQuery, [officeID, date, startTime, endTime, startTime, endTime, startTime, endTime]);

            const overlappingStaffIDs = overlappingStaffResults[0].map(row => row.staffID);
            const availableStaff = availableStaffResults[0];

            const filteredAvailableStaff = availableStaff.filter(staff => !overlappingStaffIDs.includes(staff.staffID));

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ availableStaff: filteredAvailableStaff }));
        } catch (error) {
            console.error('Error parsing request body:', error);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Bad Request' }));
        }
    });
};

const verifyPrimaryApproval = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        try {
            const requestData = JSON.parse(body);
            const { patientID, dentistID } = requestData;

            pool.query(
                'SELECT Specialty FROM dentist WHERE dentistID = ?',
                [dentistID],
                (error, results) => {
                    if (error) {
                        console.error('Error checking doctor specialty:', error);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Internal Server Error' }));
                        return;
                    }

                    const doctorSpecialty = results[0].Specialty;
                    console.log(doctorSpecialty);

                    if (doctorSpecialty !== 'Endodontist') {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ verified: false }));
                    } else {
                        pool.query(
                            'SELECT COUNT(*) AS approvedCount FROM appointment WHERE patientID = ? AND Primary_approval = "Approved"',
                            [patientID],
                            (error, results) => {
                                if (error) {
                                    console.error('Error checking primary approval:', error);
                                    res.writeHead(500, { 'Content-Type': 'application/json' });
                                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                                    return;
                                }

                                const approvedCount = results[0].approvedCount;
                                const verified = approvedCount > 0;

                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ verified }));
                            }
                        );
                    }
                }
            );
        } catch (error) {
            console.error('Error parsing request body:', error);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Bad Request' }));
        }
    });
};

const getSpecialtyByDoctorUsername = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { username } = decodedToken;

    pool.query('SELECT dentistID FROM login WHERE Username = ?', [username], (error, results) => {
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

        const doctorId = results[0].dentistID;
        pool.query('SELECT Specialty FROM dentist WHERE dentistID = ?', [doctorId], (error, results) => {
            if (error) {
                console.error('Error retrieving dentist specialty:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }

            if (results.length === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Dentist specialty not found' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results[0]));
        });
    });
};

const getProfileByDoctorUsername = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { username } = decodedToken;

    pool.query('SELECT dentistID FROM login WHERE Username = ?', [username], (error, results) => {
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

        const doctorId = results[0].dentistID;
        pool.query('SELECT * FROM dentist WHERE dentistID = ?', [doctorId], (error, results) => {
            if (error) {
                console.error('Error retrieving dentist profile:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }

            if (results.length === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Dentist profile not found' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results[0]));
        });
    });
};

const updateProfileByDoctorUsername = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { username } = decodedToken;

    pool.query('SELECT dentistID FROM login WHERE Username = ?', [username], (error, results) => {
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

        const dentistId = results[0].dentistID;

        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const profileData = JSON.parse(body);
            console.log(profileData);
            const { firstName, lastName, specialty, email, phoneNumber, address, dob, Start_date, End_date, Is_active, Salary } = profileData;
            
            const query = `
                UPDATE dentist 
                SET FName = ?, LName = ?, Specialty = ?, Email = ?, Phone_num = ?, Address = ?, DOB = ?, Start_date = ?, End_date = ?, Is_active = ?, Salary = ? 
                WHERE dentistID = ?`;

            pool.query(query, [firstName, lastName, specialty, email, phoneNumber, address, dob, Start_date, End_date, Is_active, Salary, dentistId], (error, results) => {
                if (error) {
                    console.error('Error updating dentist profile:', error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                    return;
                }
                if (results.affectedRows === 0) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Dentist profile not found' }));
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Dentist profile updated successfully' }));
            });
        });
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
    insertMedicalHistoryByPatientId,
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
    generateInvoice,
    updatePrimaryApproval,
    getAvailableStaff,
    verifyPrimaryApproval,
    getSpecialtyByDoctorUsername,
    getProfileByDoctorUsername,
    updateProfileByDoctorUsername
};