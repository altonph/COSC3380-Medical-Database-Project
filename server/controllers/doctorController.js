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
    getInformationByPatientId,
    updatePatientInformationByPatientId,
    insertVisitDetails
};