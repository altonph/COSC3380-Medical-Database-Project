//dentistController.js
const pool = require('../models/db');
const { parse } = require('url');

// const getDentistID = (req, res, fName, lName) => {
    
//     pool.query(
//         'SELECT dentistID FROM dentist WHERE FName = ? AND LName = ?',
//         [fName, lName],
//         (error, results) => {
//             if (error) {
//                 console.error('Error retrieving dentistID:', error);
//                 res.writeHead(500, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ error: 'Internal Server Error' }));
//                 return;
//             }

//             if (results.length === 0) {
//                 res.writeHead(404, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ error: 'Dentist not found' }));
//                 return;
//             }

//             const dentistID = results[0].dentistID;
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify({ dentistID }));
//         }
//     );

// };

// const getDentistsByOfficeID = (req, res, officeID) => {

//     pool.query(
//         'SELECT * FROM dentist WHERE officeID = ?',
//         [officeID],
//         (error, results) => {
//             if (error) {
//                 console.error('Error retrieving dentists:', error);
//                 res.writeHead(500, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ error: 'Internal Server Error' }));
//                 return;
//             }

//             if (results.length === 0) {
//                 res.writeHead(404, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ error: 'No dentists found for the given officeID' }));
//                 return;
//             }

//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify({ results }));
            
//         }
//     );
// };

const assignDentistSchedule = (officeID, dentistID, schedule, res) => {

    const { Monday, Tuesday, Wednesday, Thursday, Friday } = schedule;
    pool.query(
        'INSERT INTO schedule (officeID, dentistID, Monday, Tuesday, Wednesday, Thursday, Friday) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [officeID, dentistID, Monday, Tuesday, Wednesday, Thursday, Friday],
        (error, results) => {
            if (error) {
                console.error('Error assigning schedule to dentist at office:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            } else {
                console.log('Schedule assigned to dentist at office successfully');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Schedule assigned to dentist at office successfully' }));
            }
        }
    );

};

const getDentistsByOfficeAndDay = (req, res) => {

    const parsedUrl = parse(req.url, true);
    const { query } = parsedUrl;
    const { officeID, dayOfWeek } = query;

    const sqlQuery = `
        SELECT d.*
        FROM dentist d
        INNER JOIN office_dentist od ON d.dentistID = od.dentistID
        INNER JOIN schedule s ON d.dentistID = s.dentistID
        WHERE (od.officeID = ? OR ? IS NULL)
            AND (s.${dayOfWeek} = TRUE OR ? IS NULL)
            AND d.Specialty = 'General Dentistry';
    `;

    pool.query(sqlQuery, [officeID, officeID, dayOfWeek], (error, results) => {

        if (error) {
            console.error('Error fetching dentists:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        }

    });
    
};

module.exports = { 
    // getDentistsByOfficeID,
    // getDentistID,
    assignDentistSchedule,
    getDentistsByOfficeAndDay
};
