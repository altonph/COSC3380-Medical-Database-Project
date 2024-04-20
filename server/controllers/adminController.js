// adminController.js
const pool = require('../models/db');

const generateAppointmentDataReport = (req, res, office_id, start_date, end_date, status, specialty, appointmentType) => {
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
        if (appointmentType) {
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
                a.Date AS Appointment_Date,
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
                a.Date,
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


const generateRevenueReport = (req, res, office, type, startDate, endDate) => {
    let sqlQuery = `
        SELECT 
            a.Appointment_Type,
            a.Date,
            d.FName AS Dentist_FirstName,
            d.LName AS Dentist_LastName,
            p.FName AS Patient_FirstName,
            p.LName AS Patient_LastName,
            i.Gross_Amount
        FROM appointment a
        JOIN visit_details vd ON a.patientID = vd.patientID
        JOIN invoice i ON vd.visitID = i.visitID
        JOIN dentist d ON a.dentistID = d.dentistID
        JOIN patient p ON a.patientID = p.patientID`;

    const queryParams = [];

    if (office && office !== 'All') {
        sqlQuery += ` AND a.officeID = ?`;
        queryParams.push(office);
    }

    if (startDate && endDate) {
        sqlQuery += ` AND a.Date BETWEEN ? AND ?`;
        queryParams.push(startDate, endDate);
    }

    if (type && type !== 'All') {
        sqlQuery += ` AND a.Appointment_Type = ?`;
        queryParams.push(type);
    }

    sqlQuery += ` ORDER BY a.Appointment_Type`;

    pool.query(sqlQuery, queryParams, (error, rows) => {
        if (error) {
            console.error('Error generating revenue report:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(rows));

    });
};

const generateDemographicDataReport = (req, res, office, startDate, endDate, gender, insuranceType) => {
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
        if (office) {
            conditions.push('appt.officeID = ?');
            params.push(office);
        }
        if (startDate) {
            conditions.push('appt.Date >= ?');
            params.push(startDate);
        }
        if (endDate) {
            conditions.push('appt.Date <= ?');
            params.push(endDate);
        }
        if (gender) {
            conditions.push('p.Gender = ?');
            params.push(gender);
        }
        if (insuranceType) {
            conditions.push('p.Insurance_Company_Name = ?');
            params.push(insuranceType);
        }

        // Combine conditions into WHERE clause
        const whereClause = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
        
        const mainQuery = `
        SELECT
            FName,
            LName,
            Gender,
            YEAR(p.DOB) AS Birth_Year,
            TIMESTAMPDIFF(YEAR, p.DOB, CURDATE()) AS Age,
            Insurance_Company_Name,
            COUNT(DISTINCT p.patientID) AS Total_Patients,
            COUNT(DISTINCT CASE WHEN appt.Appointment_status = 'Scheduled' THEN p.patientID END) AS Scheduled_Appointments,
            COUNT(DISTINCT CASE WHEN appt.Appointment_status = 'Completed' THEN p.patientID END) AS Completed_Appointments
        FROM
            patient p
        LEFT JOIN
            appointment appt ON p.patientID = appt.patientID
        ${whereClause}
        GROUP BY
            FName,
            LName,
            Gender,
            Birth_Year,
            Age,
            Insurance_Company_Name
        ORDER BY
            Birth_Year DESC;
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



function getAllDentists(res) {
    pool.query(
        'SELECT * FROM dentist',
        (error, results) => {
            if (error) {
                console.error('Error fetching dentist information:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error fetching dentist information' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        }
    );
}

function getAllPatients(res) {
    pool.query(
        'SELECT * FROM patient',
        (error, results) => {
            if (error) {
                console.error('Error fetching dentist information:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error fetching patient information' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        }
    );
}

function getAllStaff(res) {
    pool.query(
        'SELECT * FROM staff',
        (error, results) => {
            if (error) {
                console.error('Error fetching staff information:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error fetching staff information' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        }
    );
}

const getAllOfficeDentists = (res) => {
    pool.query('SELECT * FROM office_dentist', (error, results) => {
        if (error) {
            console.error('Error fetching office_dentist entries:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Error fetching staff information' }));
        } else {
            //console.log('Fetched all office_dentist entries successfully');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        }
    });
};

const getAllSchedules = (res) => {
    pool.query('SELECT * FROM schedule', (error, results) => {
        if (error) {
            console.error('Error fetching schedule entries:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Error fetching staff information' }));
        } else {
            //console.log('Fetched all schedule entries successfully');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        }
    });
};



module.exports = {
    generateRevenueReport,
    generateAppointmentDataReport,
    getAllDentists,
    getAllPatients,
    getAllStaff,
    getAllOfficeDentists,
    getAllSchedules,
    generateDemographicDataReport
};