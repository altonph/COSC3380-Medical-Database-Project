const pool = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function registerPatient(userData, res) {
    bcrypt.hash(userData.Password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            res.writeHead(500);
            res.end('Error hashing password');
            return;
        }

        pool.query(
            'INSERT INTO patient (Policy_number, Insurance_Company_Name, Gender, FName, LName, DOB, Email, Phone_num, Address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                userData.Policy_number,
                userData.Insurance_Company_Name,
                userData.Gender,
                userData.FName,
                userData.LName,
                userData.DOB,
                userData.Email,
                userData.Phone_num,
                userData.Address
            ],
            (error, patientResults) => {
                if (error) {
                    console.error('Error creating patient:', error);
                    res.writeHead(500);
                    res.end('Error creating patient');
                    return;
                }

                const patientID = patientResults.insertId;

                pool.query(
                    'INSERT INTO login (Username, Password, User_role, Email, PatientID) VALUES (?, ?, ?, ?, ?)',
                    [userData.Username, hashedPassword, userData.User_role, userData.Email, patientID],
                    (error, loginResults) => {
                        if (error) {
                            console.error('Error registering user:', error);
                            res.writeHead(500);
                            res.end('Error registering user');
                        } else {
                            res.writeHead(200);
                            res.end('User registered successfully');
                        }
                    }
                );
            }
        );
    });
}


function registerDoctor(userData, res) {
    bcrypt.hash(userData.Password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            res.writeHead(500);
            res.end('Error hashing password');
            return;
        }
        pool.query('INSERT INTO dentist (FName, LName, Specialty, Email, Phone_num, Address, DOB, Start_date, End_date, Is_active, Salary) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [userData.FName, userData.LName, userData.Specialty, userData.Email, userData.Phone_num, userData.Address, userData.DOB, userData.Start_date, userData.End_Date, userData.Is_active, userData.Salary],
            (error, results) => {
                if (error) {
                    console.error('Error creating doctor:', error);
                    res.writeHead(500);
                    res.end('Error creating doctor');
                    return;
                }
                
                const doctorID = results.insertId;

                pool.query('INSERT INTO login (Username, Password, User_role, Email, patientID, dentistID, staffID) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [userData.Username, hashedPassword, 'Dentist', userData.Email, userData.patientID, doctorID, userData.staffID],
                    (error, results) => {
                        if (error) {
                            console.error('Error registering doctor:', error);
                            res.writeHead(500);
                            res.end('Error registering doctor');
                        } else {
                            res.writeHead(200);
                            res.end('Doctor registered successfully');
                        }
                    });
            });
    });
}


function registerAdmin(userData, res) {

    bcrypt.hash(userData.Password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            res.writeHead(500);
            res.end('Error hashing password');
            return;
        }

        pool.query('INSERT INTO dentist (FName, LName, Specialty, Email, Phone_num, Address, DOB, Start_date, End_date, Is_active, Salary) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [userData.FName, userData.LName, userData.Specialty, userData.Email, userData.Phone_num, userData.Address, userData.DOB, userData.Start_date, userData.End_date, userData.Is_active, userData.Salary],
            (error, results) => {
                if (error) {
                    console.error('Error creating admin:', error);
                    res.writeHead(500);
                    res.end('Error creating admin');
                    return;
                }
                
                const dentistID = results.insertId;

                pool.query('INSERT INTO login (Username, Password, User_role, Email, dentistID) VALUES (?, ?, ?, ?, ?)',
                    [userData.Username, hashedPassword, userData.User_role, userData.Email, dentistID],
                    (error, results) => {
                        if (error) {
                            console.error('Error registering admin:', error);
                            res.writeHead(500);
                            res.end('Error registering admin');
                        } else {
                            res.writeHead(200);
                            res.end('Admin registered successfully');
                        }
                    });
            });
    });

}

function registerStaff(userData, res) {
    bcrypt.hash(userData.Password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            res.writeHead(500);
            res.end('Error hashing password');
            return;
        }

        pool.query('INSERT INTO staff (officeID, FName, LName, Email, Phone_num, DOB, Address, Position, Start_date, End_date, Is_active, Salary) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [userData.officeID, userData.Fname, userData.Lname, userData.Email, userData.Phone_num, userData.DOB, userData.Address, userData.Position, userData.Start_date, userData.End_date, userData.Is_active, userData.Salary],
            (error, results) => {
                if (error) {
                    console.error('Error creating staff member:', error);
                    res.writeHead(500);
                    res.end('Error creating staff member');
                    return;
                }

                const staffID = results.insertId;

                pool.query('INSERT INTO login (Username, Password, User_role, Email, staffID) VALUES (?, ?, ?, ?, ?)',
                    [userData.Username, hashedPassword, 'Staff', userData.Email, staffID],
                    (error, results) => {
                        if (error) {
                            console.error('Error registering staff member:', error);
                            res.writeHead(500);
                            res.end('Error registering staff member');
                        } else {
                            res.writeHead(200);
                            res.end('Staff member registered successfully');
                        }
                    });
            });
    });
}

function loginPatient(username, password, res, jwt) {

    pool.query(
        'SELECT login.*, patient.FName, patient.LName FROM login JOIN patient ON login.patientID = patient.patientID WHERE login.Username = ?',
        [username],
        async (error, results) => {

            if (error) {
                console.error('Error retrieving user:', error);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

            if (results.length === 0) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('User not found');
                return;
            }

            const user = results[0];

            bcrypt.compare(password, user.Password, (err, result) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }

                if (result) {
                    if (user.User_role !== 'Patient') {
                        res.writeHead(403, { 'Content-Type': 'text/plain' });
                        res.end('Forbidden');
                        return;
                    }
                    
                    const token = jwt.sign({ 
                        username: user.Username, 
                        role: user.User_role, 
                        firstName: user.FName, 
                        lastName: user.LName,
                        patientID: user.patientID
                    }, process.env.JWT_SECRET, { expiresIn: '2h' });

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ token, role: user.User_role, firstName: user.FName, lastName: user.LName, patientID: user.patientID }));
                } else {
                    res.writeHead(401, { 'Content-Type': 'text/plain' });
                    res.end('Incorrect password');
                }
            });
        }
    );

}

function loginDoctor(username, password, res, jwt) {
    pool.query(
        'SELECT login.*, dentist.FName, dentist.LName FROM login JOIN dentist ON login.dentistID = dentist.dentistID WHERE login.Username = ?',
        [username],
        async (error, results) => {
            if (error) {
                console.error('Error retrieving doctor:', error);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

            if (results.length === 0) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Doctor not found');
                return;
            }

            const doctor = results[0];
            const doctorId = doctor.DentistID;
            const doctorSpecialty = doctor.Specialty;

            bcrypt.compare(password, doctor.Password, (err, result) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }

                if (result) {
                    if (doctor.User_role !== 'Dentist') {
                        res.writeHead(403, { 'Content-Type': 'text/plain' });
                        res.end('Forbidden');
                        return;
                    }
                    const token = jwt.sign({ 
                        doctorId, 
                        username: doctor.Username, 
                        role: doctor.User_role,
                        specialty: doctorSpecialty
                    }, process.env.JWT_SECRET, { expiresIn: '2h' });                
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({token, role: doctor.User_role, specialty: doctor.Specialty, firstName: doctor.FName, lastName: doctor.LName})); 
                } else {
                    res.writeHead(401, { 'Content-Type': 'text/plain' });
                    res.end('Incorrect password');
                }
            });
        }
    );
}


function loginAdmin(username, password, res, jwt) {

    pool.query('SELECT login.*, dentist.FName, dentist.LName FROM login JOIN dentist ON login.dentistID = dentist.dentistID WHERE login.Username = ?', [username], async (error, results) => {
        if (error) {
            console.error('Error retrieving admin:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Admin not found');
            return;
        }

        const admin = results[0];
        bcrypt.compare(password, admin.Password, (err, result) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

            if (result) {
                if (admin.User_role !== 'Admin') {
                    res.writeHead(403, { 'Content-Type': 'text/plain' });
                    res.end('Forbidden');
                    return;
                }
                const token = jwt.sign({ 
                    username: admin.Username, 
                    role: admin.User_role,
                    isAdmin: admin.User_role === 'Admin' // Check if the user is an admin
                }, process.env.JWT_SECRET, { expiresIn: '2h' });                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ token, role: admin.User_role, firstName: admin.FName, lastName: admin.LName })); // Include the role in the response
            } else {
                res.writeHead(401, { 'Content-Type': 'text/plain' });
                res.end('Incorrect password');
            }
        });
    });

}

function loginStaff(username, password, res, jwt) {
    pool.query(
        'SELECT login.*, staff.FName, staff.LName FROM login JOIN staff ON login.staffID = staff.staffID WHERE login.Username = ?',
        [username],
        async (error, results) => {
            if (error) {
                console.error('Error retrieving staff member:', error);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

            if (results.length === 0) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Staff member not found');
                return;
            }

            const staff = results[0];

            bcrypt.compare(password, staff.Password, (err, result) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }

                if (result) {
                    if (staff.User_role !== 'Staff') {
                        res.writeHead(403, { 'Content-Type': 'text/plain' });
                        res.end('Forbidden');
                        return;
                    }

                    const token = jwt.sign({ 
                        username: staff.Username, 
                        role: staff.User_role,
                        firstName: staff.FName, 
                        lastName: staff.LName,
                        staffID: staff.staffID
                    }, process.env.JWT_SECRET, { expiresIn: '2h' });

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ token, role: staff.User_role, staffID: staff.staffID, firstName: staff.FName, lastName: staff.LName }));
                } else {
                    res.writeHead(401, { 'Content-Type': 'text/plain' });
                    res.end('Incorrect password');
                }
            });
        }
    );
}

function editDentist(dentistID, userData, res) {
    pool.query(
        'UPDATE dentist SET FName = ?, LName = ?, Specialty = ?, Email = ?, Phone_num = ?, Address = ?, DOB = ?, Salary = ? WHERE dentistID = ?',
        [userData.FName, userData.LName, userData.Specialty, userData.Email, userData.Phone_num, userData.Address, userData.DOB, userData.Salary, dentistID],
        (error, results) => {
            if (error) {
                console.error('Error updating dentist information:', error);
                res.writeHead(500);
                res.end('Error updating dentist information');
                return;
            }

            pool.query(
                'UPDATE login SET Email = ? WHERE dentistID = ?',
                [userData.Email, dentistID],
                (error, results) => {
                    if (error) {
                        console.error('Error updating email in login table:', error);
                        res.writeHead(500);
                        res.end('Error updating email in login table');
                        return;
                    }

                    // Check if there are updates for username and password
                    if (userData.Username && userData.Password) {
                        // Hash the new password
                        bcrypt.hash(userData.Password, 10, (err, hashedPassword) => {
                            if (err) {
                                console.error('Error hashing password:', err);
                                res.writeHead(500);
                                res.end('Error hashing password');
                                return;
                            }
                            
                            // Update username and hashed password in the login table
                            pool.query(
                                'UPDATE login SET Username = ?, Password = ? WHERE dentistID = ?',
                                [userData.Username, hashedPassword, dentistID],
                                (error, results) => {
                                    if (error) {
                                        console.error('Error updating username and password in login table:', error);
                                        res.writeHead(500);
                                        res.end('Error updating username and password in login table');
                                        return;
                                    }

                                    res.writeHead(200);
                                    res.end('Dentist information updated successfully');
                                }
                            );
                        });
                    } else {
                        res.writeHead(200);
                        res.end('Dentist information updated successfully');
                    }
                }
            );
        }
    );
}

function editStaff(staffID, userData, res) {
    // Update staff table
    pool.query(
        'UPDATE staff SET officeID = ?, Fname = ?, Lname = ?, Email = ?, Phone_num = ?, Address = ?, DOB = ?, Position = ?, Start_date = ?, Salary = ? WHERE staffID = ?',
        [userData.officeID, userData.Fname, userData.Lname, userData.Email, userData.Phone_num, userData.Address, userData.DOB, userData.Position, userData.Start_date, userData.Salary, staffID],
        (error, results) => {
            if (error) {
                console.error('Error updating staff information:', error);
                res.writeHead(500);
                res.end('Error updating staff information');
                return;
            }

            pool.query(
                'UPDATE login SET Email = ? WHERE staffID = ?',
                [userData.Email, staffID],
                (error, results) => {
                    if (error) {
                        console.error('Error updating email in login table:', error);
                        res.writeHead(500);
                        res.end('Error updating email in login table');
                        return;
                    }

                    if (userData.Username && userData.Password) {

                        bcrypt.hash(userData.Password, 10, (err, hashedPassword) => {
                            if (err) {
                                console.error('Error hashing password:', err);
                                res.writeHead(500);
                                res.end('Error hashing password');
                                return;
                            }
                            
                            pool.query(
                                'UPDATE login SET Username = ?, Password = ? WHERE staffID = ?',
                                [userData.Username, hashedPassword, staffID],
                                (error, results) => {
                                    if (error) {
                                        console.error('Error updating username and password in login table:', error);
                                        res.writeHead(500);
                                        res.end('Error updating username and password in login table');
                                        return;
                                    }

                                    res.writeHead(200);
                                    res.end('Staff information updated successfully');
                                }
                            );
                        });
                    } else {
                        res.writeHead(200);
                        res.end('Staff information updated successfully');
                    }
                }
            );
        }
    );
}

const editPatient = (patientID, userData, res) => {
    const { Policy_number, Insurance_Company_Name, Gender, FName, LName, DOB, Email, Phone_num, Address, Username, Password } = userData;

    // Assuming `pool` is the database connection pool
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

            // Update patient information
            connection.query(
                'UPDATE patient SET Policy_number = ?, Insurance_Company_Name = ?, Gender = ?, FName = ?, LName = ?, DOB = ?, Phone_num = ?, Address = ? WHERE patientID = ?',
                [Policy_number, Insurance_Company_Name, Gender, FName, LName, DOB, Phone_num, Address, patientID],
                (error, patientResults) => {
                    if (error) {
                        console.error('Error updating patient profile:', error);
                        connection.rollback(() => {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Internal Server Error' }));
                            connection.release();
                        });
                        return;
                    }

                    // Update login information
                    connection.query(
                        'UPDATE login SET Email = ? WHERE patientID = ?',
                        [Email, patientID],
                        (loginError, loginResults) => {
                            if (loginError) {
                                console.error('Error updating email in login table:', loginError);
                                connection.rollback(() => {
                                    res.writeHead(500, { 'Content-Type': 'application/json' });
                                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                                    connection.release();
                                });
                                return;
                            }

                            if (Username && Password) {
                                bcrypt.hash(Password, 10, (hashErr, hashedPassword) => {
                                    if (hashErr) {
                                        console.error('Error hashing password:', hashErr);
                                        connection.rollback(() => {
                                            res.writeHead(500, { 'Content-Type': 'application/json' });
                                            res.end(JSON.stringify({ error: 'Internal Server Error' }));
                                            connection.release();
                                        });
                                        return;
                                    }

                                    connection.query(
                                        'UPDATE login SET Username = ?, Password = ? WHERE patientID = ?',
                                        [Username, hashedPassword, patientID],
                                        (loginError, loginResults) => {
                                            if (loginError) {
                                                console.error('Error updating username and password in login table:', loginError);
                                                connection.rollback(() => {
                                                    res.writeHead(500, { 'Content-Type': 'application/json' });
                                                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                                                    connection.release();
                                                });
                                                return;
                                            }

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

                                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                                res.end(JSON.stringify({ message: 'Patient profile updated successfully' }));
                                                connection.release();
                                            });
                                        }
                                    );
                                });
                            } else {
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

                                    res.writeHead(200, { 'Content-Type': 'application/json' });
                                    res.end(JSON.stringify({ message: 'Patient profile updated successfully' }));
                                    connection.release();
                                });
                            }
                        }
                    );
                }
            );
        });
    });
};

function archiveStaff(staffID, End_date, res) {
    pool.query(
        'UPDATE staff SET Is_active = ?, End_date = ? WHERE staffID = ?',
        [false, End_date, staffID],
        (error, results) => {
            if (error) {
                console.error('Error archiving staff member:', error);
                res.writeHead(500);
                res.end('Error archiving staff member');
                return;
            }

            // Invalidate login credentials
            pool.query(
                'UPDATE login SET Password = NULL, User_role = NULL WHERE staffID = ?',
                [staffID],
                (error, results) => {
                    if (error) {
                        console.error('Error invalidating login credentials for staff member:', error);
                        res.writeHead(500);
                        res.end('Error invalidating login credentials for staff member');
                        return;
                    }

                    res.writeHead(200);
                    res.end('Staff member archived successfully');
                }
            );
        }
    );
}

function archiveDentist(dentistID, End_date, res) {
    pool.query(
        'UPDATE dentist SET Is_active = ?, End_date = ? WHERE dentistID = ?',
        [false, End_date, dentistID],
        (error, results) => {
            if (error) {
                console.error('Error archiving dentist:', error);
                res.writeHead(500);
                res.end('Error archiving dentist');
                return;
            }

            // Invalidate login credentials by updating password only
            pool.query(
                'UPDATE login SET Password = ? WHERE dentistID = ?',
                [null, dentistID],
                (error, results) => {
                    if (error) {
                        console.error('Error updating password for dentist:', error);
                        res.writeHead(500);
                        res.end('Error updating password for dentist');
                        return;
                    }

                    // Delete associated office_dentist entries
                    pool.query(
                        'DELETE FROM office_dentist WHERE dentistID = ?',
                        [dentistID],
                        (error, results) => {
                            if (error) {
                                console.error('Error deleting associated office_dentist entries:', error);
                                res.writeHead(500);
                                res.end('Error deleting associated office_dentist entries');
                                return;
                            }

                            // Delete associated schedule entries
                            pool.query(
                                'DELETE FROM schedule WHERE dentistID = ?',
                                [dentistID],
                                (error, results) => {
                                    if (error) {
                                        console.error('Error deleting associated schedule entries:', error);
                                        res.writeHead(500);
                                        res.end('Error deleting associated schedule entries');
                                        return;
                                    }

                                    res.writeHead(200);
                                    res.end('Dentist archived successfully');
                                }
                            );
                        }
                    );
                }
            );
        }
    );
}


function archivePatient(patientID, res) {
    pool.query(
        'UPDATE patient SET is_active = ? WHERE patientID = ?',
        [false, patientID],
        (error, results) => {
            if (error) {
                console.error('Error archiving patient:', error);
                res.writeHead(500);
                res.end('Error archiving patient');
                return;
            }

            // Invalidate login credentials
            pool.query(
                'UPDATE login SET Password = NULL, User_role = NULL WHERE patientID = ?',
                [patientID],
                (error, results) => {
                    if (error) {
                        console.error('Error invalidating login credentials for patient:', error);
                        res.writeHead(500);
                        res.end('Error invalidating login credentials for patient');
                        return;
                    }

                    res.writeHead(200);
                    res.end('Patient archived successfully');
                }
            );
        }
    );
}

function verifyToken(req, jwt) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        console.error('Error verifying token:', err);
        return null;
    }

}

function handleProtectedRoute(req, res, jwt) {

    const decodedToken = verifyToken(req, jwt);
    if (!decodedToken) {
        res.writeHead(401);
        res.end('Unauthorized');
        return;
    }

    if (decodedToken.role !== 'Patient') {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    res.writeHead(200);
    res.end('Protected route accessed successfully for Patient role');
}

function handleProtectedRouteAdmin(req, res, jwt) {

    const decodedToken = verifyToken(req, jwt);
    if (!decodedToken) {
        res.writeHead(401);
        res.end('Unauthorized');
        return;
    }

    if (decodedToken.role !== 'Admin') {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    res.writeHead(200);
    res.end('Protected route accessed successfully for Admin role');
}

function handleProtectedRouteDentist(req, res, jwt) {

    const decodedToken = verifyToken(req, jwt);
    if (!decodedToken) {
        res.writeHead(401);
        res.end('Unauthorized');
        return;
    }

    if (decodedToken.role !== 'Dentist') {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    res.writeHead(200);
    res.end('Protected route accessed successfully for Dentist role');
}

function handleProtectedRouteStaff(req, res, jwt) {

    const decodedToken = verifyToken(req, jwt);
    if (!decodedToken) {
        res.writeHead(401);
        res.end('Unauthorized');
        return;
    }

    if (decodedToken.role !== 'Staff') {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    res.writeHead(200);
    res.end('Protected route accessed successfully for Staff role');
}

function registerStaff(userData, res) {
    bcrypt.hash(userData.Password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            res.writeHead(500);
            res.end('Error hashing password');
            return;
        }

        pool.query('INSERT INTO staff (officeID, Fname, Lname, Email, Phone_num, DOB, Address, Position, Start_date, End_date, Is_active, Salary) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [userData.officeID, userData.Fname, userData.Lname, userData.Email, userData.Phone_num, userData.DOB, userData.Address, userData.Position, userData.Start_date, userData.End_date, userData.Is_active, userData.Salary],
            (error, results) => {
                if (error) {
                    console.error('Error creating staff:', error);
                    res.writeHead(500);
                    res.end('Error creating staff');
                    return;
                }
                
                const staffID = results.insertId;

                pool.query('INSERT INTO login (Username, Password, User_role, Email, StaffID) VALUES (?, ?, ?, ?, ?)',
                    [userData.Username, hashedPassword, 'Staff', userData.Email, staffID],
                    (error, loginResults) => {
                        if (error) {
                            console.error('Error registering staff:', error);
                            res.writeHead(500);
                            res.end('Error registering staff');
                        } else {
                            res.writeHead(200);
                            res.end('Staff registered successfully');
                        }
                    });
            });
    });
}

function getUserRole(username, password, res) {
    pool.query(
        'SELECT * FROM login WHERE Username = ?',
        [username],
        (error, results) => {
            if (error) {
                console.error('Error retrieving user:', error);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

            if (results.length === 0) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid username or password');
                return;
            }

            const user = results[0];
            bcrypt.compare(password, user.Password, (err, result) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }

                if (result) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ role: user.User_role }));
                } else {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Invalid username or password');
                }
            });
        }
    );
}

const getStaffProfile = (req, res, staffID) => {
    pool.query('SELECT * FROM staff WHERE staffID = ?', [staffID], (error, results) => {
        if (error) {
            console.error('Error retrieving staff profile:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
            return;
        }

        if (results.length === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Staff member not found' }));
            return;
        }

        const staffProfile = results[0];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(staffProfile));
    });
};

const updateStaffProfile = (req, res, staffID, updatedProfile) => {
    const { officeID, Fname, Lname, Email, Phone_num, DOB, Address, Position, Start_date, End_date, Is_active, Salary } = updatedProfile;

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
                'UPDATE staff SET officeID = ?, Fname = ?, Lname = ?, Email = ?, Phone_num = ?, DOB = ?, Address = ?, Position = ?, Start_date = ?, End_date = ?, Is_active = ?, Salary = ? WHERE staffID = ?',
                [officeID, Fname, Lname, Email, Phone_num, DOB, Address, Position, Start_date, End_date, Is_active, Salary, staffID],
                (error, staffResults) => {
                    if (error) {
                        console.error('Error updating staff profile:', error);
                        connection.rollback(() => {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Internal Server Error' }));
                            connection.release();
                        });
                        return;
                    }

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

                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Staff profile updated successfully' }));
                        connection.release();
                    });
                }
            );
        });
    });
};

module.exports = {
    registerPatient,
    loginPatient,
    handleProtectedRoute,
    registerDoctor,
    loginDoctor,
    registerAdmin,
    loginAdmin,
    registerStaff,
    loginStaff,
    editDentist,
    editStaff,
    editPatient,
    archiveDentist,
    archivePatient,
    archiveStaff,
    getUserRole,
    getStaffProfile,
    updateStaffProfile,
    handleProtectedRouteAdmin,
    handleProtectedRouteDentist,
    handleProtectedRouteStaff
};