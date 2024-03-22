-- @block Dummy data for office table
INSERT INTO office (officeID, office_address, Phone_num, email) 
VALUES (1, '123 Main St, Houston, TX', '1234567890', 'office1@example.com');
INSERT INTO office (officeID, office_address, Phone_num, email) 
VALUES (2, '321 2nd St, Katy, TX', '1234567890', 'office2@example.com');

-- @block
INSERT INTO staff (officeID, Fname, Lname, Email, Phone_num, DOB, Address, Position, Start_date, End_date, Is_active, Salary) 
VALUES (1, 'Jessica', 'Brown', 'jessica@example.com', '5551234567', '1990-08-20', '789 Oak St, Houston, TX', 'Receptionist', '2023-02-01', NULL, TRUE, 50000);

-- @block
INSERT INTO insurance (Insurance_Company_Name, Policy_number) 
VALUES ('XYZ Insurance', '1234567890');

-- @block
INSERT INTO schedule (dentistID, Day) 
VALUES (1, 'Monday');

-- @block
CREATE TABLE `schedule` (
  `scheduleID` int PRIMARY KEY AUTO_INCREMENT,
  `dentistID` int,
  `officeID` int,
  `Day` varchar(10)
);

-- @block
INSERT INTO staff (officeID, Fname, Lname, Email, Phone_num, DOB, Address, Position, Start_date, End_date, Is_active, Salary) 
VALUES (1, 'Jessica', 'Brown', 'jessica@example.com', '5551234567', '1990-08-20', '789 Oak St, Houston, TX', 'Receptionist', '2023-02-01', NULL, TRUE, 50000);


-- @block
INSERT INTO appointment (officeID, dentistID, staffID, patientID, Date, Start_time, End_time, Appointment_Type, Appointment_Status, Cancellation_Reason, Specialist_Approval, Is_active) 
VALUES 
(1, 1, 1, 1, '2024-04-01', '09:00:00', '09:30:00', 'Checkup', 'Confirmed', NULL, FALSE, TRUE);

-- @block
INSERT INTO visit_details (recordsID, dentistID, Visit_Type, Diagnosis, Treatment, Notes) 
VALUES 
(1, 1, 'Checkup', 'Healthy', 'None', 'No issues detected');

-- @block
INSERT INTO medical_records (patientID, dentistID, visitID, Date_Created, Allergies, Height, Weight, Notes) 
VALUES (1, 1, NULL, '2023-05-10', 'None', 170, 70, 'No significant issues.');

-- @block
INSERT INTO prescription (dentistID, patientID, visitID, National_Drug_Code, Medication_Name, Medication_Dosage, Refills, notes, Date_prescribed) 
VALUES (1, 1, NULL, '1234567890123', 'Fluoxetine', '20mg', 1, 'Take once daily with food.', '2023-05-10');

-- @block
INSERT INTO invoice (insuranceID, patientID, visitID, Date, Description, Total_Amount, Paid_Amount) 
VALUES (NULL, 1, NULL, '2023-05-10', 'Regular checkup and prescription', 150.00, 0.00);

-- @block
UPDATE medical_records
SET visitID = 1
WHERE patientID = 1;

-- Update prescription
UPDATE prescription
SET visitID = 1
WHERE patientID = 1;

-- Update invoice
UPDATE invoice
SET visitID = 1
WHERE patientID = 1;


-- @block
UPDATE patient
SET dentistID = 1
WHERE patientID = 1;

-- @block
SELECT * FROM office;

-- @block
DELETE FROM office;

-- @block
SELECT * FROM dentist;
SELECT * FROM patient;
SELECT * FROM login;


-- @block
DELETE FROM office;
DELETE FROM dentist;
DELETE FROM login;

-- @block
SELECT * FROM dentist;
SELECT * FROM patient;
SELECT * FROM staff;
SELECT * FROM login;
SELECT * FROM appointment;
SELECT * FROM medical_records;
SELECT * FROM visit_details;
SELECT * FROM prescription;
SELECT * FROM invoice;


-- @block
SELECT * FROM patient;
