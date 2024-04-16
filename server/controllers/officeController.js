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
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        connection.beginTransaction(err => {
            if (err) {
                console.error('Error starting transaction:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                connection.release();
                return;
            }

            // Update the dentist's office locations
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

                    // Insert new office assignments
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
        });
    });
};

module.exports = { 
    assignDentistToOffice,
    updateDentistOffice
};
