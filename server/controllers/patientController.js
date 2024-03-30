// patientController.js
const pool = require('../models/db');

const getPatientProfile = (req, res, patientID) => {

    pool.query('SELECT * FROM patient WHERE patientID = ?', [patientID], (error, results) => {
        if (error) {
            console.error('Error retrieving patient profile:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        //console.log('Patient profile retrieved successfully:', results); // Debug statement

        if (results.length === 0) {
            //console.log('Patient not found'); // Debug statement
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Patient not found' }));
            return;
        }

        const patientProfile = results[0];
        //console.log('Patient profile:', patientProfile); // Debug statement
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(patientProfile));
    });
};

// edit variables
const updatePatientProfile = (req, res, patientID, updatedProfile) => {

    const { Gender, FName, LName, DOB, Email, Phone_num, Address } = updatedProfile;

    // Assuming `pool` is the database connection pool
    pool.query(
        'UPDATE patient SET Gender = ?, FName = ?, LName = ?, DOB = ?, Email = ?, Phone_num = ?, Address = ? WHERE patientID = ?',
        [Gender, FName, LName, DOB, Email, Phone_num, Address, patientID],
        (error, patientResults) => {
            if (error) {
                console.error('Error updating patient profile:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }
            
            // Update email in the login table
            pool.query(
                'UPDATE login SET Email = ? WHERE patientID = ?',
                [Email, patientID],
                (loginError, loginResults) => {
                    if (loginError) {
                        console.error('Error updating email in login table:', loginError);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Internal Server Error' }));
                        return;
                    }

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Patient profile updated successfully' }));
                }
            );
        }
    );
};

const schedulePatientAppointment = (req, res, patientID, appointmentDetails) => {

    const { officeID, staffID, dentistID, Date, Start_time, End_time, Appointment_Type } = appointmentDetails;
    //console.log(appointmentDetails);
    pool.query(
        'INSERT INTO appointment (officeID, dentistID, staffID, patientID, Date, Start_time, End_time, Appointment_Type, Appointment_Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [officeID, dentistID, staffID, patientID, Date, Start_time, End_time, Appointment_Type, 'Scheduled'],
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

