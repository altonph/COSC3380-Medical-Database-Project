const pool = require('../models/db');
const bcrypt = require('bcrypt');

function registerUser(userData, res) {
    // Hash the password
    // Remaining code...
    bcrypt.hash(userData.Password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            res.writeHead(500);
            res.end('Error hashing password');
            return;
        }

        // Insert user data into the database
        pool.query('INSERT INTO login (Username, Password, User_role, Email, patientID, dentistID, staffID) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [userData.Username, hashedPassword, userData.User_role, userData.Email, userData.patientID, userData.dentistID, userData.staffID],
            (error, results) => {
                if (error) {
                    console.error('Error registering user:', error);
                    res.writeHead(500);
                    res.end('Error registering user');
                } else {
                    //console.log('User registered successfully');
                    res.writeHead(200);
                    res.end('User registered successfully');
                }
            });
    });
}

function loginUser(username, password, res) {
    // Remaining code...
    pool.query('SELECT * FROM login WHERE Username = ?', [username], async (error, results) => {
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

        const user = results[0]; // Assuming username is unique, so there's only one result

        // Compare the provided password with the hashed password stored in the database
        //console.log(password);
        //console.log(user.Password);
        bcrypt.compare(password, user.Password, (err, result) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

            if (result) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Success');
            } else {
                res.writeHead(401, { 'Content-Type': 'text/plain' });
                res.end('Incorrect password');
            }
        });
    });
}

module.exports = {
    registerUser,
    loginUser
};
