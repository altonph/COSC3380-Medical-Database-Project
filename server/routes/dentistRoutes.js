//dentistRoutes.js
const { getDentistID, getDentistsByOfficeID  } = require('../controllers/dentistController');

const handleGetDentistID = (req, res) => {
    const { url, method } = req;

    if (method === 'GET' && url.startsWith('/api/dentist/dentistID')) {

        const params = new URLSearchParams(url.split('?')[1]);
        const fName = params.get('FName');
        const lName = params.get('LName');

        if (!fName || !lName) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'First and last name are required' }));
            return;
        }

        getDentistID(req, res, fName, lName);

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }

};


const handleGetDentistByOfficeID = (req, res) => {
    const { url, method } = req;

    if (method === 'GET' && url.startsWith('/api/dentist/getDentistsByOfficeID')) {
        const params = new URLSearchParams(url.split('?')[1]);
        const officeID = params.get('officeID');

        if (!officeID) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Office ID is required' }));
            return;
        }

        getDentistsByOfficeID(req, res, officeID);

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }

};

module.exports = { 
    handleGetDentistID,
    handleGetDentistByOfficeID
};
