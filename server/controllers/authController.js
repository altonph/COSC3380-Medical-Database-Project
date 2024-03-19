const pool = require('../models/db');
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

        // Insert into patient table
        pool.query('INSERT INTO patient (insuranceID, dentistID, Gender, FName, LName, DOB, Email, Phone_num, Address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [userData.insuranceID, userData.dentistID, userData.Gender, userData.FName, userData.LName, userData.DOB, userData.Email, userData.Phone_num, userData.Address],
            (error, results) => {
                if (error) {
                    console.error('Error creating patient:', error);
                    res.writeHead(500);
                    res.end('Error creating patient');
                    return;
                }
                
                const patientID = results.insertId;

                // Insert into login table
                pool.query('INSERT INTO login (Username, Password, User_role, Email, patientID, dentistID, staffID) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [userData.Username, hashedPassword, userData.User_role, userData.Email, patientID, userData.dentistID, userData.staffID],
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


/*
const poolConnection = require('../server/database');
const bcrypt = require("bcryptjs");

function handleSignUp(req, res, connection) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { firstName, middleName, lastName, email, dateOfBirth, phoneNumber, password } =
      JSON.parse(body);

    const accountType = "Customer";

    const hashedPassword = bcrypt.hashSync(password, 10);
    const accountQuery =
      "INSERT INTO Account (accountType, firstName, middleName, lastName, email, dateOfBirth, phoneNumber, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const customerQuery =
      "INSERT INTO Customer (UserID, FirstName, LastName, DateOfBirth) VALUES (?, ?, ?, ?)";

    poolConnection.query(
      accountQuery,
      [accountType, firstName, middleName, lastName, email, dateOfBirth, phoneNumber, hashedPassword],
      (error, results) => {
        if (error) {
          console.error("Error inserting user into the database:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Error creating user" }));
          return;
        }

        const userId = results.insertId;

        poolConnection.query(
          customerQuery,
          [userId, firstName, lastName, dateOfBirth],
          (error, results) => {
            if (error) {
              console.error("Error inserting customer into the database:", error);
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ message: "Error creating user" }));
              return;
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                message: "User created successfully",
                userId: userId,
              })
            );
          }
        );
      }
    );
  });
}

module.exports = handleSignUp;
*/