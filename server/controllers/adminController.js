// adminController.js
const pool = require('../models/db');

const generateAppointmentDataReport = (req, res, office_id, start_date, end_date, status, specialty) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        connection.beginTransaction(error => {
            if (error) {
                console.error('Error beginning transaction:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }

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
                WHERE 
                    (${office_id ? 'a.officeID = ?' : '1'})
                    AND (${start_date ? 'a.Date >= ?' : '1'})
                    AND (${end_date ? 'a.Date <= ?' : '1'})
                    AND (${status ? 'a.Appointment_status = ?' : '1'})
                    AND (${specialty ? 'd.Specialty = ?' : '1'})
                GROUP BY
                    d.FName,
                    d.LName,
                    a.Appointment_type,
                    a.Start_time,
                    a.End_time,
                    a.Appointment_status;
            `;

            const percentageQuery = `
                SELECT 
                    CONCAT(ROUND((SUM(CASE WHEN a.Appointment_status = 'Scheduled' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2), '%') AS Percentage_of_Scheduled_Appointments,
                    CONCAT(ROUND((SUM(CASE WHEN a.Appointment_status = 'Cancelled' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2), '%') AS Percentage_of_Cancelled_Appointments,
                    CONCAT(ROUND((SUM(CASE WHEN a.Appointment_status = 'Completed' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2), '%') AS Percentage_of_Completed_Appointments
                FROM 
                    appointment a
                JOIN 
                    dentist d ON a.dentistID = d.dentistID
                LEFT JOIN 
                    office o ON a.officeID = o.officeID
                WHERE 
                    (${office_id ? 'a.officeID = ?' : '1'})
                    AND (${start_date ? 'a.Date >= ?' : '1'})
                    AND (${end_date ? 'a.Date <= ?' : '1'})
                    AND (${status ? 'a.Appointment_status = ?' : '1'})
                    AND (${specialty ? 'd.Specialty = ?' : '1'});
            `;

            connection.query(mainQuery, [office_id, start_date, end_date, status, specialty], (error, mainResults) => {
                if (error) {
                    return connection.rollback(() => {
                        console.error('Error executing main query:', error);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Internal Server Error' }));
                    });
                }

                connection.query(percentageQuery, [office_id, start_date, end_date, status, specialty], (error, percentageResults) => {
                    if (error) {
                        return connection.rollback(() => {
                            console.error('Error executing percentage query:', error);
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Internal Server Error' }));
                        });
                    }

                    connection.commit(error => {
                        if (error) {
                            return connection.rollback(() => {
                                console.error('Error committing transaction:', error);
                                res.writeHead(500, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                            });
                        }

                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ mainResults, percentageResults }));
                    });
                });
            });
        });
    });
};

module.exports = {
    generateAppointmentDataReport
};
