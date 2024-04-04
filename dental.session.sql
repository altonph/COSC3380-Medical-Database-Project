-- Simulating non specialist appointment

-- @block Inserting offices
INSERT INTO office (officeID, office_address, Phone_num, email) VALUES
(1, '123 Main St', '1234567890', 'office1@example.com'),
(2, '456 Elm St', '0987654321', 'office2@example.com');

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

-- @block
SELECT * FROM patient;

-- @block Inserting insurance
INSERT INTO insurance (Policy_number, Insurance_Company_Name) VALUES ('ABCDE123456789', 'Dental Insurance Inc.');

-- @block Updating patient's insurance
UPDATE patient SET Policy_number = 'ABCDE123456789' WHERE patientID = 1;

-- @block Scheduling an appointment
INSERT INTO appointment (dentistID, patientID, Date, Start_time, officeID, staffID, Appointment_type, Appointment_status, is_active) VALUES
(1, 1, '2024-04-10', '09:00:00', 1, NULL, 'Checkup', 'Scheduled', TRUE);

-- @block
SELECT * FROM appointment;

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

-- @block Linking general dentist to office 1
INSERT INTO office_dentist (officeID, dentistID) VALUES (1, 1);

-- @block Linking endodontist to office 2
INSERT INTO office_dentist (officeID, dentistID) VALUES (2, 2);

-- @block Creating a schedule for the general dentist at office 1
INSERT INTO schedule (officeID, dentistID, Monday, Tuesday, Wednesday, Thursday, Friday) VALUES
(1, 1, TRUE, TRUE, TRUE, TRUE, TRUE);

-- @block Creating a schedule for the endodontist at office 2
INSERT INTO schedule (officeID, dentistID, Monday, Tuesday, Wednesday, Thursday, Friday) VALUES
(2, 2, TRUE, TRUE, TRUE, TRUE, TRUE);

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
SELECT * FROM invoice;

