const pool = require('../models/db'); // Import the database connection pool

const reportController = {
    listStaffAssignments: async (req, res) => {
        try {
            // SQL query to list staff assignments and work hours
            const query = `
                SELECT s.staffID, s.Fname, s.Lname, a.Date, a.Start_time, a.End_time
                FROM staff s
                JOIN appointment a ON s.staffID = a.staffID
                WHERE a.Appointment_Status = 'Scheduled'
            `;
            const { rows } = await pool.query(query);

            // Send the list of staff assignments and work hours as response
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ assignments: rows }));
        } catch (error) {
            console.error('Error listing staff assignments:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
        }
    },

    calculateStaffEfficiency: async (req, res) => {
        try {
            // SQL query to calculate staff efficiency
            const query = `
                SELECT s.staffID, s.Fname, s.Lname, COUNT(a.appointmentID) AS Num_Appointments
                FROM staff s
                LEFT JOIN appointment a ON s.staffID = a.staffID
                WHERE a.Appointment_Status = 'Scheduled'
                GROUP BY s.staffID, s.Fname, s.Lname
            `;
            const { rows } = await pool.query(query);

            // Send the calculated staff efficiency as response
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ efficiency: rows }));
        } catch (error) {
            console.error('Error calculating staff efficiency:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
        }
    },

    workloadDistribution: async (req, res) => {
        try {
            // SQL query to analyze workload distribution
            const query = `
                SELECT s.staffID, s.Fname, s.Lname, COUNT(a.appointmentID) AS Num_Appointments
                FROM staff s
                LEFT JOIN appointment a ON s.staffID = a.staffID
                WHERE a.Appointment_Status = 'Scheduled'
                GROUP BY s.staffID, s.Fname, s.Lname
                ORDER BY Num_Appointments DESC
            `;
            const { rows } = await pool.query(query);

            // Send the workload distribution as response
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ distribution: rows }));
        } catch (error) {
            console.error('Error analyzing workload distribution:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
        }
    }
};

module.exports = reportController;
