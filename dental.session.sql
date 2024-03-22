-- @block Dummy data for office table
INSERT INTO office (officeID, office_address, Phone_num, email) 
VALUES (1, '123 Main St, Houston, TX', '1234567890', 'office1@example.com');
INSERT INTO office (officeID, office_address, Phone_num, email) 
VALUES (2, '321 2nd St, Katy, TX', '1234567890', 'office2@example.com');

-- @block
SELECT * FROM office;

-- @block
DELETE FROM office;

-- @block
SELECT * FROM dentist;
SELECT * FROM login;

-- @block
DELETE FROM dentist;
DELETE FROM login;

-- @block Dummy data for dentist table
INSERT INTO dentist (officeID, FName, LName, Specialty, Email, Phone_num, Address, DOB, Start_date, End_date, Is_active, Salary) 
VALUES (1, 'John', 'Doe', 'Dentist', 'john.doe@example.com', '1112223333', '456 Elm St, Anytown, USA', '1980-05-15', '2020-01-01', NULL, TRUE, 120000);

-- @block Dummy data for staff table
INSERT INTO staff (officeID, Fname, Lname, Email, Phone_num, DOB, Address, Position, Start_date, End_date, Is_active, Salary) 
VALUES (1, 'Jane', 'Smith', 'jane.smith@example.com', '4445556666', '1990-10-20', '789 Oak St, Anytown, USA', 'Receptionist', '2020-01-01', NULL, TRUE, 50000);

-- @block Dummy data for insurance table
INSERT INTO insurance (Insurance_Company_Name, Policy_number) 
VALUES ('XYZ Insurance', '9876543210');

-- @block Dummy data for patient table
INSERT INTO patient (insuranceID, dentistID, Gender, FName, LName, DOB, Email, Phone_num, Address) 
VALUES (1, 1, 'Male', 'Michael', 'Johnson', '1985-01-01', 'michael.johnson@example.com', '3334445555', '321 Pine St, Anytown, USA');

-- @block Dummy data for schedule table
INSERT INTO schedule (dentistID, Day) 
VALUES (1, 'Monday');

-- @block Dummy data for appointment table
INSERT INTO appointment (officeID, dentistID, staffID, patientID, Date, Start_time, End_time, Appointment_Type, Appointment_Status, Cancellation_Reason, Specialist_Approval, Is_active) 
VALUES (1, 1, 1, 1, '2024-03-17', '09:00:00', NULL, 'Routine checkup', 'Scheduled', NULL, FALSE, TRUE);

-- @block Dummy data for prescription table
INSERT INTO prescription (dentistID, patientID, National_Drug_Code, Medication_Name, Medication_Dosage, Refills, notes, Date_prescribed) 
VALUES (1, 1, '1234567890123', 'Painkiller', '10mg', 2, 'Take with food', '2024-03-17');

-- @block Dummy data for invoice table
INSERT INTO invoice (insuranceID, patientID, Date, Description, Total_Amount, Paid_Amount) 
VALUES (1, 1, '2024-03-17', 'Routine checkup', 150.00, 0.00);

-- @block Dummy data for medical_records table
INSERT INTO medical_records (patientID, dentistID, Date_Created, Allergies, Height, Weight, Notes) 
VALUES (1, 1, '2024-03-17', 'None', 180, 80, 'Patient in good health.');

-- @block Dummy data for visit_details table
INSERT INTO visit_details (recordsID, dentistID, Visit_Type, Diagnosis, Treatment, Notes) 
VALUES (1, 1, 'Routine checkup', 'No issues found', 'None needed', 'Patient advised to maintain oral hygiene.');

-- @block Dummy data for login table
INSERT INTO login (Username, Password, Email, patientID, dentistID, staffID, Is_admin) 
VALUES ('user1', 'password123', 'user1@example.com', 1, NULL, NULL, FALSE);

-- @block
SELECT * FROM patient;
SELECT * FROM login;

-- @block
SELECT * FROM office;

-- @block
DELETE FROM patient;
DELETE FROM login;

-- @block
SELECT p.Fname, p.Lname, l.Username, l.User_Role
FROM patient as p, login as l
WHERE p.patientID = l.patientID

-- @block
SELECT * FROM login WHERE Username = "tonal"