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
