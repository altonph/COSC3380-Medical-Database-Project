-- Simulating non specialist appointment

-- @block Inserting offices
INSERT INTO office (officeID, office_address, Phone_num, email) VALUES
(1, '5432 Magnolia Drive', '1234567890', 'office1@shastadental.com'),
(2, '9876 Sunflower Boulevard', '1234567890', 'office2@shastadental.com');

-- @block
SELECT * FROM office;

-- @block Inserting a dentist
INSERT INTO dentist (FName, LName, Specialty, Email, Phone_num, Address, DOB, Start_date, End_date, Is_active, Salary) VALUES
('John', 'Doe', 'General Dentistry', 'john.doe@example.com', '1112223333', '123 Dentist St', '1980-01-01', '2022-01-01', NULL, TRUE, 80000);

-- @block Linking dentist to only one office
INSERT INTO office_dentist (officeID, dentistID) VALUES (1, 1);

-- @block Creating a schedule for the dentist at office 1
INSERT INTO schedule (officeID, dentistID, Monday, Tuesday, Wednesday, Thursday, Friday) VALUES
(1, 1, TRUE, TRUE, TRUE, TRUE, TRUE);

-- @block Inserting a staff member
INSERT INTO staff (officeID, Fname, Lname, Email, Phone_num, DOB, Address, Position, Start_date, End_date, Is_active, Salary) VALUES
(1, 'Jane', 'Smith', 'jane.smith@example.com', '9998887777', '1990-01-01', '456 Staff St', 'Receptionist', '2022-01-01', NULL, TRUE, 50000);

-- @block Inserting a patient
INSERT INTO patient (Gender, FName, LName, DOB, Email, Phone_num, Address) VALUES
('Male', 'Alex', 'Johnson', '1995-01-01', 'alex.johnson@example.com', '7776665555', '789 Patient St');


-- @block Inserting insurance
INSERT INTO insurance (Policy_number, Insurance_Company_Name) VALUES ('ABCDE123456789', 'Dental Insurance Inc.');

-- @block Updating patient's insurance
UPDATE patient SET Policy_number = 'ABCDE123456789' WHERE patientID = 1;

-- @block Scheduling an appointment
INSERT INTO appointment (dentistID, patientID, Date, Start_time, officeID, staffID, Appointment_type, Appointment_status, is_active) VALUES
(1, 1, '2024-04-10', '09:00:00', 1, NULL, 'Checkup', 'Scheduled', TRUE);

-- @block Dentist adding a staff member to an appointment
UPDATE appointment SET staffID = 1 WHERE dentistID = 1 AND patientID = 1 AND Date = '2024-04-10' AND Start_time = '09:00:00';

-- @block Inserting medical record if it's the patient's first appointment
INSERT INTO medical_records (patientID, Date_Created, Allergies, Feet, Inches, Weight, Notes) VALUES
(1, '2024-04-10', 'None', 5, 9, 160, 'First visit');

-- @block Inserting visit details
INSERT INTO visit_details (patientID, dentistID, Visit_Type, Diagnosis, Treatment, Notes) VALUES
(1, 1, 'Checkup', 'No significant issues found', 'Routine cleaning', 'Patient scheduled for next visit in 6 months');

-- @block Generating an invoice with 20% off co-pay if insurance policy exists
INSERT INTO invoice (Policy_number, patientID, visitID, Date, Description, Total_Amount, Paid_Amount) 
VALUES ('ABCDE123456789', 1, 1, '2024-04-10', 'Routine cleaning', 100.00, 0.00);

-- @block
SELECT * FROM invoice;

-- @block Updating the Total_Amount to reflect the discount
UPDATE invoice SET Total_Amount = Total_Amount * 0.8 WHERE Policy_number IS NOT NULL;

-- @block Updating the Paid_Amount to reflect Total_Amount
UPDATE invoice SET Paid_Amount = Total_Amount WHERE Policy_number IS NOT NULL;


-- Simulating primary approval for appointment

-- @block
-- Create the trigger
CREATE TRIGGER root_canal_approval_trigger BEFORE UPDATE ON appointment
FOR EACH ROW
BEGIN
    -- Check if the Appointment_type is 'Root Canal' and Primary_approval is 'Approved'
    IF NEW.Appointment_type = 'Root Canal' AND NEW.Primary_approval = 'Approved' THEN
        -- Update the dentistID to the ID of the endodontist (specialist)
        SET NEW.dentistID = (SELECT dentistID FROM dentist WHERE Specialty = 'Endodontist');
    END IF;
END;

-- @block Inserting offices
INSERT INTO office (officeID, office_address, Phone_num, email) VALUES
(1, '123 Main St', '1234567890', 'office1@example.com'),
(2, '456 Elm St', '0987654321', 'office2@example.com');

-- @block Inserting a general dentist
INSERT INTO dentist (FName, LName, Specialty, Email, Phone_num, Address, DOB, Start_date, End_date, Is_active, Salary) VALUES
('John', 'Doe', 'General Dentistry', 'john.doe@example.com', '1112223333', '123 Dentist St', '1980-01-01', '2022-01-01', NULL, TRUE, 80000);

-- @block Inserting an endodontist
INSERT INTO dentist (FName, LName, Specialty, Email, Phone_num, Address, DOB, Start_date, End_date, Is_active, Salary) VALUES
('Emily', 'Smith', 'Endodontist', 'emily.smith@example.com', '4445556666', '456 Root Canal St', '1985-01-01', '2022-01-01', NULL, TRUE, 90000);

-- @block Inserting a general dentist
INSERT INTO dentist (FName, LName, Specialty, Email, Phone_num, Address, DOB, Start_date, End_date, Is_active, Salary) VALUES
('Alton', 'Phan', 'General Dentistry', 'alton@example.com', '1111111111', '123 Alton St', '2003-07-24', '2024-01-01', NULL, TRUE, 100000);

-- @block Linking general dentist to office 1
INSERT INTO office_dentist (officeID, dentistID) VALUES (1, 1);

-- @block Linking endodontist to office 2
INSERT INTO office_dentist (officeID, dentistID) VALUES (2, 2);

-- @block Linking general dentist to office both
INSERT INTO office_dentist (officeID, dentistID) VALUES (1, 3);
INSERT INTO office_dentist (officeID, dentistID) VALUES (2, 3);

-- @block Creating a schedule for the general dentist at office 1
INSERT INTO schedule (officeID, dentistID, Monday, Tuesday, Wednesday, Thursday, Friday) VALUES
(1, 1, TRUE, TRUE, TRUE, TRUE, TRUE);

-- @block Creating a schedule for the endodontist at office 2
INSERT INTO schedule (officeID, dentistID, Monday, Tuesday, Wednesday, Thursday, Friday) VALUES
(2, 2, TRUE, TRUE, TRUE, TRUE, TRUE);

-- @block Creating a schedule for the dentist at office both
INSERT INTO schedule (officeID, dentistID, Monday, Tuesday, Wednesday, Thursday, Friday) VALUES
(1, 3, TRUE, FALSE, FALSE, FALSE, TRUE);
INSERT INTO schedule (officeID, dentistID, Monday, Tuesday, Wednesday, Thursday, Friday) VALUES
(2, 3, FALSE, TRUE, TRUE, TRUE, FALSE);

-- @block
UPDATE schedule
SET Monday = TRUE
WHERE dentistID = 3
AND officeID = 2; -- Phoenix office


-- @block Inserting a staff member
INSERT INTO staff (officeID, Fname, Lname, Email, Phone_num, DOB, Address, Position, Start_date, End_date, Is_active, Salary) VALUES
(1, 'Jane', 'Smith', 'jane.smith@example.com', '9998887777', '1990-01-01', '456 Staff St', 'Receptionist', '2022-01-01', NULL, TRUE, 50000);

-- @block Inserting a patient
INSERT INTO patient (Gender, FName, LName, DOB, Email, Phone_num, Address) VALUES
('Male', 'Alex', 'Johnson', '1995-01-01', 'alex.johnson@example.com', '7776665555', '789 Patient St');

-- @block Inserting insurance
INSERT INTO insurance (Policy_number, Insurance_Company_Name) VALUES ('ABCDE123456789', 'Dental Insurance Inc.');

-- @block Updating patient's insurance
UPDATE patient SET Policy_number = 'ABCDE123456789' WHERE patientID = 1;

-- @block Scheduling an appointment for a root canal
INSERT INTO appointment (dentistID, patientID, Date, Start_time, officeID, staffID, Appointment_type, Appointment_status, Primary_approval, is_active) VALUES
(1, 1, '2024-04-10', '09:00:00', 1, NULL, 'Root Canal', 'Scheduled', 'Pending', TRUE);

-- @block
SELECT * FROM appointment;

-- @block Dentist approves the appointment and selects the endodontist
UPDATE appointment SET Primary_approval = 'Approved' WHERE dentistID = 1 AND patientID = 1 AND Date = '2024-04-10' AND Start_time = '09:00:00';

-- @block Generating an invoice for the root canal procedure
INSERT INTO invoice (Policy_number, patientID, visitID, Date, Description, Total_Amount, Paid_Amount) 
VALUES ('ABCDE123456789', 1, 1, '2024-04-10', 'Root Canal Procedure', 1000.00, 0.00);

-- @block Updating the Total_Amount to reflect the discount if insurance exists
UPDATE invoice SET Total_Amount = Total_Amount * 0.8 WHERE Policy_number IS NOT NULL;

-- @block Updating the Paid_Amount to reflect Total_Amount
UPDATE invoice SET Paid_Amount = Total_Amount WHERE Policy_number IS NOT NULL;

-- @block
-- Inserting dentist 2 with General Dentistry specialty
INSERT INTO dentist (FName, LName, Specialty, Email, Phone_num, Address, DOB, Start_date, Salary) 
VALUES ('John', 'Doe', 'General Dentistry', 'john.doe@example.com', '1234567890', '123 Main St, Anytown, USA', '1985-05-15', '2020-01-01', 80000);
-- Inserting dentist 3 with General Dentistry specialty
INSERT INTO dentist (FName, LName, Specialty, Email, Phone_num, Address, DOB, Start_date, Salary) 
VALUES ('Jane', 'Smith', 'General Dentistry', 'jane.smith@example.com', '9876543210', '456 Oak St, Othertown, USA', '1980-10-20', '2019-05-01', 75000);
-- Inserting dentist 4 with Endodontist specialty
INSERT INTO dentist (FName, LName, Specialty, Email, Phone_num, Address, DOB, Start_date, Salary) 
VALUES ('Michael', 'Johnson', 'Endodontist', 'michael.johnson@example.com', '5551234567', '789 Elm St, Anycity, USA', '1978-12-10', '2018-03-15', 90000);

-- @block
-- Inserting dentist 2 into office 1
INSERT INTO office_dentist (officeID, dentistID) VALUES (1, 2);
-- Inserting dentist 3 into office 1
INSERT INTO office_dentist (officeID, dentistID) VALUES (1, 3);
-- Inserting dentist 4 into office 2
INSERT INTO office_dentist (officeID, dentistID) VALUES (2, 4);

-- @block
-- Inserting schedule for dentist 2 at office 1 (assuming Monday and Wednesday)
INSERT INTO schedule (officeID, dentistID, Monday, Wednesday) VALUES (1, 2, TRUE, TRUE);
-- Inserting schedule for dentist 3 at office 1 (assuming Tuesday and Thursday)
INSERT INTO schedule (officeID, dentistID, Tuesday, Thursday) VALUES (1, 3, TRUE, TRUE);
-- Inserting schedule for dentist 4 at office 2 (assuming Monday and Friday)
INSERT INTO schedule (officeID, dentistID, Monday, Friday) VALUES (2, 4, TRUE, TRUE);

-- @block
INSERT INTO dentist (FName, LName, Specialty, Email, Phone_num, Address, DOB, Start_date, Salary) 
VALUES ('John', 'Doe', 'General Dentistry', 'john.doe@example.com', '1234567891', '123 Main St', '1985-05-15', '2020-01-01', 80000);





-- testing apppointments data report
-- @block Inserting dentists
INSERT INTO dentist (FName, LName, Specialty, Email, Phone_num, Address, DOB, Start_date, End_date, Is_active, Salary) VALUES
('John', 'Doe', 'General Dentistry', 'john.doe@example.com', '1112223333', '123 Dentist St', '1980-01-01', '2022-01-01', NULL, TRUE, 80000),
('Jane', 'Smith', 'Endodontist', 'jane.smith@example.com', '4445556666', '456 Root Canal Blvd', '1975-03-15', '2023-06-01', NULL, TRUE, 90000),
('Michael', 'Johnson', 'General Dentistry', 'michael.johnson@example.com', '7778889999', '789 Molar Ave', '1983-07-20', '2021-12-15', NULL, TRUE, 85000),
('Sarah', 'Clark', 'General Dentistry', 'sarah.clark@example.com', '3332221111', '789 Cavity St', '1985-09-10', '2024-03-01', NULL, TRUE, 82000);

-- @block Linking dentists to offices
INSERT INTO office_dentist (officeID, dentistID) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4); -- Linking the new dentist to office 2

-- @block Creating schedules for dentists
INSERT INTO schedule (officeID, dentistID, Monday, Tuesday, Wednesday, Thursday, Friday) VALUES
(1, 1, TRUE, TRUE, TRUE, TRUE, TRUE),
(1, 2, TRUE, TRUE, TRUE, TRUE, TRUE),
(2, 3, TRUE, TRUE, TRUE, TRUE, TRUE),
(2, 4, TRUE, TRUE, TRUE, TRUE, TRUE); -- Creating a schedule for the new dentist

-- @block Inserting patients
INSERT INTO patient (Gender, FName, LName, DOB, Email, Phone_num, Address) VALUES
('Male', 'Alex', 'Johnson', '1995-01-01', 'alex.johnson@example.com', '7776665555', '789 Patient St'),
('Female', 'Emily', 'Williams', '1988-05-10', 'emily.williams@example.com', '5554443333', '456 Dental Ave'),
('Male', 'David', 'Brown', '1970-11-20', 'david.brown@example.com', '2223334444', '123 Tooth Lane'),
('Female', 'Jessica', 'Lee', '1992-08-15', 'jessica.lee@example.com', '9998887777', '789 Wisdom Blvd'),
('Male', 'Michael', 'Taylor', '1983-03-25', 'michael.taylor@example.com', '3332221111', '456 Smile St'),
('Female', 'Sophia', 'Anderson', '1990-09-12', 'sophia.anderson@example.com', '8889990000', '123 Brush Lane'),
('Male', 'James', 'Wilson', '1975-06-18', 'james.wilson@example.com', '4445556666', '789 Floss Ave'),
('Female', 'Olivia', 'Martinez', '1987-12-03', 'olivia.martinez@example.com', '1112223333', '456 Dental Blvd');

-- @block Scheduling appointments for patients
INSERT INTO appointment (dentistID, patientID, Date, Start_time, End_time, officeID, staffID, Appointment_type, Appointment_status, is_active) VALUES
(1, 1, '2024-04-10', '09:00:00', '10:00:00', 1, NULL, 'Cleaning', 'Scheduled', TRUE),
(2, 2, '2024-04-12', '10:00:00', '11:00:00', 1, NULL, 'Root Canal', 'Scheduled', TRUE),
(3, 3, '2024-04-15', '11:00:00', '12:00:00', 2, NULL, 'Cleaning', 'Scheduled', TRUE),
(1, 4, '2024-04-20', '13:00:00', '14:00:00', 1, NULL, 'Extraction', 'Cancelled', FALSE),
(2, 5, '2024-04-22', '14:00:00', '15:00:00', 1, NULL, 'Root Canal', 'Cancelled', FALSE),
(3, 6, '2024-04-25', '15:00:00', '16:00:00', 2, NULL, 'Cleaning', 'Completed', FALSE),
(4, 7, '2024-04-28', '09:00:00', '10:00:00', 2, NULL, 'Cleaning', 'Completed', FALSE),
(1, 8, '2024-05-01', '11:00:00', '12:00:00', 1, NULL, 'Cleaning', 'Completed', FALSE),
(2, 1, '2024-05-05', '12:00:00', '13:00:00', 1, NULL, 'Root Canal', 'Scheduled', TRUE),
(3, 2, '2024-05-08', '13:00:00', '14:00:00', 2, NULL, 'Root Canal', 'Scheduled', TRUE),
(4, 3, '2024-05-12', '14:00:00', '15:00:00', 2, NULL, 'Whitening', 'Scheduled', TRUE),
(1, 4, '2024-05-15', '15:00:00', '16:00:00', 1, NULL, 'Cleaning', 'Scheduled', TRUE),
(2, 5, '2024-05-18', '09:00:00', '10:00:00', 1, NULL, 'Root Canal', 'Scheduled', TRUE),
(3, 6, '2024-05-22', '10:00:00', '11:00:00', 2, NULL, 'Cleaning', 'Scheduled', TRUE),
(4, 7, '2024-05-25', '11:00:00', '12:00:00', 2, NULL, 'Whitening', 'Scheduled', TRUE),
(1, 8, '2024-05-28', '13:00:00', '14:00:00', 1, NULL, 'Extraction', 'Scheduled', TRUE);


-- @block
SELECT * FROM STAFF;

-- @block
SELECT 
    d.FName AS Dentist_FirstName,
    d.LName AS Dentist_LastName,
    a.Appointment_type,
    a.Start_time,
    a.End_time,
    a.Appointment_status
FROM 
    appointment a
JOIN 
    dentist d ON a.dentistID = d.dentistID;

-- @block
SELECT 
    d.FName AS Dentist_FirstName,
    d.LName AS Dentist_LastName,
    a.Appointment_type,
    a.Start_time,
    a.End_time,
    a.Appointment_status
FROM 
    appointment a
JOIN 
    dentist d ON a.dentistID = d.dentistID
WHERE 
    a.officeID = 1;


-- @block
SELECT 
    d.FName AS Dentist_FirstName,
    d.LName AS Dentist_LastName,
    a.Appointment_type,
    a.Start_time,
    a.End_time,
    a.Appointment_status
FROM 
    appointment a
JOIN 
    dentist d ON a.dentistID = d.dentistID
WHERE 
    (a.Date BETWEEN '2024-04-15' AND '2024-04-25');

-- @block
SELECT 
    d.FName AS Dentist_FirstName,
    d.LName AS Dentist_LastName,
    a.Appointment_type,
    a.Start_time,
    a.End_time,
    a.Appointment_status
FROM 
    appointment a
JOIN 
    dentist d ON a.dentistID = d.dentistID
WHERE 
    a.Appointment_status = 'Scheduled';

-- @block
SELECT 
    d.FName AS Dentist_FirstName,
    d.LName AS Dentist_LastName,
    a.Appointment_type,
    a.Start_time,
    a.End_time,
    a.Appointment_status
FROM 
    appointment a
JOIN 
    dentist d ON a.dentistID = d.dentistID
WHERE 
    d.Specialty = 'General Dentistry';

-- @block
SELECT 
    d.FName AS Dentist_FirstName,
    d.LName AS Dentist_LastName,
    a.Appointment_type,
    a.Start_time,
    a.End_time,
    a.Appointment_status
FROM 
    appointment a
JOIN 
    dentist d ON a.dentistID = d.dentistID
LEFT JOIN 
    office o ON a.officeID = o.officeID
WHERE 
    (@office_id IS NULL OR a.officeID = @office_id)
    AND (@start_date IS NULL OR a.Date >= @start_date)
    AND (@end_date IS NULL OR a.Date <= @end_date)
    AND (@status IS NULL OR a.Appointment_status = @status)
    AND (@specialty IS NULL OR d.Specialty = @specialty)


-- @block Main Query
SELECT
    d.FName AS Dentist_FirstName,
    d.LName AS Dentist_LastName,
    a.Appointment_type,
    a.Start_time,
    a.End_time,
    a.Appointment_status,
    COUNT(*) AS Total_Appointments
FROM 
    appointment a
JOIN 
    dentist d ON a.dentistID = d.dentistID
LEFT JOIN 
    office o ON a.officeID = o.officeID
WHERE 
    (@office_id IS NULL OR a.officeID = @office_id
    AND (@start_date IS NULL OR a.Date >= @start_date)
    AND (@end_date IS NULL OR a.Date <= @end_date)
    AND (@status IS NULL OR a.Appointment_status = @status)
    AND (@specialty IS NULL OR d.Specialty = @specialty)
GROUP BY
    d.FName,
    d.LName,
    a.Appointment_type,
    a.Start_time,
    a.End_time,
    a.Appointment_status;

-- @block Percentage Calculations
SELECT 
    CONCAT(ROUND((SUM(CASE WHEN a.Appointment_status = 'Scheduled' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2), '%') AS Percentage_of_Scheduled_Appointments,
    CONCAT(ROUND((SUM(CASE WHEN a.Appointment_status = 'Cancelled' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2), '%') AS Percentage_of_Cancelled_Appointments,
    CONCAT(ROUND((SUM(CASE WHEN a.Appointment_status = 'Completed' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2), '%') AS Percentage_of_Completed_Appointments
FROM 
    appointment a
JOIN 
    dentist d ON a.dentistID = d.dentistID
LEFT JOIN 
    office o ON a.officeID = o.officeID
WHERE 
    (@office_id IS NULL OR a.officeID = @office_id)
    AND (@start_date IS NULL OR a.Date >= @start_date)
    AND (@end_date IS NULL OR a.Date <= @end_date)
    AND (@status IS NULL OR a.Appointment_status = @status)
    AND (@specialty IS NULL OR d.Specialty = @specialty);


