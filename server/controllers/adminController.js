// adminController.js
const pool = require('../models/db'); // Import the database connection pool
const reportController = require('./reportController'); // Import reportController

const adminController = {
    generateReport: async (req, res, reportType, startDate, endDate) => {
        try {
            const { reportType, startDate, endDate } = req.query;
            let reportData = null;

            // Determine which report function to call based on the reportType
            switch (reportType) {
                case 'List Staff Assignments':
                    reportData = await reportController.listStaffAssignments(req, res);
                    break;
                case 'Calculate Staff Efficiency':
                    reportData = await reportController.calculateStaffEfficiency(req, res);
                    break;
                case 'Workload Distribution':
                    reportData = await reportController.workloadDistribution(req, res);
                    break;
                default:
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid report type' }));
                    return;
            }

            // Send the report data as response
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ report: reportData }));
        } catch (error) {
            console.error('Error generating report:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
        }
    }
};

module.exports = adminController;
