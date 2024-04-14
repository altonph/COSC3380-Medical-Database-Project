// adminController.js
const pool = require('../models/db');

const generateAppointmentDataReport = (req, res, office_id, start_date, end_date, status, specialty, appointmentType) => { // Add appointmentType parameter
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        // Create an array to store the conditions
        const conditions = [];
        const params = [];

        // Push conditions and parameters based on filters
        if (office_id) {
            conditions.push('a.officeID = ?');
            params.push(office_id);
        }
        if (start_date) {
            conditions.push('a.Date >= ?');
            params.push(start_date);
        }
        if (end_date) {
            conditions.push('a.Date <= ?');
            params.push(end_date);
        }
        if (status) {
            conditions.push('a.Appointment_status = ?');
            params.push(status);
        }
        if (specialty) {
            conditions.push('d.Specialty = ?');
            params.push(specialty);
        }
        if (appointmentType) { // Add condition for appointmentType
            conditions.push('a.Appointment_type = ?');
            params.push(appointmentType);
        }

        // Combine conditions into WHERE clause
        const whereClause = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

        const mainQuery = `
            SELECT 
                d.FName AS Dentist_FirstName,
                d.LName AS Dentist_LastName,
                a.Appointment_type,
                a.Start_time,
                a.End_time,
                a.Appointment_status,
                COUNT(*) AS Total_Appointments
            FROM 
                appointment a
            JOIN 
                dentist d ON a.dentistID = d.dentistID
            LEFT JOIN 
                office o ON a.officeID = o.officeID
            ${whereClause}
            GROUP BY
                d.FName,
                d.LName,
                a.Appointment_type,
                a.Start_time,
                a.End_time,
                a.Appointment_status;
        `;

        connection.query(mainQuery, params, (error, mainResults) => {
            if (error) {
                console.error('Error executing main query:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }

            connection.release(); // Release connection

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ mainResults }));
        });
    });
};

module.exports = {
    generateAppointmentDataReport
};