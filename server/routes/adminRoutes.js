// adminRoutes.js
const { generateAppointmentDataReport } = require('../controllers/adminController');

const handleGenerateAppointmentReport = (req, res) => {
    const { url, method } = req;

    if (url.startsWith('/api/admin/appointment-data-report') && method === 'GET') {
        const params = new URLSearchParams(url.split('?')[1]);
        const office_id = params.get('office_id');
        const start_date = params.get('start_date');
        const end_date = params.get('end_date');
        const status = params.get('status');
        const specialty = params.get('specialty');
        generateAppointmentDataReport(req, res, office_id, start_date, end_date, status, specialty);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

module.exports = {
    handleGenerateAppointmentReport
};
