//dentistController.js
const pool = require('../models/db');
const { parse } = require('url');

const assignDentistSchedule = (officeID, dentistID, schedule, res) => {

    const { Monday, Tuesday, Wednesday, Thursday, Friday } = schedule;
    pool.query(
        'INSERT INTO schedule (officeID, dentistID, Monday, Tuesday, Wednesday, Thursday, Friday) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [officeID, dentistID, Monday, Tuesday, Wednesday, Thursday, Friday],
        (error, results) => {
            if (error) {
                console.error('Error assigning schedule to dentist at office:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            } else {
                console.log('Schedule assigned to dentist at office successfully');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Schedule assigned to dentist at office successfully' }));
            }
        }
    );

};

const getDentistsByOfficeAndDay = (req, res) => {

    const parsedUrl = parse(req.url, true);
    const { query } = parsedUrl;
    const { officeID, dayOfWeek } = query;

    const sqlQuery = `
        SELECT d.*
        FROM dentist d
        INNER JOIN office_dentist od ON d.dentistID = od.dentistID
        INNER JOIN schedule s ON d.dentistID = s.dentistID
        WHERE (od.officeID = ? OR ? IS NULL)
            AND (s.${dayOfWeek} = TRUE OR ? IS NULL)
            AND d.Specialty = 'General Dentistry';
    `;

    pool.query(sqlQuery, [officeID, officeID, dayOfWeek], (error, results) => {

        if (error) {
            console.error('Error fetching dentists:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        }

    });
    
};

const updateAppointmentWithStaff = (dentistID, patientID, date, startTime, staffID, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        connection.beginTransaction(err => {
            if (err) {
                console.error('Error starting transaction:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                connection.release();
                return;
            }

            connection.query(
                'UPDATE appointment SET staffID = ? WHERE dentistID = ? AND patientID = ? AND Date = ? AND Start_time = ?',
                [staffID, dentistID, patientID, date, startTime],
                (error, results) => {
                    if (error) {
                        console.error('Error updating appointment with staff member:', error);
                        connection.rollback(() => {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Internal Server Error' }));
                            connection.release();
                        });
                    } else {
                        console.log('Appointment updated with staff member successfully');
                        connection.commit(err => {
                            if (err) {
                                console.error('Error committing transaction:', err);
                                connection.rollback(() => {
                                    res.writeHead(500, { 'Content-Type': 'application/json' });
                                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                                    connection.release();
                                });
                            } else {
                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ message: 'Appointment updated with staff member successfully' }));
                                connection.release();
                            }
                        });
                    }
                }
            );
        });
    });
};

module.exports = { 
    assignDentistSchedule,
    getDentistsByOfficeAndDay,
    updateAppointmentWithStaff
};
