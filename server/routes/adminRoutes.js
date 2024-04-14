// adminRoutes.js
const { generateAppointmentDataReport } = require('../controllers/adminController');
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

module.exports = {
    handleGenerateAppointmentReport
};