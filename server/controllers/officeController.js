// Import necessary modules
const pool = require('../models/db');

// const getOfficeID = (req, res, officeAddress) => {

//     pool.query(
//         'SELECT officeID FROM office WHERE office_address = ?',
//         [officeAddress],
//         (error, results) => {
//             if (error) {
//                 console.error('Error retrieving officeID:', error);
//                 res.writeHead(500, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ error: 'Internal Server Error' }));
//                 return;
//             }

//             if (results.length === 0) {
//                 res.writeHead(404, { 'Content-Type': 'application/json' });
//                 res.end(JSON.stringify({ error: 'Office not found' }));
//                 return;
//             }

//             const officeID = results[0].officeID;
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify({ officeID }));
//         }
//     );
    
// };

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
    // getOfficeID,
    assignDentistToOffice
};
