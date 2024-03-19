const http = require('http');
const pool = require('./models/db');
const bcrypt = require('bcrypt');

function registerUser(userData, res) {
    // Hash the password
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
    // Query your database to find the user with the provided username
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

const server = http.createServer((req, res) => {
    // Allow CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE, UPDATE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.url === '/register' && req.method === 'POST') {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            try {
                const userData = JSON.parse(data);
                //console.log(userData);
                registerUser(userData, res);
            } catch (error) {
                console.error('Error parsing JSON data:', error);
                res.writeHead(400);
                res.end('Invalid JSON data');
            }
        });
    } else if (req.url === '/login' && req.method === 'POST') {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            //console.log('Received data:', data);
            try {
                const { Username: username, Password: password } = JSON.parse(data);
                //console.log(username);
                //console.log(password);
                loginUser(username, password, res);
            } catch (error) {
                console.error('Error parsing JSON data:', error);
                res.writeHead(400);
                res.end('Invalid JSON data');
            }
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});


/*
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./models/db");

app.use(cors());
app.use(express.json());

// Register a user and create a patient record in the database
app.post("/register", async(req, res) => {
    const { FName, LName, Gender, DOB, Email, Username, Password, Phone_num, Address } = req.body;

    try {
        // Start a transaction
        console.log("Starting transaction...");
        await pool.query("START TRANSACTION");

        // Insert data into the patient table
        console.log("Inserting data into the patient table...");
        const patientQuery = `
            INSERT INTO patient (insuranceID, dentistID, Gender, FName, LName, DOB, Email, Phone_num, Address) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const patientResult = await pool.query(patientQuery, [null, null, Gender, FName, LName, DOB, Email, Phone_num, Address]);
        console.log("Patient data inserted:", patientResult);

        // Get the inserted patientID
        const patientID = patientResult.insertId;
        console.log("Generated patientID:", patientID);

        // Insert data into the login table
        console.log("Inserting data into the login table...");
        const loginQuery = `
            INSERT INTO login (Username, Password, Email, patientID, Is_admin)
            VALUES (?, ?, ?, ?, ?)
        `;
        await pool.query(loginQuery, [Username, Password, Email, patientID, false]);
        console.log("Data inserted into the login table successfully.");

        // Commit the transaction
        console.log("Committing transaction...");
        await pool.query("COMMIT");

        res.status(201).json({ message: "User registered and patient created successfully" });
    } catch (err) {
        // Rollback the transaction if an error occurs
        console.error("Error occurred, rolling back transaction:", err.message);
        await pool.query("ROLLBACK");
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});
*/