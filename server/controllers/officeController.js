// Import necessary modules
const pool = require('../models/db');

const getOfficeID = (req, res, officeAddress) => {
    pool.query(
        'SELECT officeID FROM office WHERE office_address = ?',
        [officeAddress],
        (error, results) => {
            if (error) {
                console.error('Error retrieving officeID:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }

            if (results.length === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Office not found' }));
                return;
            }

            const officeID = results[0].officeID;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ officeID }));
        }
    );
};

module.exports = { getOfficeID };
