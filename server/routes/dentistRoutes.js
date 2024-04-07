//dentistRoutes.js
const { assignDentistSchedule, getDentistsByOfficeAndDay, getDentistID } = require('../controllers/dentistController');
const { parse } = require('url');

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
    handleAssignDentistSchedule,
    handleGetDentistsByOfficeAndDay
};
