// adminController.js
const pool = require('../models/db');

const generateSalaryReport = (req, res, specialty) => {
    pool.query(
        specialty && specialty !== 'All' 
            ? 'SELECT FName, LName, Email, Start_date, Salary FROM dentist WHERE Specialty = ?'
            : 'SELECT FName, LName, Email, Start_date, Salary FROM dentist',
        specialty && specialty !== 'All' ? [specialty] : [],
        (error, rows) => {
            if (error) {
                console.error('Error generating salary report:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
        }
    );
};

module.exports = {
    generateSalaryReport
};
