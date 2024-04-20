//dentistRoutes.js
const { assignDentistSchedule, getDentistsByOfficeAndDay, getAllDentistsByOfficeAndDay, updateAppointmentWithStaff, getAvailableTimeBlocks, getAvailableStaff, editDentistSchedule } = require('../controllers/dentistController');
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

const handleEditDentistSchedule = (req, res) => {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        try {
            const { dentistID, officeID, schedule } = JSON.parse(data);
            editDentistSchedule({ body: { dentistID, officeID, schedule } }, res); // Call the controller function
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON data' }));
            return;
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

const handleGetAllDentistsByOfficeAndDay = (req, res) => {
    const { url, method } = req;
    const parsedUrl = parse(url, true);
    const { query } = parsedUrl;

    if (method === 'GET' && parsedUrl.pathname === '/api/dentist/getAllDentistsByOfficeAndDay') {
        const { officeID, dayOfWeek } = query;

        if (!officeID || !dayOfWeek) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'officeID and dayOfWeek are required query parameters' }));
            return;
        }

        getAllDentistsByOfficeAndDay(req, res, officeID, dayOfWeek);

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};


const handleUpdateAppointmentWithStaff = (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { query } = parsedUrl;

    if (req.method === 'PATCH' && parsedUrl.pathname === '/api/dentist/updateAppointmentWithStaff') {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {
            try {
                const { dentistID, patientID, Date, Start_time, staffID } = JSON.parse(data);
                updateAppointmentWithStaff(dentistID, patientID, Date, Start_time, staffID, res);
            } catch (error) {
                console.error('Error parsing JSON data:', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON data' }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

const handleGetAvailableTimeBlocks = (req, res) => {
    const { url, method } = req;
    const parsedUrl = parse(url, true);
    const { query } = parsedUrl;

    if (method === 'GET' && parsedUrl.pathname === '/api/dentist/getAvailableTimeBlocks') {
        const { dentistID, date } = query;

        if (!dentistID || !date) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'dentistID and date are required query parameters' }));
            return;
        }

        getAvailableTimeBlocks(parseInt(dentistID), date, (error, availableTimeBlocks) => {
            if (error) {
                console.error('Error fetching available time blocks:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(availableTimeBlocks));
            }
        });

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

const handleGetAvailableStaff = (req, res) => {
    if (req.method === 'GET' && req.url === '/api/dentist/getAvailableStaff') {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {
            try {
                const requestData = JSON.parse(data);
                getAvailableStaff(requestData, res);
            } catch (error) {
                console.error('Error parsing JSON data:', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON data' }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

module.exports = { 
    handleAssignDentistSchedule,
    handleGetDentistsByOfficeAndDay,
    handleUpdateAppointmentWithStaff,
    handleGetAvailableTimeBlocks,
    handleGetAvailableStaff,
    handleGetAllDentistsByOfficeAndDay,
    handleEditDentistSchedule
};
