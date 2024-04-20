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
VALUES (2, 2);

-- @block
INSERT INTO office_dentist (officeID, dentistID)
VALUES (1, 1);

-- @block
INSERT INTO office_dentist (officeID, dentistID)
VALUES (1, 3);

-- @block
INSERT INTO office_dentist (officeID, dentistID)
VALUES (2, 3);

-- @block
INSERT INTO schedule (officeID, dentistID, Monday, Tuesday, Wednesday, Thursday, Friday)
VALUES (2, 2, TRUE, TRUE, TRUE, TRUE, TRUE);

-- @block
INSERT INTO schedule (officeID, dentistID, Monday, Tuesday, Wednesday, Thursday, Friday)
VALUES (2, 2, FALSE, TRUE, FALSE, TRUE, FALSE);

-- @block
INSERT INTO schedule (officeID, dentistID, Monday, Tuesday, Wednesday, Thursday, Friday)
VALUES (1, 3, TRUE, FALSE, TRUE, FALSE, TRUE);

-- @block
INSERT INTO schedule (officeID, dentistID, Monday, Tuesday, Wednesday, Thursday, Friday)
VALUES (1, 3, FALSE, TRUE, FALSE, TRUE, FALSE);

-- @block
SELECT * FROM schedule;


-- @block
SELECT * FROM patient;

-- @block
SELECT * FROM staff;

-- @block
DELETE FROM staff;

-- @block
-- Insert statements for 20 random patients
INSERT INTO patient (Policy_number, Insurance_Company_Name, Gender, FName, LName, DOB, Email, Phone_num, Address, is_active)
VALUES
('POL001', 'Anthem', 'Male', 'Michael', 'Johnson', '1987-03-25', 'michael.johnson@example.com', '1234567890', '456 Maple Drive', TRUE),
('POL002', 'Guardian', 'Female', 'Emily', 'Anderson', '1990-08-10', 'emily.anderson@example.com', '1234567890', '789 Pine Road', TRUE),
('POL003', 'Ameritas', 'Male', 'Christopher', 'Wilson', '1985-12-15', 'christopher.wilson@example.com', '1234567890', '987 Elm Street', TRUE),
('POL004', 'Humana', 'Female', 'Jessica', 'Moore', '1982-05-30', 'jessica.moore@example.com', '1234567890', '357 Oak Avenue', TRUE),
('POL005', 'Spirit Dental', 'Male', 'Matthew', 'Taylor', '1979-09-12', 'matthew.taylor@example.com', '1234567890', '654 Cedar Lane', TRUE),
('POL006', 'Anthem', 'Female', 'Sarah', 'Jackson', '1988-02-20', 'sarah.jackson@example.com', '1234567890', '159 Pine Road', TRUE),
('POL007', 'Guardian', 'Male', 'David', 'Harris', '1984-07-05', 'david.harris@example.com', '1234567890', '852 Maple Drive', TRUE),
('POL008', 'Ameritas', 'Female', 'Jennifer', 'White', '1981-10-18', 'jennifer.white@example.com', '1234567890', '369 Walnut Avenue', TRUE),
('POL009', 'Humana', 'Male', 'James', 'Martinez', '1976-11-30', 'james.martinez@example.com', '1234567890', '741 Elm Street', TRUE),
('POL010', 'Spirit Dental', 'Female', 'Amanda', 'Lopez', '1993-04-12', 'amanda.lopez@example.com', '1234567890', '852 Pine Road', TRUE),
('POL011', 'Anthem', 'Male', 'Daniel', 'Garcia', '1980-03-08', 'daniel.garcia@example.com', '1234567890', '963 Birch Street', TRUE),
('POL012', 'Guardian', 'Female', 'Michelle', 'Rodriguez', '1983-06-22', 'michelle.rodriguez@example.com', '1234567890', '123 Pinecone Lane', TRUE),
('POL013', 'Ameritas', 'Male', 'John', 'Lewis', '1989-09-15', 'john.lewis@example.com', '1234567890', '357 Walnut Avenue', TRUE),
('POL014', 'Humana', 'Female', 'Lauren', 'Clark', '1986-12-28', 'lauren.clark@example.com', '1234567890', '789 Magnolia Drive', TRUE),
('POL015', 'Spirit Dental', 'Male', 'Ryan', 'Hall', '1992-08-10', 'ryan.hall@example.com', '1234567890', '246 Sunflower Boulevard', TRUE),
('POL016', 'Anthem', 'Female', 'Amy', 'Young', '1987-05-17', 'amy.young@example.com', '1234567890', '654 Oak Avenue', TRUE),
('POL017', 'Guardian', 'Male', 'Kevin', 'King', '1984-01-20', 'kevin.king@example.com', '1234567890', '357 Maple Drive', TRUE),
('POL018', 'Ameritas', 'Female', 'Kimberly', 'Scott', '1991-04-05', 'kimberly.scott@example.com', '1234567890', '852 Elm Street', TRUE),
('POL019', 'Humana', 'Male', 'Justin', 'Hernandez', '1988-07-15', 'justin.hernandez@example.com', '1234567890', '741 Pine Road', TRUE),
('POL020', 'Spirit Dental', 'Female', 'Jessica', 'Lee', '1985-02-28', 'jessica.lee@example.com', '1234567890', '963 Birch Street', TRUE);

-- @block
SELECT * FROM patient;

-- @block
SELECT * FROM dentist;

-- @block
SELECT * FROM staff;



-- @block
UPDATE dentist 
SET End_date = null
WHERE dentistID = 1; 


-- @block
SELECT * FROM appointment;

-- @block
-- Entries for appointment table
INSERT INTO appointment (dentistID, patientID, Date, Start_time, End_time, officeID, staffID, Appointment_type, Appointment_status, Cancellation_reason, Primary_approval, is_active)
VALUES
-- Office 1, Staff 1, Dentist 1
(1, 1, '2024-05-01', '09:00:00', '10:00:00', 1, 1, 'Cleaning', 'Scheduled', NULL, 'Approved', TRUE),
(1, 2, '2024-05-02', '10:30:00', '11:30:00', 1, 1, 'Whitening', 'Scheduled', NULL, 'Approved', TRUE),
(1, 3, '2024-05-03', '12:00:00', '13:00:00', 1, 1, 'Extraction', 'Scheduled', NULL, 'Approved', TRUE),
(1, 4, '2024-05-04', '13:30:00', '14:30:00', 1, 1, 'Root Canal', 'Scheduled', NULL, 'Approved', TRUE),
-- Office 1, Staff 2, Dentist 2
(2, 5, '2024-05-05', '15:00:00', '16:00:00', 1, 2, 'Cleaning', 'Scheduled', NULL, 'Approved', TRUE),
(2, 6, '2024-05-06', '09:30:00', '10:30:00', 1, 2, 'Whitening', 'Scheduled', NULL, 'Approved', TRUE),
(2, 7, '2024-05-07', '11:00:00', '12:00:00', 1, 2, 'Extraction', 'Scheduled', NULL, 'Approved', TRUE),
(2, 8, '2024-05-08', '12:30:00', '13:30:00', 1, 2, 'Root Canal', 'Scheduled', NULL, 'Approved', TRUE),
-- Office 2, Staff 1, Dentist 1
(1, 9, '2024-05-09', '14:00:00', '15:00:00', 2, 1, 'Cleaning', 'Scheduled', NULL, 'Approved', TRUE),
(1, 10, '2024-05-10', '15:30:00', '16:30:00', 2, 1, 'Whitening', 'Scheduled', NULL, 'Approved', TRUE),
(1, 11, '2024-05-11', '09:00:00', '10:00:00', 2, 1, 'Extraction', 'Scheduled', NULL, 'Approved', TRUE),
(1, 12, '2024-05-12', '10:30:00', '11:30:00', 2, 1, 'Root Canal', 'Scheduled', NULL, 'Approved', TRUE),
-- Office 2, Staff 2, Dentist 2
(2, 13, '2024-05-13', '12:00:00', '13:00:00', 2, 2, 'Cleaning', 'Scheduled', NULL, 'Approved', TRUE),
(2, 14, '2024-05-14', '13:30:00', '14:30:00', 2, 2, 'Whitening', 'Scheduled', NULL, 'Approved', TRUE),
(2, 15, '2024-05-15', '15:00:00', '16:00:00', 2, 2, 'Extraction', 'Scheduled', NULL, 'Approved', TRUE),
(2, 16, '2024-05-16', '09:30:00', '10:30:00', 2, 2, 'Root Canal', 'Scheduled', NULL, 'Approved', TRUE),
-- Office 1, Staff 1, Dentist 3
(3, 17, '2024-05-17', '11:00:00', '12:00:00', 1, 1, 'Cleaning', 'Scheduled', NULL, 'Approved', TRUE),
(3, 18, '2024-05-18', '12:30:00', '13:30:00', 1, 1, 'Whitening', 'Scheduled', NULL, 'Approved', TRUE),
(3, 19, '2024-05-19', '14:00:00', '15:00:00', 1, 1, 'Extraction', 'Scheduled', NULL, 'Approved', TRUE),
(3, 1, '2024-05-20', '15:30:00', '16:30:00', 1, 1, 'Root Canal', 'Scheduled', NULL, 'Approved', TRUE);

-- @block
SELECT COUNT(*) AS patientCount FROM patient WHERE FName = "Jane" AND LName = "Doe" AND DOB = "1990-03-22"


-- @block
INSERT INTO `appointment` (`dentistID`, `patientID`, `Date`, `Start_time`, `End_time`, `officeID`, `staffID`, `Appointment_type`, `Appointment_status`, `Cancellation_reason`, `Primary_approval`, `is_active`) VALUES
(1, 5, '2024-03-01', '09:00:00', '10:00:00', 1, 1, 'Cleaning', 'Completed', NULL, 'Approved', TRUE),
(1, 5, '2024-03-04', '09:00:00', '10:00:00', 1, 1, 'Cleaning', 'Completed', NULL, 'Approved', TRUE),
(2, 12, '2024-03-02', '10:30:00', '11:30:00', 2, 2, 'Extraction', 'Scheduled', NULL, 'Pending', TRUE),
(1, 7, '2024-03-03', '11:00:00', '12:00:00', 1, 1, 'Whitening', 'Completed', NULL, 'Approved', TRUE),
(3, 18, '2024-03-04', '14:00:00', '15:00:00', 1, 1, 'Root Canal', 'Scheduled', NULL, 'Pending', TRUE),
(2, 3, '2024-03-05', '09:30:00', '10:30:00', 1, 2, 'Cleaning', 'Completed', NULL, 'Approved', TRUE),
(1, 13, '2024-03-06', '12:30:00', '13:30:00', 2, 1, 'Extraction', 'Scheduled', NULL, 'Pending', TRUE),
(3, 9, '2024-03-07', '13:00:00', '14:00:00', 1, 2, 'Cleaning', 'Completed', NULL, 'Approved', TRUE),
(2, 10, '2024-03-08', '14:30:00', '15:30:00', 2, 1, 'Whitening', 'Scheduled', NULL, 'Pending', TRUE),
(1, 6, '2024-03-09', '15:00:00', '16:00:00', 2, 2, 'Root Canal', 'Completed', NULL, 'Approved', TRUE),
(3, 4, '2024-03-10', '11:30:00', '12:30:00', 1, 1, 'Extraction', 'Scheduled', NULL, 'Pending', TRUE),
(1, 15, '2024-03-11', '10:00:00', '11:00:00', 2, 2, 'Cleaning', 'Completed', NULL, 'Approved', TRUE),
(2, 11, '2024-03-12', '12:00:00', '13:00:00', 1, 1, 'Root Canal', 'Scheduled', NULL, 'Pending', TRUE),
(3, 16, '2024-03-13', '15:30:00', '16:30:00', 1, 2, 'Whitening', 'Completed', NULL, 'Approved', TRUE),
(1, 2, '2024-03-14', '09:30:00', '10:30:00', 2, 1, 'Cleaning', 'Scheduled', NULL, 'Pending', TRUE),
(2, 8, '2024-03-15', '14:00:00', '15:00:00', 1, 2, 'Extraction', 'Completed', NULL, 'Approved', TRUE),
(3, 1, '2024-03-16', '10:30:00', '11:30:00', 2, 1, 'Root Canal', 'Scheduled', NULL, 'Pending', TRUE),
(1, 17, '2024-03-17', '12:00:00', '13:00:00', 1, 1, 'Whitening', 'Completed', NULL, 'Approved', TRUE),
(2, 14, '2024-03-18', '09:00:00', '10:00:00', 2, 2, 'Cleaning', 'Scheduled', NULL, 'Pending', TRUE),
(3, 5, '2024-03-19', '14:30:00', '15:30:00', 1, 1, 'Extraction', 'Completed', NULL, 'Approved', TRUE),
(1, 18, '2024-03-20', '11:30:00', '12:30:00', 2, 2, 'Root Canal', 'Scheduled', NULL, 'Pending', TRUE),
(2, 3, '2024-03-21', '13:00:00', '14:00:00', 1, 1, 'Whitening', 'Completed', NULL, 'Approved', TRUE);


-- @block
INSERT INTO `appointment` (`dentistID`, `patientID`, `Date`, `Start_time`, `End_time`, `officeID`, `staffID`, `Appointment_type`, `Appointment_status`, `Cancellation_reason`, `Primary_approval`, `is_active`) VALUES
(1, 5, '2024-03-04', '09:00:00', '10:00:00', 1, 1, 'Cleaning', 'Completed', NULL, 'Approved', TRUE)