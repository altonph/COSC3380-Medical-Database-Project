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

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
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
    getAppointmentsByDoctorUsername
};