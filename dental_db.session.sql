-- @block Dummy data for office table
INSERT INTO office (officeID, office_address, Phone_num, email) 
VALUES (1, '123 Main St, Houston, TX', '1234567890', 'office1@example.com');
INSERT INTO office (officeID, office_address, Phone_num, email) 
VALUES (2, '321 2nd St, Katy, TX', '1234567890', 'office2@example.com');

-- @block
SELECT * FROM login;

-- @block
SELECT * FROM office;
SELECT * FROM dentist;
SELECT * FROM appointment;

-- @block
INSERT INTO dentist (officeID, FName, LName, Specialty, Email, Phone_num, Address, DOB, Start_date, End_date, Is_active, Salary) 
VALUES (2, 'Emily', 'Johnson', 'General Dentistry', 'emily.johnson@example.com', '5551234567', '456 Oak St, Katy, TX', '1985-05-15', '2022-01-01', NULL, TRUE, 90000);

-- @block
INSERT INTO insurance (Insurance_Company_Name, Policy_number) 
VALUES ('XYZ Insurance', '1234567890');

-- @block
INSERT INTO staff (officeID, Fname, Lname, Email, Phone_num, DOB, Address, Position, Start_date, End_date, Is_active, Salary) 
VALUES (1, 'Jessica', 'Brown', 'jessica@example.com', '5551234567', '1990-08-20', '789 Oak St, Houston, TX', 'Receptionist', '2023-02-01', NULL, TRUE, 50000);


-- @block
INSERT INTO appointment (officeID, dentistID, staffID, patientID, Date, Start_time, End_time, Appointment_Type, Appointment_Status, Cancellation_Reason, Specialist_Approval, Is_active) 
VALUES 
(1, 1, 1, 1, '2024-04-01', '09:00:00', '09:30:00', 'Checkup', 'Confirmed', NULL, FALSE, TRUE);

-- @block
INSERT INTO medical_records (patientID, dentistID, visitID, Date_Created, Allergies, Height, Weight, Notes) 
VALUES (1, 1, NULL, '2023-05-10', 'None', 170, 70, 'No significant issues.');
-- @block
INSERT INTO visit_details (recordsID, dentistID, Visit_Type, Diagnosis, Treatment, Notes) 
VALUES 
(1, 1, 'Checkup', 'Healthy', 'None', 'No issues detected');

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
SELECT * FROM dentist;

-- @block
SELECT * FROM appointment;

-- @block
DELETE FROM appointment;

-- @block
INSERT INTO schedule (dentistID, Day) 
VALUES (1, 'Monday');

-- @block might change schema to this
CREATE TABLE `schedule` (
  `scheduleID` int PRIMARY KEY AUTO_INCREMENT,
  `dentistID` int,
  `officeID` int,
  `Day` varchar(10)
);

-- @block
-- Inserting dummy data for dentists
INSERT INTO dentist (officeID, FName, LName, Specialty, Email, Phone_num, Address, DOB, Start_date, Is_active, Salary)
VALUES
(1, 'John', 'Doe', 'General Dentistry', 'john.doe@example.com', '1234567890', '123 Main St', '1980-05-15', '2020-03-10', TRUE, 80000),
(1, 'Jane', 'Smith', 'Orthodontist', 'jane.smith@example.com', '9876543210', '456 Elm St', '1975-10-20', '2021-06-25', TRUE, 100000),
(1, 'Michael', 'Johnson', 'General Dentistry', 'michael.johnson@example.com', '1112223333', '789 Oak St', '1982-08-30', '2021-01-15', TRUE, 75000),
(1, 'Emily', 'Williams', 'Orthodontist', 'emily.williams@example.com', '4445556666', '101 Pine St', '1987-03-12', '2020-09-05', TRUE, 110000),
(1, 'David', 'Brown', 'General Dentistry', 'david.brown@example.com', '7778889999', '202 Maple St', '1978-11-25', '2019-12-01', TRUE, 82000),
(1, 'Jennifer', 'Wilson', 'Orthodontist', 'jennifer.wilson@example.com', '3332221111', '303 Cherry St', '1985-06-18', '2022-02-20', TRUE, 105000),
(2, 'Matthew', 'Miller', 'General Dentistry', 'matthew.miller@example.com', '5556667777', '404 Walnut St', '1976-09-05', '2018-05-10', TRUE, 78000),
(2, 'Sarah', 'Brown', 'Orthodontist', 'sarah.brown@example.com', '2223334444', '505 Cedar St', '1983-12-08', '2020-11-30', TRUE, 115000),
(2, 'Daniel', 'Martinez', 'General Dentistry', 'daniel.martinez@example.com', '9998887777', '606 Pine St', '1979-04-28', '2017-07-15', TRUE, 76000),
(2, 'Lauren', 'Garcia', 'Orthodontist', 'lauren.garcia@example.com', '1119998888', '707 Oak St', '1988-07-10', '2021-04-10', TRUE, 108000),
(2, 'Christopher', 'Lopez', 'General Dentistry', 'christopher.lopez@example.com', '3334445555', '808 Elm St', '1984-02-14', '2019-10-05', TRUE, 79000),
(2, 'Amanda', 'Rodriguez', 'Orthodontist', 'amanda.rodriguez@example.com', '4445556666', '909 Maple St', '1981-05-27', '2022-08-15', TRUE, 112000);

-- @block
SELECT FName, LName, Email, Salary
FROM dentist
WHERE Specialty = 'General Dentistry';

-- @block
DELETE FROM dentist;