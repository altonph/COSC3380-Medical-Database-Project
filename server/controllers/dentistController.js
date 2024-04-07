//dentistController.js
const pool = require('../models/db');

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

module.exports = { 
    // getDentistsByOfficeID,
    // getDentistID,
    assignDentistSchedule
};
