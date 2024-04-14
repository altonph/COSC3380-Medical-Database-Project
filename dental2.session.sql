-- @block
INSERT INTO office (officeID, office_address, Phone_num, email)
VALUES (1, '123 Main Street', '1234567890', 'office@example.com');

-- @block
SELECT * FROM office;

-- @block
INSERT INTO dentist (FName, LName, Specialty, Email, Phone_num, Address, DOB, Start_date, End_date, Is_active, Salary)
VALUES ('John', 'Doe', 'General Dentistry', 'johndoe@example.com', '1234567890', '123 Main Street', '1990-01-01', '2022-01-01', NULL, TRUE, 60000);

-- @block
SELECT * FROM dentist;

-- @block
INSERT INTO office_dentist (officeID, dentistID)
VALUES (1, 1);

-- @block
INSERT INTO office_dentist (officeID, dentistID)
VALUES (1, 2);

-- @block
SELECT * FROM office_dentist;

-- @block
INSERT INTO schedule (officeID, dentistID, Monday, Tuesday, Wednesday, Thursday, Friday)
VALUES (1, 1, TRUE, FALSE, TRUE, FALSE, TRUE);

-- @block
INSERT INTO schedule (officeID, dentistID, Monday, Tuesday, Wednesday, Thursday, Friday)
VALUES (1, 2, TRUE, FALSE, TRUE, FALSE, TRUE);

-- @block
SELECT * FROM schedule;

-- @block
INSERT INTO staff (officeID, Fname, Lname, Email, Phone_num, DOB, Address, Position, Start_date, Salary)
VALUES (1, 'John', 'Doe', 'johndoe@example.com', '1234567890', '1990-05-15', '123 Main St, Anytown, USA', 'Receptionist', '2022-01-01', 30000);

-- @block
SELECT * FROM staff;

-- @block
INSERT INTO patient (Policy_number, Insurance_Company_Name, Gender, FName, LName, DOB, Email, Phone_num, Address)
VALUES ('ABC123456789', 'Anthem', 'Male', 'John', 'Doe', '1990-01-01', 'johndoe@example.com', '1234567890', '123 Main St');

-- @block
SELECT * FROM patient;

-- @block
INSERT INTO appointment (officeID, dentistID, staffID, patientID, Date, Start_time, End_time, Appointment_Type, Appointment_Status)
VALUES (1, 1, 1, 1, '2024-04-03', '09:00:00', '10:00:00', 'Whitening', 'Scheduled');

-- @block
INSERT INTO appointment (officeID, dentistID, staffID, patientID, Date, Start_time, End_time, Appointment_Type, Appointment_Status)
VALUES (1, 2, 1, 1, '2024-04-03', '09:30:00', '10:30:00', 'Whitening', 'Scheduled');

-- @block
INSERT INTO appointment (officeID, dentistID, staffID, patientID, Date, Start_time, End_time, Appointment_Type, Appointment_Status)
VALUES (1, 2, 1, 1, '2024-04-29', '09:30:00', '10:30:00', 'Whitening', 'Scheduled');

-- @block
INSERT INTO appointment (officeID, dentistID, staffID, patientID, Date, Start_time, End_time, Appointment_Type, Appointment_Status)
VALUES (1, 2, 1, 1, '2024-04-03', '12:00:00', '13:00:00', 'Cleaning', 'Scheduled');

-- @block
INSERT INTO appointment (officeID, dentistID, staffID, patientID, Date, Start_time, End_time, Appointment_Type, Appointment_Status)
VALUES (1, 2, 1, 1, '2024-04-19', '12:00:00', '14:00:00', 'Cleaning', 'Scheduled');

-- @block
SELECT * FROM APPOINTMENT;

-- @block
INSERT INTO visit_details (patientID, dentistID, Diagnosis, Treatment, Notes)
VALUES (1, 1, 'Checkup', 'No specific diagnosis', 'Patient seems to be in good health overall.');

-- @block
SELECT * FROM visit_details;

-- @block
INSERT INTO prescription (dentistID, patientID, visitID, National_Drug_Code, Medication_Name, Medication_Dosage, Refills, notes, Date_prescribed)
VALUES (1, 1, 1, '1234567890123', 'Medicine X', '10mg', 3, 'Take with food', '2024-04-03');

-- @block
SELECT * FROM prescription;

-- @block
INSERT INTO invoice (Policy_number, patientID, visitID, Date, Description, Total_Amount, Paid_Amount)
VALUES ('ABC123456789', 1, 1, '2024-04-03', 'Medical Consultation', 100.00, 0.00);

-- @block
SELECT * FROM invoice;

-- @block
INSERT INTO medical_records (patientID, Date_Created, Allergies, Feet, Inches, Weight, Notes)
VALUES (1, '2024-04-03', 'None', 6, 2, 70, 'No significant notes at this time.');

-- @block
SELECT * FROM medical_records;

-- @block
DELETE FROM medical_records;

-- @block
DELETE FROM appointment;

-- @block
SELECT COUNT(*) AS count_schedule
FROM schedule
WHERE dentistID = 2
AND officeID = 1
AND (
    DAYOFWEEK(CURDATE()) = 1 AND Monday = TRUE
    OR DAYOFWEEK(CURDATE()) = 2 AND Tuesday = TRUE
    OR DAYOFWEEK(CURDATE()) = 3 AND Wednesday = TRUE
    OR DAYOFWEEK(CURDATE()) = 4 AND Thursday = TRUE
    OR DAYOFWEEK(CURDATE()) = 5 AND Friday = TRUE
);

-- @block
SELECT COUNT(*) AS count_appointments
FROM appointment
WHERE dentistID = 2
AND officeID = 1
AND Date = CURDATE()
AND ((Start_time <= '09:00:00' AND End_time > '09:00:00')
    OR (Start_time < '10:00:00' AND End_time >= '10:00:00')
    OR (Start_time >= '09:00:00' AND End_time <= '10:00:00'));


-- @block
SELECT * FROM login;

-- @block
SELECT * FROM staff;

-- @block
DELETE FROM visit_details;
