const pool = require('../models/db');

const getDentistID = (req, res, fName, lName) => {
    pool.query(
        'SELECT dentistID FROM dentist WHERE FName = ? AND LName = ?',
        [fName, lName],
        (error, results) => {
            if (error) {
                console.error('Error retrieving dentistID:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }

            if (results.length === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Dentist not found' }));
                return;
            }

            const dentistID = results[0].dentistID;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ dentistID }));
        }
    );
};

module.exports = { getDentistID };
