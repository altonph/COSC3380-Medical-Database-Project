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

const generateDemographicReport = (req, res, office, startDate, endDate, ageGroup, gender, insuranceType) => {
    let sqlQuery = `
        SELECT 
            p.FName AS Patient_FirstName,
            p.LName AS Patient_lastName,
            p.Gender,
            TIMESTAMPDIFF(YEAR, p.DOB, CURDATE()) AS Age,
            p.Insurance_Company_Name AS InsuranceType,
            COUNT(*) AS TotalVisits,
        FROM patient p
        LEFT JOIN (
            SELECT 
                patientID,
            FROM visit_details
            GROUP BY patientID
        ) vd ON p.patientID = vd.patientID
        LEFT JOIN appointment a ON p.patientID = a.patientID
        LEFT JOIN invoice i ON vd.visitID = i.visitID`;

    const queryParams = [];

    if (office && office !== 'All') {
        sqlQuery += ` AND a.officeID = ?`;
        queryParams.push(office);
    }

    if (startDate && endDate) {
        sqlQuery += ` AND a.Date BETWEEN ? AND ?`;
        queryParams.push(startDate, endDate);
    }

    if (ageGroup && ageGroup !== 'All') {
        // Logic to filter patients by age group
        switch (ageGroup) {
            case '0-17':
                sqlQuery += ` AND TIMESTAMPDIFF(YEAR, p.DOB, CURDATE()) BETWEEN 0 AND 17`;
                break;
            case '18-35':
                sqlQuery += ` AND TIMESTAMPDIFF(YEAR, p.DOB, CURDATE()) BETWEEN 18 AND 35`;
                break;
            case '36-50':
                sqlQuery += ` AND TIMESTAMPDIFF(YEAR, p.DOB, CURDATE()) BETWEEN 36 AND 50`;
                break;
            case '51-65':
                sqlQuery += ` AND TIMESTAMPDIFF(YEAR, p.DOB, CURDATE()) BETWEEN 51 AND 65`;
                break;
            case '66+':
                sqlQuery += ` AND TIMESTAMPDIFF(YEAR, p.DOB, CURDATE()) >= 66`;
                break;
        }
    }
    

    if (gender && gender !== 'All') {
        sqlQuery += ` AND p.Gender = ?`;
        queryParams.push(gender);
    }

    if (insuranceType && insuranceType !== 'All') {
        sqlQuery += ` AND p.Insurance_Company_Name = ?`;
        queryParams.push(insuranceType);
    }

    sqlQuery += ` GROUP BY p.Patient_FirstName, p.Patient_LastName, p.Gender, Age, InsuranceType`;

    pool.query(sqlQuery, queryParams, (error, rows) => {
        if (error) {
            console.error('Error generating demographic report:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(rows));

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
            console.log('Fetched all schedule entries successfully');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        }
    });
};

module.exports = {
    generateRevenueReport,
    generateAppointmentDataReport,
    generateDemographicReport,
    getAllDentists,
    getAllPatients,
    getAllStaff,
    getAllOfficeDentists,
    getAllSchedules
};