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

        pool.query('INSERT INTO patient (Gender, FName, LName, DOB, Email, Phone_num, Address) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [userData.Gender, userData.FName, userData.LName, userData.DOB, userData.Email, userData.Phone_num, userData.Address],
            (error, patientResults) => {
                if (error) {
                    console.error('Error creating patient:', error);
                    res.writeHead(500);
                    res.end('Error creating patient');
                    return;
                }
                
                const patientID = patientResults.insertId;

                pool.query('INSERT INTO login (Username, Password, User_role, Email, PatientID) VALUES (?, ?, ?, ?, ?)',
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

function loginAdmin(username, password, res, jwt) {

    pool.query('SELECT * FROM login WHERE Username = ?', [username], async (error, results) => {
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

                const token = jwt.sign({ username: admin.Username, role: admin.User_role }, process.env.JWT_SECRET, { expiresIn: '2h' });
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ token, role: admin.User_role })); // Include the role in the response
            } else {
                res.writeHead(401, { 'Content-Type': 'text/plain' });
                res.end('Incorrect password');
            }
        });
    });

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

module.exports = {
    registerPatient,
    loginPatient,
    handleProtectedRoute,
    registerAdmin,
    loginAdmin
};