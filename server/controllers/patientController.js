// patientController.js
const pool = require('../models/db');

const getPatientProfile = (req, res, patientID) => {
    pool.query('SELECT * FROM patient LEFT JOIN insurance ON patient.Policy_number = insurance.Policy_number WHERE patient.patientID = ?', [patientID], (error, results) => {
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

// edit variables
const updatePatientProfile = (req, res, patientID, updatedProfile) => {

    const { Policy_number, Insurance_Company_Name, Gender, FName, LName, DOB, Email, Phone_num, Address } = updatedProfile;

    // Assuming `pool` is the database connection pool
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

            // Update insurance information
            connection.query(
                'INSERT INTO insurance (Policy_number, Insurance_Company_Name) VALUES (?, ?) ON DUPLICATE KEY UPDATE Insurance_Company_Name = VALUES(Insurance_Company_Name)',
                [Policy_number, Insurance_Company_Name],
                (insuranceError, insuranceResults) => {
                    if (insuranceError) {
                        console.error('Error updating insurance information:', insuranceError);
                        connection.rollback(() => {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Internal Server Error' }));
                            connection.release();
                        });
                        return;
                    }

                    connection.query(
                        'UPDATE patient SET Policy_number = ?, Gender = ?, FName = ?, LName = ?, DOB = ?, Email = ?, Phone_num = ?, Address = ? WHERE patientID = ?',
                        [Policy_number, Gender, FName, LName, DOB, Email, Phone_num, Address, patientID],
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
                                res.end(JSON.stringify({ message: 'Patient profile and insurance information updated successfully' }));
                                connection.release();
                            });
                        }
                    );
                }
            );
        });
    });
};

const schedulePatientAppointment = (req, res, patientID, appointmentDetails) => {

    const { officeID, staffID, dentistID, Date, Start_time, End_time, Appointment_Type } = appointmentDetails;

    // Assuming `pool` is the database connection pool
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

module.exports = {
    getPatientProfile,
    updatePatientProfile,
    schedulePatientAppointment
};

