// adminRoutes.js
const { generateSalaryReport } = require('../controllers/adminController');

const handleGenerateSalaryReport = (req, res) => {

    const { url, method } = req;
    
    if (url.startsWith('/api/admin/salary-report') && method === 'GET') {
        const specialty = new URLSearchParams(url.split('?')[1]).get('specialty');
        generateSalaryReport(req, res, specialty);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
    
};

module.exports = {
    handleGenerateSalaryReport
};
