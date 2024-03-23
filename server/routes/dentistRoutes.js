const { getDentistID } = require('../controllers/dentistController');

const dentistRoutes = (req, res) => {
    const { url, method } = req;

    if (method === 'GET' && url.startsWith('/api/dentist')) {
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

module.exports = dentistRoutes;
