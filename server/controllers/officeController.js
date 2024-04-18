// Import necessary modules
const pool = require('../models/db');

const assignDentistToOffice = (officeID, dentistID, res) => {

    pool.query(
        'INSERT INTO office_dentist (officeID, dentistID) VALUES (?, ?)',
        [officeID, dentistID],
        (error, results) => {
            if (error) {
                console.error('Error assigning dentist to office:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            } else {
                //console.log('Dentist assigned to office successfully');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Dentist assigned to office successfully' }));
            }
        }
    );

};

const updateDentistOffice = (dentistID, newOfficeIDs, res) => {
    // Validate newOfficeIDs to ensure they are valid office IDs
    // Implementation depends on your specific validation logic

    // Begin transaction to ensure data integrity
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

            // Delete existing office_dentist entries associated with the dentist
            connection.query(
                'DELETE FROM office_dentist WHERE dentistID = ?',
                [dentistID],
                (error, results) => {
                    if (error) {
                        console.error('Error deleting previous office assignments:', error);
                        connection.rollback(() => {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Internal Server Error' }));
                            connection.release();
                        });
                        return;
                    }

                    // Delete existing schedule entries associated with the dentist
                    connection.query(
                        'DELETE FROM schedule WHERE dentistID = ?',
                        [dentistID],
                        (error, results) => {
                            if (error) {
                                console.error('Error deleting previous schedules:', error);
                                connection.rollback(() => {
                                    res.writeHead(500, { 'Content-Type': 'application/json' });
                                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                                    connection.release();
                                });
                                return;
                            }

                            // Insert new office_dentist assignments
                            const values = newOfficeIDs.map(officeID => [officeID, dentistID]);
                            connection.query(
                                'INSERT INTO office_dentist (officeID, dentistID) VALUES ?',
                                [values],
                                (error, results) => {
                                    if (error) {
                                        console.error('Error assigning dentist to office:', error);
                                        connection.rollback(() => {
                                            res.writeHead(500, { 'Content-Type': 'application/json' });
                                            res.end(JSON.stringify({ error: 'Internal Server Error' }));
                                            connection.release();
                                        });
                                        return;
                                    }

                                    // If new offices include both, insert schedule for both offices
                                    if (newOfficeIDs.includes(1) && newOfficeIDs.includes(2)) {
                                        // Insert schedule for office 1 (Austin)
                                        connection.query(
                                            'INSERT INTO schedule (dentistID, officeID, Monday, Tuesday, Wednesday, Thursday, Friday) VALUES (?, ?, 0, 0, 0, 0, 0)',
                                            [dentistID, 1],
                                            (error, results) => {
                                                if (error) {
                                                    console.error('Error inserting schedule for office 1:', error);
                                                    connection.rollback(() => {
                                                        res.writeHead(500, { 'Content-Type': 'application/json' });
                                                        res.end(JSON.stringify({ error: 'Internal Server Error' }));
                                                        connection.release();
                                                    });
                                                    return;
                                                }
                                                // Insert schedule for office 2 (Phoenix)
                                                connection.query(
                                                    'INSERT INTO schedule (dentistID, officeID, Monday, Tuesday, Wednesday, Thursday, Friday) VALUES (?, ?, 0, 0, 0, 0, 0)',
                                                    [dentistID, 2],
                                                    (error, results) => {
                                                        if (error) {
                                                            console.error('Error inserting schedule for office 2:', error);
                                                            connection.rollback(() => {
                                                                res.writeHead(500, { 'Content-Type': 'application/json' });
                                                                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                                                                connection.release();
                                                            });
                                                            return;
                                                        }
                                                        // Commit transaction if successful
                                                        connection.commit(err => {
                                                            if (err) {
                                                                console.error('Error committing transaction:', err);
                                                                connection.rollback(() => {
                                                                    res.writeHead(500, { 'Content-Type': 'application/json' });
                                                                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                                                                    connection.release();
                                                                });
                                                                return;
                                                            }
                                                            //console.log('Dentist office updated successfully');
                                                            res.writeHead(200, { 'Content-Type': 'application/json' });
                                                            res.end(JSON.stringify({ message: 'Dentist assigned to office successfully' }));
                                                            // Release connection back to the pool
                                                            connection.release();
                                                        });
                                                    }
                                                );
                                            }
                                        );
                                    } else {
                                        // Insert schedule for the single selected office
                                        connection.query(
                                            'INSERT INTO schedule (dentistID, officeID, Monday, Tuesday, Wednesday, Thursday, Friday) VALUES (?, ?, 0, 0, 0, 0, 0)',
                                            [dentistID, newOfficeIDs[0]], // Assuming newOfficeIDs only contains one officeID
                                            (error, results) => {
                                                if (error) {
                                                    console.error('Error inserting schedule for the single office:', error);
                                                    connection.rollback(() => {
                                                        res.writeHead(500, { 'Content-Type': 'application/json' });
                                                        res.end(JSON.stringify({ error: 'Internal Server Error' }));
                                                        connection.release();
                                                    });
                                                    return;
                                                }
                                                // Commit transaction if successful
                                                connection.commit(err => {
                                                    if (err) {
                                                        console.error('Error committing transaction:', err);
                                                        connection.rollback(() => {
                                                            res.writeHead(500, { 'Content-Type': 'application/json' });
                                                            res.end(JSON.stringify({ error: 'Internal Server Error' }));
                                                            connection.release();
                                                        });
                                                        return;
                                                    }
                                                    //console.log('Dentist office updated successfully');
                                                    res.writeHead(200, { 'Content-Type': 'application/json' });
                                                    res.end(JSON.stringify({ message: 'Dentist assigned to office successfully' }));
                                                    // Release connection back to the pool
                                                    connection.release();
                                                });
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    );
                }
            );
        });
    });
};


module.exports = { 
    assignDentistToOffice,
    updateDentistOffice
};
