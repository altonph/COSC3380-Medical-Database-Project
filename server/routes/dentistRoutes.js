//dentistRoutes.js
const { assignDentistSchedule, getDentistsByOfficeAndDay, getDentistID } = require('../controllers/dentistController');
const { parse } = require('url');

// const handleGetDentistID = (req, res) => {
//     const { url, method } = req;

//     if (method === 'GET' && url.startsWith('/api/dentist/dentistID')) {

//         const params = new URLSearchParams(url.split('?')[1]);
//         const fName = params.get('FName');
//         const lName = params.get('LName');

//         if (!fName || !lName) {
//             res.writeHead(400, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify({ error: 'First and last name are required' }));
//             return;
//         }

//         getDentistID(req, res, fName, lName);

//     } else {
//         res.writeHead(404, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ message: 'Route not found' }));
//     }

// };


// const handleGetDentistByOfficeID = (req, res) => {
//     const { url, method } = req;

//     if (method === 'GET' && url.startsWith('/api/dentist/getDentistsByOfficeID')) {
//         const params = new URLSearchParams(url.split('?')[1]);
//         const officeID = params.get('officeID');

//         if (!officeID) {
//             res.writeHead(400, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify({ error: 'Office ID is required' }));
//             return;
//         }

//         getDentistsByOfficeID(req, res, officeID);

//     } else {
//         res.writeHead(404, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ message: 'Route not found' }));
//     }

// };

const handleAssignDentistSchedule = (req, res) => {

    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        try {
            const { officeID, dentistID, schedule } = JSON.parse(data);
            assignDentistSchedule(officeID, dentistID, schedule, res); // Pass 'res' to handle response
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON data' }));
        }
    });

};

const handleGetDentistsByOfficeAndDay = (req, res) => {

    const { url, method } = req;

    const { query } = parse(url, true);

    if (url.startsWith('/api/dentist/getDentist') && method === 'GET') {

        const { officeID, dayOfWeek } = query;
        
        if (!officeID || !dayOfWeek) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'officeID and day are required query parameters' }));
            return;
        }

        getDentistsByOfficeAndDay(req, res, officeID, dayOfWeek);

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
    
};

module.exports = { 
    // handleGetDentistID,
    // handleGetDentistByOfficeID
    handleAssignDentistSchedule,
    handleGetDentistsByOfficeAndDay
};
