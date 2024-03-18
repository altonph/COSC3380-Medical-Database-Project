const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./models/db");

app.use(cors());
app.use(express.json());

//register a user in the database
app.post("/register", async(req, res) => {
    try {
        const { FName, LName, Gender, DOB, Email, Username, Password, Phone_num, Address } = req.body;

        // Assuming you have a separate table for patients, dentists, and staff
        // and you want to insert IDs into the login table
        const patientID = null; // Assign appropriate patient ID if available
        const dentistID = null; // Assign appropriate dentist ID if available
        const staffID = null;   // Assign appropriate staff ID if available

        const is_admin = false; // Assuming the default value for isAdmin is false

        const query = `
            INSERT INTO login (Username, Password, Email, patientID, dentistID, staffID, Is_admin)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        await pool.query(query, [Username, Password, Email, patientID, dentistID, staffID, is_admin]);

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});

/*
const http = require('http');
const { json } = require('body-parser');
const cors = require('cors');
const pool = require('./models/db');

// Create a server instance
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.end('Server is running');
});

// Apply CORS middleware
server.on('request', cors());

// Apply JSON middleware
server.on('request', json());

//testing database connection to backend
// pool.query('SELECT * FROM login', (error, results, fields) => {
//     if (error) {
//       console.error(error);
//       return;
//     }
//     console.log(results);
//   });

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
*/