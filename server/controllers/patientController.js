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

module.exports = {
    getPatientProfile,
};
