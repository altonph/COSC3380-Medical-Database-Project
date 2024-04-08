// Import necessary modules
const pool = require('../models/db');

const assignDentistToOffice = (officeID, dentistID, res) => {

    pool.query(
        'INSERT INTO office_dentist (officeID, dentistID) VALUES (?, ?)',
        [officeID, dentistID],
        (error, results) => {
            if (error) {
                console.error('Error assigning dentist to office:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            } else {
                console.log('Dentist assigned to office successfully');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Dentist assigned to office successfully' }));
            }
        }
    );

};

module.exports = { 
    assignDentistToOffice
};
