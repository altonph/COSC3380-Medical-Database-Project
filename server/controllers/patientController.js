// patientController.js
const pool = require('../models/db');
const jwt = require('jsonwebtoken');

const getPatientProfile = (req, res, patientID) => {
    pool.query('SELECT * FROM patient WHERE patientID = ?', [patientID], (error, results) => {
        if (error) {
            console.error('Error retrieving patient profile:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        if (results.length === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Patient not found' }));
            return;
        }

        const patientProfile = results[0];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(patientProfile));
    });
};

const updatePatientProfile = (req, res, patientID, updatedProfile) => {
    const { Policy_number, Insurance_Company_Name, Gender, FName, LName, DOB, Email, Phone_num, Address } = updatedProfile;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        connection.beginTransaction(err => {
            if (err) {
                console.error('Error starting transaction:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                connection.release();
                return;
            }

            connection.query(
                'UPDATE patient SET Policy_number = ?, Insurance_Company_Name = ?, Gender = ?, FName = ?, LName = ?, DOB = ?, Email = ?, Phone_num = ?, Address = ? WHERE patientID = ?',
                [Policy_number, Insurance_Company_Name, Gender, FName, LName, DOB, Email, Phone_num, Address, patientID],
                (error, patientResults) => {
                    if (error) {
                        console.error('Error updating patient profile:', error);
                        connection.rollback(() => {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Internal Server Error' }));
                            connection.release();
                        });
                        return;
                    }

                    connection.commit(err => {
                        if (err) {
                            console.error('Error committing transaction:', err);
                            connection.rollback(() => {
                                res.writeHead(500, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                                connection.release();
                            });
                            return;
                        }

                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Patient profile updated successfully' }));
                        connection.release();
                    });
                }
            );
        });
    });
};


const schedulePatientAppointment = (req, res, patientID, appointmentDetails) => {

    const { officeID, staffID, dentistID, Date, Start_time, End_time, Appointment_Type } = appointmentDetails;

    pool.query(
        'INSERT INTO appointment (officeID, dentistID, staffID, patientID, Date, Start_time, End_time, Appointment_type, Appointment_status, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [officeID, dentistID, staffID, patientID, Date, Start_time, End_time, Appointment_Type, 'Scheduled', true],
        (error, results) => {
            if (error) {
                console.error('Error scheduling appointment:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Appointment scheduled successfully' }));
        }
    );

};

const getInvoicesByPatientUsername = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { username } = decodedToken;

    pool.query('SELECT patientID FROM login WHERE Username = ?', [username], (error, results) => {
        if (error) {
            console.error('Error retrieving patient ID:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        if (results.length === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Patient not found' }));
            return;
        }

        const patientId = results[0].patientID;
        const query = `
        SELECT 
        i.invoiceID,
        i.Policy_number,
        i.patientID,
        i.Date,
        i.Description,
        i.Gross_Amount,
        i.Insurance_coverage,
        i.Net_Amount,
        i.Paid_Amount,
        i.Is_paid,
        v.visitID,
        v.Date AS Visit_Date,
        v.Start_time AS Visit_Start_time,
        v.Diagnosis,
        v.Treatment,
        a.Appointment_type
    FROM 
        invoice AS i
    JOIN 
        visit_details AS v ON i.visitID = v.visitID
    JOIN 
        appointment AS a ON v.officeID = a.officeID 
            AND v.dentistID = a.dentistID 
            AND v.patientID = a.patientID 
            AND v.Date = a.Date 
            AND v.Start_time = a.Start_time
    WHERE 
        i.patientID = ?;`;

        pool.query(query, [patientId], (error, results) => {
            if (error) {
                console.error('Error retrieving invoices:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }

            if (results.length === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'No invoices found for this patient' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        });
    });
};

const getVisitDetailsByPatientUsername = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { username } = decodedToken;

    pool.query('SELECT patientID FROM login WHERE Username = ?', [username], (error, results) => {
        if (error) {
            console.error('Error retrieving patient ID:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        if (results.length === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Patient not found' }));
            return;
        }

        const patientId = results[0].patientID;
        const query = `
        SELECT 
        v.visitID,
        v.patientID,
        v.dentistID,
        v.officeID,
        v.Date,
        v.Start_time,
        v.Diagnosis,
        v.Treatment,
        v.Notes,
        a.staffID,
        a.Appointment_type,
        d.FName AS Dentist_FirstName,
        d.LName AS Dentist_LastName,
        s.Fname AS Staff_FirstName,
        s.Lname AS Staff_LastName
    FROM 
        visit_details AS v
    JOIN 
        appointment AS a ON v.dentistID = a.dentistID 
                         AND v.patientID = a.patientID 
                         AND v.Date = a.Date 
                         AND v.Start_time = a.Start_time
    JOIN 
        staff AS s ON a.staffID = s.staffID
    JOIN 
        dentist AS d ON v.dentistID = d.dentistID
    WHERE 
        v.patientID = ?;
    `;

        pool.query(query, [patientId], (error, results) => {
            if (error) {
                console.error('Error retrieving visit details:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }

            if (results.length === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'No visit details found for this patient' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        });
    });
};

module.exports = {
    getPatientProfile,
    updatePatientProfile,
    schedulePatientAppointment,
    getInvoicesByPatientUsername,
    getVisitDetailsByPatientUsername
};

