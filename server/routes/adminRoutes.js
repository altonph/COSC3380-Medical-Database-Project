// adminRoutes.js
const { generateAppointmentDataReport, generateRevenueReport, getAllDentists, getAllPatients, getAllStaff, getAllOfficeDentists, getAllSchedules, generateDemographicDataReport } = require('../controllers/adminController');
const url = require('url');

const handleGenerateAppointmentReport = (req, res) => {
    const { url: requestUrl, method } = req;

    if (requestUrl === '/api/admin/appointment-data-report' && method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString(); // convert Buffer to string
        });

        req.on('end', () => {
            const parsedBody = url.parse(`?${body}`, true).query;
            const { office_id, start_date, end_date, status, specialty, appointmentType } = parsedBody;
            generateAppointmentDataReport(req, res, office_id, start_date, end_date, status, specialty, appointmentType); // Pass appointmentType to controller
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

const handleGenerateRevenueReport = (req, res) => {
    const { url, method } = req;
    
    if (url.startsWith('/api/admin/finance-revenue-report') && method === 'GET'){
        const queryParamss = url.split('?');
        const queryParams = new URLSearchParams(queryParamss[1]);

        const office = queryParams.get('office');
        const type = queryParams.get('type');
        const startDate = queryParams.get('startDate');
        const endDate = queryParams.get('endDate');

        generateRevenueReport(req, res, office, type, startDate, endDate);

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
    
};



const handleGenerateDemographicReport = (req, res) => {
    const { url, method } = req;
    
    if (url.startsWith('/api/admin/demographic-data-report') && method === 'POST'){
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString(); // convert Buffer to string
        });

        req.on('end', () => {
            try {
                const filters = JSON.parse(body);
                generateDemographicDataReport(req, res, filters);
            } catch (error) {
                console.error('Error parsing request body:', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON format in request body' }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};


const handleGetAllDentists = (req, res) => {
    if (req.url === '/api/admin/getDentists' && req.method === 'GET') {
        getAllDentists(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

const handleGetAllPatients = (req, res) => {
    if (req.url === '/api/admin/getPatients' && req.method === 'GET') {
        getAllPatients(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

const handleGetAllStaff = (req, res) => {
    if (req.url === '/api/admin/getStaff' && req.method === 'GET') {
        getAllStaff(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

const handleGetAllOfficeDentists = (req, res) => {
    if (req.url === '/api/admin/getOfficeDentists' && req.method === 'GET') {
        getAllOfficeDentists(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

const handleGetAllSchedules = (req, res) => {
    if (req.url === '/api/admin/getSchedules' && req.method === 'GET') {
        getAllSchedules(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};


module.exports = {
    handleGenerateRevenueReport,
    handleGenerateAppointmentReport,
    handleGenerateDemographicReport,
    handleGetAllDentists,
    handleGetAllPatients,
    handleGetAllStaff,
    handleGetAllOfficeDentists,
    handleGetAllSchedules,
    handleGenerateDemographicReport
};