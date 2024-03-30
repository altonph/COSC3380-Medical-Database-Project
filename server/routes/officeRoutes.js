// Import necessary modules
const { getOfficeID } = require('../controllers/officeController');

const handleGetOfficeID = (req, res) => {

    const { url, method } = req;

    if (method === 'GET' && url.startsWith('/api/officeID')) {
        const params = new URLSearchParams(url.split('?')[1]);
        const officeAddress = params.get('officeAddress');

        if (!officeAddress) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Office address is required' }));
            return;
        }

        getOfficeID(req, res, officeAddress);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }

};

module.exports = handleGetOfficeID ;
