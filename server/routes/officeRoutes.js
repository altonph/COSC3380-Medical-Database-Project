// Import necessary modules
const { /*getOfficeID,*/ assignDentistToOffice } = require('../controllers/officeController');

// const handleGetOfficeID = (req, res) => {

//     const { url, method } = req;

//     if (method === 'GET' && url.startsWith('/api/officeID')) {
//         const params = new URLSearchParams(url.split('?')[1]);
//         const officeAddress = params.get('officeAddress');

//         if (!officeAddress) {
//             res.writeHead(400, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify({ error: 'Office address is required' }));
//             return;
//         }

//         getOfficeID(req, res, officeAddress);
//     } else {
//         res.writeHead(404, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ message: 'Route not found' }));
//     }

// };

// Define the route handler for assigning a dentist to an office
const handleAssignDentistToOffice = (req, res) => {

    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        try {
            const { officeID, dentistID } = JSON.parse(data);
            assignDentistToOffice(officeID, dentistID, res);

        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON data' }));
        }
    });
};


module.exports = {
    //handleGetOfficeID, 
    handleAssignDentistToOffice
};
