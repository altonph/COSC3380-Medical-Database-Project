// Import necessary modules
const { assignDentistToOffice } = require('../controllers/officeController');

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
    handleAssignDentistToOffice
};
