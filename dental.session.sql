-- @block
-- Dummy data for the patient table
INSERT INTO patient (Policy_number, Insurance_Company_Name, Gender, FName, LName, DOB, Email, Phone_num, Address) VALUES
('P003', 'Ameritas', 'Male', 'David', 'Wilson', '1990-07-15', 'david.wilson@example.com', '1234567890', '789 Maple St'),
('P004', 'Humana', 'Female', 'Sarah', 'Johnson', '1988-03-25', 'sarah.johnson@example.com', '1234567890', '101 Elm St');

-- @block
-- Dummy data for the appointment table
INSERT INTO appointment (dentistID, patientID, Date, Start_time, End_time, officeID, Appointment_type, Appointment_status) VALUES
(1, 3, '2024-04-21', '11:00:00', '12:00:00', 1, 'Cleaning', 'Scheduled'),
(2, 4, '2024-04-22', '09:00:00', '10:00:00', 2, 'Whitening', 'Scheduled');

-- @block
-- Dummy data for the patient table
INSERT INTO patient (Policy_number, Insurance_Company_Name, Gender, FName, LName, DOB, Email, Phone_num, Address) VALUES
('P005', 'Anthem', 'Male', 'Michael', 'Brown', '1985-09-10', 'michael.brown@example.com', '1234567890', '456 Oak St'),
('P006', 'Guardian', 'Female', 'Emily', 'Davis', '1992-05-20', 'emily.davis@example.com', '1234567890', '222 Pine St'),
('P007', 'Ameritas', 'Male', 'Christopher', 'Martinez', '1979-12-03', 'christopher.martinez@example.com', '1234567890', '789 Cedar St'),
('P008', 'Spirit Dental', 'Female', 'Jessica', 'Lopez', '1980-08-17', 'jessica.lopez@example.com', '1234567890', '321 Birch St'),
('P009', 'Anthem', 'Male', 'Daniel', 'Garcia', '1995-03-08', 'daniel.garcia@example.com', '1234567890', '111 Walnut St');

-- @block
-- Dummy data for the appointment table
INSERT INTO appointment (dentistID, patientID, Date, Start_time, End_time, officeID, Appointment_type, Appointment_status) VALUES
(1, 5, '2024-04-23', '14:00:00', '15:00:00', 1, 'Extraction', 'Scheduled'),
(2, 6, '2024-04-24', '10:30:00', '11:30:00', 2, 'Root Canal', 'Scheduled'),
(3, 7, '2024-04-25', '11:30:00', '12:30:00', 1, 'Cleaning', 'Scheduled'),
(1, 8, '2024-04-26', '13:00:00', '14:00:00', 2, 'Whitening', 'Scheduled'),
(2, 9, '2024-04-27', '15:30:00', '16:30:00', 1, 'Extraction', 'Scheduled');

-- @block
-- Dummy data for the patient table
INSERT INTO patient (Policy_number, Insurance_Company_Name, Gender, FName, LName, DOB, Email, Phone_num, Address) VALUES
('P010', 'Humana', 'Male', 'David', 'Rodriguez', '1988-07-15', 'david.rodriguez@example.com', '1234567890', '789 Elm St'),
('P011', 'Anthem', 'Female', 'Ashley', 'Wilson', '1975-11-28', 'ashley.wilson@example.com', '1234567890', '987 Maple St'),
('P012', 'Ameritas', 'Male', 'James', 'Taylor', '1990-02-12', 'james.taylor@example.com', '1234567890', '654 Pine St'),
('P013', 'Spirit Dental', 'Female', 'Sarah', 'Anderson', '1983-04-30', 'sarah.anderson@example.com', '1234567890', '321 Oak St'),
('P014', 'Guardian', 'Male', 'John', 'Thomas', '1970-09-03', 'john.thomas@example.com', '1234567890', '555 Walnut St');

-- @block
-- Dummy data for the appointment table
INSERT INTO appointment (dentistID, patientID, Date, Start_time, End_time, officeID, Appointment_type, Appointment_status) VALUES
(3, 10, '2024-04-28', '09:00:00', '10:00:00', 2, 'Cleaning', 'Scheduled'),
(4, 11, '2024-04-29', '14:30:00', '15:30:00', 1, 'Whitening', 'Scheduled'),
(5, 12, '2024-04-30', '16:00:00', '17:00:00', 2, 'Extraction', 'Scheduled'),
(1, 13, '2024-05-01', '10:00:00', '11:00:00', 1, 'Root Canal', 'Scheduled'),
(2, 14, '2024-05-02', '13:30:00', '14:30:00', 2, 'Cleaning', 'Scheduled');
