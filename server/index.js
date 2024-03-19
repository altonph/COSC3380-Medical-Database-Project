const http = require('http');
//const { registerUser } = require('./userController');
const pool = require('./models/db');

const server = http.createServer((req, res) => {
    // Allow CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
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
        const userData = JSON.parse(data);
        pool.query('INSERT INTO login (Username, Password, User_role, Email, patientID, dentistID, staffID) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [userData.Username, userData.Password, userData.User_role, userData.Email, userData.patientID, userData.dentistID, userData.staffID],
          (error, results) => {
            if (error) {
              console.error('Error registering user:', error);
              res.writeHead(500);
              res.end('Error registering user');
            } else {
              console.log('User registered successfully');
              res.writeHead(200);
              res.end('User registered successfully');
            }
          });
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