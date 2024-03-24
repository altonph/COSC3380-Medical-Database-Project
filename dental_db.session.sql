-- @block delete all data
DELETE FROM office;
DELETE FROM dentist;
DELETE FROM staff;
DELETE FROM insurance;
DELETE FROM patient;
DELETE FROM schedule;
DELETE FROM appointment;
DELETE FROM prescription;
DELETE FROM invoice;
DELETE FROM medical_records;
DELETE FROM visit_details;
DELETE FROM login;

-- @block display all data
SELECT * FROM office;
SELECT * FROM dentist;
SELECT * FROM staff;
SELECT * FROM insurance;
SELECT * FROM patient;
SELECT * FROM schedule;
SELECT * FROM appointment;
SELECT * FROM prescription;
SELECT * FROM invoice;
SELECT * FROM medical_records;
SELECT * FROM visit_details;
SELECT * FROM login;

-- @block delete all offices
DELETE * FROM office;

-- @block generate 3 random offices
INSERT INTO office (`officeID`, `office_address`, `Phone_num`, `email`)
VALUES 
  (1, '123 Main Street', '555-1234', 'office1@example.com'),
  (2, '456 Elm Street', '555-5678', 'office2@example.com'),
  (3, '789 Oak Street', '555-9012', 'office3@example.com');

-- @block display all data
SELECT * FROM office;

-- @block delete all dentists

-- @block generate 10 random dentists
INSERT INTO dentist (`officeID`, `FName`, `LName`, `Specialty`, `Email`, `Phone_num`, `Address`, `DOB`, `Start_date`, `End_date`, `Is_active`, `Salary`)
VALUES 
  (1, 'John', 'Doe', 'General Dentistry', 'john.doe@example.com', '555-1234', '123 Main Street', '1980-01-01', '2020-01-01', NULL, TRUE, 60000),
  (2, 'Jane', 'Smith', 'Orthodontics', 'jane.smith@example.com', '555-5678', '456 Elm Street', '1985-05-15', '2018-07-01', NULL, TRUE, 70000),
  (3, 'Michael', 'Johnson', 'Pediatric Dentistry', 'michael.johnson@example.com', '555-9012', '789 Oak Street', '1976-09-20', '2015-03-10', NULL, TRUE, 65000),
  (1, 'Emily', 'Williams', 'Endodontics', 'emily.williams@example.com', '555-3456', '456 Pine Street', '1990-11-30', '2019-02-15', NULL, TRUE, 75000),
  (2, 'David', 'Brown', 'Prosthodontics', 'david.brown@example.com', '555-7890', '789 Maple Street', '1982-03-25', '2017-09-05', NULL, TRUE, 80000),
  (3, 'Sarah', 'Jones', 'Oral Surgery', 'sarah.jones@example.com', '555-2345', '234 Cedar Street', '1988-07-10', '2021-04-20', NULL, TRUE, 70000),
  (1, 'Christopher', 'Miller', 'Periodontics', 'christopher.miller@example.com', '555-6789', '567 Oak Street', '1974-12-18', '2014-06-30', NULL, TRUE, 75000),
  (2, 'Amanda', 'Davis', 'General Dentistry', 'amanda.davis@example.com', '555-1234', '789 Elm Street', '1987-04-05', '2016-10-10', NULL, TRUE, 70000),
  (3, 'Matthew', 'Wilson', 'Orthodontics', 'matthew.wilson@example.com', '555-5678', '123 Maple Street', '1983-08-12', '2019-11-25', NULL, TRUE, 80000),
  (1, 'Jessica', 'Taylor', 'Pediatric Dentistry', 'jessica.taylor@example.com', '555-9012', '456 Cedar Street', '1989-02-28', '2018-03-15', NULL, TRUE, 65000);

-- @block display all dentists
SELECT * FROM dentist;

-- @block deletes all staff
SELECT * FROM staff;

-- @block generate 40 random staff members
INSERT INTO staff (`officeID`, `Fname`, `Lname`, `Email`, `Phone_num`, `DOB`, `Address`, `Position`, `Start_date`, `End_date`, `Is_active`, `Salary`)
VALUES 
  (1, 'John', 'Doe', 'john.doe@example.com', '555-1234', '1990-01-01', '123 Main Street', 'Checkup', '2020-01-01', NULL, TRUE, 45000),
  (2, 'Jane', 'Smith', 'jane.smith@example.com', '555-5678', '1992-05-15', '456 Elm Street', 'Cleaning', '2018-07-01', NULL, TRUE, 40000),
  (3, 'Michael', 'Johnson', 'michael.johnson@example.com', '555-9012', '1985-09-20', '789 Oak Street', 'Checkup', '2015-03-10', NULL, TRUE, 50000),
  (1, 'Emily', 'Williams', 'emily.williams@example.com', '555-3456', '1988-11-30', '456 Pine Street', 'Cleaning', '2019-02-15', NULL, TRUE, 42000),
  (2, 'David', 'Brown', 'david.brown@example.com', '555-7890', '1993-03-25', '789 Maple Street', 'Checkup', '2017-09-05', NULL, TRUE, 48000),
  (3, 'Sarah', 'Jones', 'sarah.jones@example.com', '555-2345', '1991-07-10', '234 Cedar Street', 'Cleaning', '2021-04-20', NULL, TRUE, 40000),
  (1, 'Christopher', 'Miller', 'christopher.miller@example.com', '555-6789', '1980-12-18', '567 Oak Street', 'Checkup', '2014-06-30', NULL, TRUE, 47000),
  (2, 'Amanda', 'Davis', 'amanda.davis@example.com', '555-1234', '1987-04-05', '789 Elm Street', 'Cleaning', '2016-10-10', NULL, TRUE, 43000),
  (3, 'Matthew', 'Wilson', 'matthew.wilson@example.com', '555-5678', '1994-08-12', '123 Maple Street', 'Checkup', '2019-11-25', NULL, TRUE, 46000),
  (1, 'Jessica', 'Taylor', 'jessica.taylor@example.com', '555-9012', '1989-02-28', '456 Cedar Street', 'Cleaning', '2018-03-15', NULL, TRUE, 42000),
  (2, 'Ryan', 'Martinez', 'ryan.martinez@example.com', '555-3456', '1995-06-15', '789 Oak Street', 'Checkup', '2020-02-01', NULL, TRUE, 48000),
  (3, 'Emma', 'Garcia', 'emma.garcia@example.com', '555-7890', '1986-09-10', '234 Cedar Street', 'Cleaning', '2017-10-20', NULL, TRUE, 41000),
  (1, 'Daniel', 'Hernandez', 'daniel.hernandez@example.com', '555-2345', '1990-04-25', '567 Pine Street', 'Checkup', '2019-05-10', NULL, TRUE, 47000),
  (2, 'Olivia', 'Lopez', 'olivia.lopez@example.com', '555-6789', '1984-08-20', '789 Elm Street', 'Cleaning', '2016-11-15', NULL, TRUE, 42000),
  (3, 'Mason', 'Gonzalez', 'mason.gonzalez@example.com', '555-1234', '1996-12-05', '123 Oak Street', 'Checkup', '2021-01-05', NULL, TRUE, 49000),
  (1, 'Sophia', 'Perez', 'sophia.perez@example.com', '555-5678', '1983-07-08', '456 Cedar Street', 'Cleaning', '2018-04-20', NULL, TRUE, 43000),
  (2, 'Logan', 'Rodriguez', 'logan.rodriguez@example.com', '555-9012', '1992-01-30', '789 Pine Street', 'Checkup', '2016-09-30', NULL, TRUE, 46000),
  (3, 'Isabella', 'Hernandez', 'isabella.hernandez@example.com', '555-3456', '1985-05-25', '234 Elm Street', 'Cleaning', '2017-03-10', NULL, TRUE, 44000),
  (1, 'Alexander', 'Martinez', 'alexander.martinez@example.com', '555-7890', '1993-10-10', '567 Cedar Street', 'Checkup', '2020-05-15', NULL, TRUE, 47000),
  (2, 'Madison', 'Gonzalez', 'madison.gonzalez@example.com', '555-2345', '1988-02-15', '789 Oak Street', 'Cleaning', '2018-07-30', NULL, TRUE, 42000),
  (3, 'Benjamin', 'Wilson', 'benjamin.wilson@example.com', '555-6789', '1994-06-20', '234 Pine Street', 'Checkup', '2021-08-10', NULL, TRUE, 48000),
  (1, 'Evelyn', 'Taylor', 'evelyn.taylor@example.com', '555-1234', '1989-03-05', '567 Elm Street', 'Cleaning', '2017-11-25', NULL, TRUE, 43000),
  (2, 'Gabriel', 'Rodriguez', 'gabriel.rodriguez@example.com', '555-5678', '1996-08-12', '789 Cedar Street', 'Checkup', '2020-12-30', NULL, TRUE, 45000),
  (3, 'Avery', 'Lopez', 'avery.lopez@example.com', '555-9012', '1982-12-18', '123 Maple Street', 'Cleaning', '2018-05-05', NULL, TRUE, 41000),
  (1, 'Leah', 'Torres', 'leah.torres@example.com', '555-3456', '1991-04-10', '456 Oak Street', 'Checkup', '2020-01-20', NULL, TRUE, 46000),
  (2, 'Henry', 'Perez', 'henry.perez@example.com', '555-7890', '1997-09-15', '789 Pine Street', 'Cleaning', '2019-07-10', NULL, TRUE, 42000),
  (3, 'Samantha', 'Sanchez', 'samantha.sanchez@example.com', '555-2345', '1986-02-28', '234 Elm Street', 'Checkup', '2017-11-05', NULL, TRUE, 47000),
  (1, 'Joseph', 'Gutierrez', 'joseph.gutierrez@example.com', '555-6789', '1992-07-25', '567 Cedar Street', 'Cleaning', '2020-03-15', NULL, TRUE, 44000),
  (2, 'Natalie', 'Torres', 'natalie.torres@example.com', '555-1234', '1985-11-30', '789 Oak Street', 'Checkup', '2018-09-20', NULL, TRUE, 45000),
  (3, 'Wyatt', 'Gomez', 'wyatt.gomez@example.com', '555-5678', '1994-05-15', '123 Maple Street', 'Cleaning', '2020-06-10', NULL, TRUE, 43000),
  (1, 'Lily', 'Ramirez', 'lily.ramirez@example.com', '555-9012', '1988-08-20', '456 Pine Street', 'Checkup', '2019-05-30', NULL, TRUE, 46000),
  (2, 'Jack', 'Torres', 'jack.torres@example.com', '555-3456', '1996-02-10', '789 Elm Street', 'Cleaning', '2020-08-15', NULL, TRUE, 42000),
  (3, 'Lillian', 'Sanchez', 'lillian.sanchez@example.com', '555-7890', '1983-05-25', '234 Cedar Street', 'Checkup', '2018-12-20', NULL, TRUE, 47000),
  (1, 'Luke', 'Gonzalez', 'luke.gonzalez@example.com', '555-2345', '1990-10-10', '567 Pine Street', 'Cleaning', '2020-04-25', NULL, TRUE, 44000),
  (2, 'Grace', 'Ramirez', 'grace.ramirez@example.com', '555-6789', '1987-03-05', '789 Oak Street', 'Checkup', '2019-09-10', NULL, TRUE, 45000),
  (3, 'Jaxon', 'Vargas', 'jaxon.vargas@example.com', '555-1234', '1994-08-25', '123 Elm Street', 'Cleaning', '2021-01-15', NULL, TRUE, 43000),
  (1, 'Scarlett', 'Cruz', 'scarlett.cruz@example.com', '555-5678', '1982-12-30', '456 Cedar Street', 'Checkup', '2019-06-20', NULL, TRUE, 46000),
  (2, 'Madelyn', 'Vargas', 'madelyn.vargas@example.com', '555-9012', '1996-06-15', '789 Pine Street', 'Cleaning', '2020-09-25', NULL, TRUE, 42000),
  (3, 'Bentley', 'Cruz', 'bentley.cruz@example.com', '555-3456', '1985-11-10', '234 Elm Street', 'Checkup', '2018-10-10', NULL, TRUE, 47000);

-- @block display all staff members
SELECT * FROM staff;

-- @block deletes all insurance
DELETE * FROM insurance;

-- @block generate 10 random insurances
INSERT INTO insurance (`Insurance_Company_Name`, `Policy_number`)
VALUES 
  ('ABC Insurance', 'ABC123456'),
  ('XYZ Insurance', 'XYZ789012'),
  ('Insurance Co.', 'INS456789'),
  ('Global Insurance', 'GLB123456'),
  ('National Insurers', 'NAT987654'),
  ('Mega Insurance', 'MEGA456789'),
  ('Secure Insurance', 'SEC123456'),
  ('SureCover Insurance', 'SCV789012'),
  ('Guardian Insurance', 'GDN456789'),
  ('SafeHands Insurance', 'SHI123456');

-- @block display all insurances
SELECT * FROM insurance;

-- @block generate 100 random patients
INSERT INTO patient (insuranceID, dentistID, Gender, FName, LName, DOB, Email, Phone_num, Address) VALUES
(3, 10, 'Male', 'John', 'Doe', '1985-02-15', 'johndoe@example.com', '1234567890', '123 Main St'),
(4, 11, 'Female', 'Jane', 'Smith', '1990-07-20', 'janesmith@example.com', '2345678901', '456 Oak St'),
(5, 12, 'Male', 'Michael', 'Johnson', '1982-11-10', 'michaeljohnson@example.com', '3456789012', '789 Elm St'),
(6, 13, 'Female', 'Emily', 'Brown', '1976-04-25', 'emilybrown@example.com', '4567890123', '101 Pine St'),
(7, 14, 'Male', 'Daniel', 'Martinez', '1988-09-18', 'danielmartinez@example.com', '5678901234', '202 Cedar St'),
(8, 15, 'Female', 'Sarah', 'Taylor', '1995-12-30', 'sarahtaylor@example.com', '6789012345', '303 Maple St'),
(9, 16, 'Male', 'Christopher', 'Anderson', '1972-03-08', 'christopheranderson@example.com', '7890123456', '404 Birch St'),
(10, 17, 'Female', 'Jessica', 'Thomas', '1980-06-12', 'jessicathomas@example.com', '8901234567', '505 Walnut St'),
(11, 18, 'Male', 'Matthew', 'Hernandez', '1992-08-05', 'matthewhernandez@example.com', '9012345678', '606 Oakwood Ave'),
(12, 19, 'Female', 'Amanda', 'Garcia', '1987-01-28', 'amandagarcia@example.com', '0123456789', '707 Cedar Ave'),
(3, 10, 'Male', 'David', 'Rodriguez', '1984-03-14', 'davidrodriguez@example.com', '1234567890', '808 Pine Ave'),
(4, 11, 'Female', 'Michelle', 'Lopez', '1978-05-22', 'michellelopez@example.com', '2345678901', '909 Maple Ave'),
(5, 12, 'Male', 'James', 'Perez', '1993-10-17', 'jamesperez@example.com', '3456789012', '1010 Elm Ave'),
(6, 13, 'Female', 'Ashley', 'Wang', '1981-12-03', 'ashleywang@example.com', '4567890123', '1111 Oak Ave'),
(7, 14, 'Male', 'Kevin', 'Kim', '1975-08-29', 'kevinkim@example.com', '5678901234', '1212 Cedar Ave'),
(8, 15, 'Female', 'Nicole', 'Nguyen', '1990-02-11', 'nicolenguyen@example.com', '6789012345', '1313 Pine Ave'),
(9, 16, 'Male', 'Justin', 'Lee', '1989-04-07', 'justinlee@example.com', '7890123456', '1414 Maple Ave'),
(10, 17, 'Female', 'Stephanie', 'Patel', '1983-07-19', 'stephaniepatel@example.com', '8901234567', '1515 Elm Ave'),
(11, 18, 'Male', 'Andrew', 'Singh', '1977-09-24', 'andrewsingh@example.com', '9012345678', '1616 Oakwood Dr'),
(12, 19, 'Female', 'Melissa', 'Jones', '1994-11-05', 'melissajones@example.com', '0123456789', '1717 Cedar Dr'),
(3, 10, 'Male', 'Robert', 'Brown', '1986-01-09', 'robertbrown@example.com', '1234567890', '1818 Pine Dr'),
(4, 11, 'Female', 'Kimberly', 'Harris', '1979-03-28', 'kimberlyharris@example.com', '2345678901', '1919 Maple Dr'),
(5, 12, 'Male', 'William', 'Clark', '1991-06-15', 'williamclark@example.com', '3456789012', '2020 Elm Dr'),
(6, 13, 'Female', 'Laura', 'Lewis', '1982-09-10', 'lauralewis@example.com', '4567890123', '2121 Oak Dr'),
(7, 14, 'Male', 'Mark', 'Walker', '1973-12-22', 'markwalker@example.com', '5678901234', '2222 Cedar Dr'),
(8, 15, 'Female', 'Lauren', 'Young', '1996-02-28', 'laurenyoung@example.com', '6789012345', '2323 Pine Dr'),
(9, 16, 'Male', 'Jonathan', 'Hall', '1971-04-19', 'jonathanhall@example.com', '7890123456', '2424 Maple Dr'),
(10, 17, 'Female', 'Rachel', 'Wright', '1984-07-08', 'rachelwright@example.com', '8901234567', '2525 Elm Dr'),
(11, 18, 'Male', 'Ryan', 'King', '1976-09-30', 'ryanking@example.com', '9012345678', '2626 Oakwood Ct'),
(12, 19, 'Female', 'Rebecca', 'Scott', '1993-11-12', 'rebeccascott@example.com', '0123456789', '2727 Cedar Ct'),
(3, 10, 'Male', 'Edward', 'Green', '1983-02-18', 'edwardgreen@example.com', '1234567890', '2828 Pine Ct'),
(4, 11, 'Female', 'Victoria', 'Baker', '1977-04-06', 'victoriabaker@example.com', '2345678901', '2929 Maple Ct'),
(5, 12, 'Male', 'George', 'Gonzalez', '1990-07-25', 'georgegonzalez@example.com', '3456789012', '3030 Elm Ct'),
(6, 13, 'Female', 'Catherine', 'Nelson', '1985-10-14', 'catherinenelson@example.com', '4567890123', '3131 Oak Ct'),
(7, 14, 'Male', 'Benjamin', 'Carter', '1978-12-31', 'benjamincarter@example.com', '5678901234', '3232 Cedar Ct'),
(8, 15, 'Female', 'Hannah', 'Adams', '1994-02-05', 'hannahadams@example.com', '6789012345', '3333 Pine Ct'),
(9, 16, 'Male', 'Jeffrey', 'Hill', '1972-04-23', 'jeffreyhill@example.com', '7890123456', '3434 Maple Ct'),
(10, 17, 'Female', 'Christina', 'Campbell', '1987-07-15', 'christinacampbell@example.com', '8901234567', '3535 Elm Ct'),
(11, 18, 'Male', 'Patrick', 'Mitchell', '1975-09-17', 'patrickmitchell@example.com', '9012345678', '3636 Oakwood Ln'),
(12, 19, 'Female', 'Katherine', 'Roberts', '1992-11-08', 'katherineroberts@example.com', '0123456789', '3737 Cedar Ln'),
(3, 10, 'Male', 'Charles', 'Cook', '1980-01-22', 'charlescook@example.com', '1234567890', '3838 Pine Ln'),
(4, 11, 'Female', 'Alexandra', 'James', '1976-03-19', 'alexandrajames@example.com', '2345678901', '3939 Maple Ln'),
(5, 12, 'Male', 'Steven', 'Phillips', '1989-06-10', 'stevenphillips@example.com', '3456789012', '4040 Elm Ln'),
(6, 13, 'Female', 'Samantha', 'Evans', '1984-09-03', 'samanthaevans@example.com', '4567890123', '4141 Oak Ln'),
(7, 14, 'Male', 'Nicholas', 'Turner', '1979-12-17', 'nicholasturner@example.com', '5678901234', '4242 Cedar Ln'),
(8, 15, 'Female', 'Megan', 'Parker', '1995-02-28', 'meganparker@example.com', '6789012345', '4343 Pine Ln'),
(9, 16, 'Male', 'Dylan', 'Edwards', '1973-04-11', 'dylanedwards@example.com', '7890123456', '4444 Maple Ln'),
(10, 17, 'Female', 'Vanessa', 'Morris', '1988-07-03', 'vanessamorris@example.com', '8901234567', '4545 Elm Ln'),
(11, 18, 'Male', 'Tyler', 'Gomez', '1977-09-26', 'tylergomez@example.com', '9012345678', '4646 Oakwood Pl'),
(12, 19, 'Female', 'Alyssa', 'Bailey', '1994-11-07', 'alyssabailey@example.com', '0123456789', '4747 Cedar Pl'),
(3, 10, 'Male', 'Joseph', 'Rivera', '1981-02-20', 'josephrivera@example.com', '1234567890', '4848 Pine Pl'),
(4, 11, 'Female', 'Madison', 'Wright', '1978-04-07', 'madisonwright@example.com', '2345678901', '4949 Maple Pl'),
(5, 12, 'Male', 'Thomas', 'Mitchell', '1991-07-30', 'thomasmitchell@example.com', '3456789012', '5050 Elm Pl'),
(6, 13, 'Female', 'Jennifer', 'Adams', '1980-10-19', 'jenniferadams@example.com', '4567890123', '5151 Oak Pl'),
(7, 14, 'Male', 'Isaac', 'Baker', '1975-12-22', 'isaacbaker@example.com', '5678901234', '5252 Cedar Pl'),
(8, 15, 'Female', 'Evelyn', 'Gonzalez', '1990-02-12', 'evelyngonzalez@example.com', '6789012345', '5353 Pine Pl'),
(9, 16, 'Male', 'Luke', 'Roberts', '1971-04-22', 'lukeroberts@example.com', '7890123456', '5454 Maple Pl'),
(10, 17, 'Female', 'Olivia', 'Gray', '1985-07-10', 'oliviagray@example.com', '8901234567', '5555 Elm Pl'),
(11, 18, 'Male', 'Gabriel', 'Cook', '1976-09-27', 'gabrielcook@example.com', '9012345678', '5656 Oakwood Ter'),
(12, 19, 'Female', 'Allison', 'Foster', '1992-11-06', 'allisonfoster@example.com', '0123456789', '5757 Cedar Ter');

-- @block
INSERT INTO patient (insuranceID, dentistID, Gender, FName, LName, DOB, Email, Phone_num, Address) VALUES
(3, 10, 'Male', 'Austin', 'Morgan', '1987-03-25', 'austinmorgan@example.com', '1234567890', '5858 Pine Ter'),
(4, 11, 'Female', 'Kayla', 'Ramirez', '1982-05-08', 'kaylaramirez@example.com', '2345678901', '5959 Maple Ter'),
(5, 12, 'Male', 'Christian', 'Reyes', '1993-08-20', 'christianreyes@example.com', '3456789012', '6060 Elm Ter'),
(6, 13, 'Female', 'Grace', 'Russell', '1977-11-15', 'gracerussell@example.com', '4567890123', '6161 Oak Ter'),
(7, 14, 'Male', 'Logan', 'Thompson', '1989-01-08', 'loganthompson@example.com', '5678901234', '6262 Cedar Ter'),
(8, 15, 'Female', 'Amelia', 'White', '1994-03-30', 'ameliawhite@example.com', '6789012345', '6363 Pine Ter'),
(9, 16, 'Male', 'Owen', 'Allen', '1974-06-22', 'owenallen@example.com', '7890123456', '6464 Maple Ter'),
(10, 17, 'Female', 'Ella', 'Martin', '1981-09-14', 'ellamartin@example.com', '8901234567', '6565 Elm Ter'),
(11, 18, 'Male', 'Carter', 'Scott', '1996-11-05', 'carterscott@example.com', '9012345678', '6666 Oakwood Blvd'),
(12, 19, 'Female', 'Chloe', 'Clark', '1980-01-28', 'chloeclark@example.com', '0123456789', '6767 Cedar Blvd'),
(3, 10, 'Male', 'Liam', 'Rodriguez', '1986-03-14', 'liamrodriguez@example.com', '1234567890', '6868 Pine Blvd'),
(4, 11, 'Female', 'Harper', 'Hall', '1978-05-22', 'harperhall@example.com', '2345678901', '6969 Maple Blvd'),
(5, 12, 'Male', 'Mason', 'Wright', '1991-08-17', 'masonwright@example.com', '3456789012', '7070 Elm Blvd'),
(6, 13, 'Female', 'Lily', 'Adams', '1981-12-03', 'lilyadams@example.com', '4567890123', '7171 Oak Blvd'),
(7, 14, 'Male', 'Ethan', 'Perez', '1975-08-29', 'ethanperez@example.com', '5678901234', '7272 Cedar Blvd'),
(8, 15, 'Female', 'Scarlett', 'Gonzalez', '1990-02-11', 'scarlettgonzalez@example.com', '6789012345', '7373 Pine Blvd'),
(9, 16, 'Male', 'Jack', 'Evans', '1989-04-07', 'jackevans@example.com', '7890123456', '7474 Maple Blvd'),
(10, 17, 'Female', 'Hazel', 'Stewart', '1983-07-19', 'hazelstewart@example.com', '8901234567', '7575 Elm Blvd'),
(11, 18, 'Male', 'Jackson', 'Morales', '1977-09-24', 'jacksonmorales@example.com', '9012345678', '7676 Oakwood Pl'),
(12, 19, 'Female', 'Nora', 'Griffin', '1994-11-05', 'noragriffin@example.com', '0123456789', '7777 Cedar Pl'),
(3, 10, 'Male', 'Wyatt', 'Foster', '1983-02-18', 'wyattfoster@example.com', '1234567890', '7878 Pine Pl'),
(4, 11, 'Female', 'Zoey', 'Chavez', '1977-04-06', 'zoeyschavez@example.com', '2345678901', '7979 Maple Pl'),
(5, 12, 'Male', 'Henry', 'Gibson', '1990-07-25', 'henrygibson@example.com', '3456789012', '8080 Elm Pl'),
(6, 13, 'Female', 'Leah', 'Bryant', '1985-10-14', 'leahbryant@example.com', '4567890123', '8181 Oak Pl'),
(7, 14, 'Male', 'Sebastian', 'Lawrence', '1978-12-31', 'sebastianlawrence@example.com', '5678901234', '8282 Cedar Pl'),
(8, 15, 'Female', 'Audrey', 'Weaver', '1995-02-28', 'audreyweaver@example.com', '6789012345', '8383 Pine Pl'),
(9, 16, 'Male', 'Gavin', 'Daniels', '1973-04-11', 'gavindaniels@example.com', '7890123456', '8484 Maple Pl'),
(10, 17, 'Female', 'Aria', 'Banks', '1988-07-03', 'ariabanks@example.com', '8901234567', '8585 Elm Pl'),
(11, 18, 'Male', 'Brayden', 'Russell', '1976-09-27', 'braydenrussell@example.com', '9012345678', '8686 Oakwood Ter'),
(12, 19, 'Female', 'Ellie', 'Meyer', '1992-11-06', 'elliemeyer@example.com', '0123456789', '8787 Cedar Ter'),
(3, 10, 'Male', 'Luke', 'Harrison', '1980-01-22', 'lukeharrison@example.com', '1234567890', '8888 Pine Ter'),
(4, 11, 'Female', 'Avery', 'Ford', '1976-03-19', 'averyford@example.com', '2345678901', '8989 Maple Ter'),
(5, 12, 'Male', 'Caleb', 'Reed', '1989-06-10', 'calebreed@example.com', '3456789012', '9090 Elm Ter'),
(6, 13, 'Female', 'Addison', 'Spencer', '1984-09-03', 'addisonspencer@example.com', '4567890123', '9191 Oak Ter'),
(7, 14, 'Male', 'Xavier', 'Burton', '1979-12-17', 'xavierburton@example.com', '5678901234', '9292 Cedar Ter'),
(8, 15, 'Female', 'Aubrey', 'Fuller', '1994-02-05', 'aubreyfuller@example.com', '6789012345', '9393 Pine Ter'),
(9, 16, 'Male', 'Brady', 'Webb', '1971-04-22', 'bradywebb@example.com', '7890123456', '9494 Maple Ter'),
(10, 17, 'Female', 'Brooklyn', 'Wheeler', '1985-07-10', 'brooklynwheeler@example.com', '8901234567', '9595 Elm Ter'),
(11, 18, 'Male', 'Julian', 'Nichols', '1976-09-27', 'juliannichols@example.com', '9012345678', '9696 Oakwood Blvd'),
(12, 19, 'Female', 'Madelyn', 'Holt', '1992-11-06', 'madelynholt@example.com', '0123456789', '9797 Cedar Blvd');

-- @block display all patients
SELECT * FROM patient;

-- @block insert schedules
INSERT INTO schedule (dentistID, Day) VALUES
(10, 'Monday'),
(11, 'Monday'),
(12, 'Monday'),
(13, 'Monday'),
(14, 'Monday'),
(15, 'Monday'),
(16, 'Monday'),
(17, 'Monday'),
(18, 'Monday'),
(19, 'Monday'),
(10, 'Tuesday'),
(11, 'Tuesday'),
(12, 'Tuesday'),
(13, 'Tuesday'),
(14, 'Tuesday'),
(15, 'Tuesday'),
(16, 'Tuesday'),
(17, 'Tuesday'),
(18, 'Tuesday'),
(19, 'Tuesday'),
(10, 'Wednesday'),
(11, 'Wednesday'),
(12, 'Wednesday'),
(13, 'Wednesday'),
(14, 'Wednesday'),
(15, 'Wednesday'),
(16, 'Wednesday'),
(17, 'Wednesday'),
(18, 'Wednesday'),
(19, 'Wednesday'),
(10, 'Thursday'),
(11, 'Thursday'),
(12, 'Thursday'),
(13, 'Thursday'),
(14, 'Thursday'),
(15, 'Thursday'),
(16, 'Thursday'),
(17, 'Thursday'),
(18, 'Thursday'),
(19, 'Thursday'),
(10, 'Friday'),
(11, 'Friday'),
(12, 'Friday'),
(13, 'Friday'),
(14, 'Friday'),
(15, 'Friday'),
(16, 'Friday'),
(17, 'Friday'),
(18, 'Friday'),
(19, 'Friday');

-- @block display schedules
SELECT * FROM schedule;

-- @block insert Appointments
INSERT INTO appointment (officeID, dentistID, staffID, patientID, Date, Start_time, End_time, Appointment_Type, Appointment_Status, Cancellation_Reason, Specialist_Approval, Is_active) VALUES
(1, 10, 3, 304, '2023-12-25', '08:00:00', '09:00:00', 'Checkup', 'Scheduled', NULL, false, true),
(2, 11, 4, 305, '2023-11-15', '09:00:00', '10:00:00', 'Cleaning', 'Scheduled', NULL, false, true),
(3, 12, 5, 306, '2023-10-10', '10:00:00', '11:00:00', 'Filling', 'Scheduled', NULL, false, true),
(1, 13, 6, 307, '2023-09-05', '11:00:00', '12:00:00', 'Extraction', 'Scheduled', NULL, false, true),
(2, 14, 7, 308, '2023-08-20', '12:00:00', '13:00:00', 'Root Canal', 'Scheduled', NULL, false, true),
(3, 15, 8, 309, '2023-07-15', '13:00:00', '14:00:00', 'Checkup', 'Scheduled', NULL, false, true),
(1, 16, 9, 310, '2023-06-10', '14:00:00', '15:00:00', 'Cleaning', 'Scheduled', NULL, false, true),
(2, 17, 10, 311, '2023-05-05', '15:00:00', '16:00:00', 'Filling', 'Scheduled', NULL, false, true),
(3, 18, 11, 312, '2023-04-25', '08:00:00', '09:00:00', 'Extraction', 'Scheduled', NULL, false, true),
(1, 19, 12, 313, '2023-03-20', '09:00:00', '10:00:00', 'Root Canal', 'Scheduled', NULL, false, true),
(2, 10, 13, 314, '2023-02-15', '10:00:00', '11:00:00', 'Checkup', 'Scheduled', NULL, false, true),
(3, 11, 14, 315, '2023-01-10', '11:00:00', '12:00:00', 'Cleaning', 'Scheduled', NULL, false, true),
(1, 12, 15, 316, '2022-12-05', '12:00:00', '13:00:00', 'Filling', 'Scheduled', NULL, false, true),
(2, 13, 16, 317, '2022-11-20', '13:00:00', '14:00:00', 'Extraction', 'Scheduled', NULL, false, true),
(3, 14, 17, 318, '2022-10-15', '14:00:00', '15:00:00', 'Root Canal', 'Scheduled', NULL, false, true),
(1, 15, 18, 319, '2022-09-10', '15:00:00', '16:00:00', 'Checkup', 'Scheduled', NULL, false, true),
(2, 16, 19, 320, '2022-08-05', '08:00:00', '09:00:00', 'Cleaning', 'Scheduled', NULL, false, true),
(3, 17, 20, 321, '2022-07-01', '09:00:00', '10:00:00', 'Filling', 'Scheduled', NULL, false, true),
(1, 18, 21, 322, '2022-06-20', '10:00:00', '11:00:00', 'Extraction', 'Scheduled', NULL, false, true),
(2, 19, 22, 323, '2022-05-15', '11:00:00', '12:00:00', 'Root Canal', 'Scheduled', NULL, false, true),
(3, 10, 23, 324, '2022-04-10', '12:00:00', '13:00:00', 'Checkup', 'Scheduled', NULL, false, true),
(1, 11, 24, 325, '2022-03-05', '13:00:00', '14:00:00', 'Cleaning', 'Scheduled', NULL, false, true),
(2, 12, 25, 326, '2022-02-01', '14:00:00', '15:00:00', 'Filling', 'Scheduled', NULL, false, true),
(3, 13, 26, 327, '2022-01-25', '15:00:00', '16:00:00', 'Extraction', 'Scheduled', NULL, false, true),
(1, 14, 27, 328, '2021-12-20', '08:00:00', '09:00:00', 'Root Canal', 'Scheduled', NULL, false, true),
(2, 15, 28, 329, '2021-11-15', '09:00:00', '10:00:00', 'Checkup', 'Scheduled', NULL, false, true),
(3, 16, 29, 330, '2021-10-10', '10:00:00', '11:00:00', 'Cleaning', 'Scheduled', NULL, false, true),
(1, 17, 30, 331, '2021-09-05', '11:00:00', '12:00:00', 'Filling', 'Scheduled', NULL, false, true),
(2, 18, 31, 332, '2021-08-01', '12:00:00', '13:00:00', 'Extraction', 'Scheduled', NULL, false, true),
(3, 19, 32, 333, '2021-07-01', '13:00:00', '14:00:00', 'Root Canal', 'Scheduled', NULL, false, true),
(1, 10, 33, 334, '2021-06-20', '14:00:00', '15:00:00', 'Checkup', 'Scheduled', NULL, false, true),
(2, 11, 34, 335, '2021-05-15', '15:00:00', '16:00:00', 'Cleaning', 'Scheduled', NULL, false, true),
(3, 12, 35, 336, '2021-04-10', '08:00:00', '09:00:00', 'Filling', 'Scheduled', NULL, false, true),
(1, 13, 36, 337, '2021-03-05', '09:00:00', '10:00:00', 'Extraction', 'Scheduled', NULL, false, true),
(2, 14, 37, 338, '2021-02-01', '10:00:00', '11:00:00', 'Root Canal', 'Scheduled', NULL, false, true),
(3, 15, 38, 339, '2021-01-25', '11:00:00', '12:00:00', 'Checkup', 'Scheduled', NULL, false, true),
(1, 16, 39, 340, '2020-12-20', '12:00:00', '13:00:00', 'Cleaning', 'Scheduled', NULL, false, true),
(2, 17, 40, 341, '2020-11-15', '13:00:00', '14:00:00', 'Filling', 'Scheduled', NULL, false, true),
(3, 18, 41, 342, '2020-10-10', '14:00:00', '15:00:00', 'Extraction', 'Scheduled', NULL, false, true),
(1, 19, 4, 343, '2020-09-05', '15:00:00', '16:00:00', 'Root Canal', 'Scheduled', NULL, false, true),
(2, 10, 10, 344, '2020-08-01', '08:00:00', '09:00:00', 'Checkup', 'Scheduled', NULL, false, true),
(3, 11, 17, 345, '2020-07-01', '09:00:00', '10:00:00', 'Cleaning', 'Scheduled', NULL, false, true),
(1, 12, 19, 346, '2020-06-20', '10:00:00', '11:00:00', 'Filling', 'Scheduled', NULL, false, true),
(2, 13, 8, 347, '2020-05-15', '11:00:00', '12:00:00', 'Extraction', 'Scheduled', NULL, false, true),
(3, 14, 37, 348, '2020-04-10', '12:00:00', '13:00:00', 'Root Canal', 'Scheduled', NULL, false, true),
(1, 15, 25, 349, '2020-03-05', '13:00:00', '14:00:00', 'Checkup', 'Scheduled', NULL, false, true),
(2, 16, 13, 350, '2020-02-01', '14:00:00', '15:00:00', 'Cleaning', 'Scheduled', NULL, false, true),
(3, 17, 24, 351, '2020-01-25', '15:00:00', '16:00:00', 'Filling', 'Scheduled', NULL, false, true);

-- @block 
SELECT * FROM appointment;

-- @block
INSERT INTO visit_details (dentistID, Visit_Type, Diagnosis, Treatment, Notes) VALUES
(10, 'Initial Visit', 'Tooth decay detected', 'Fillings', 'Patient requires regular checkups'),
(11, 'Follow-up Visit', 'Gingivitis', 'Deep cleaning', 'Prescribed mouthwash for home use'),
(12, 'Routine Checkup', 'Cavity in molar tooth', 'Filling', 'Advised to avoid sugary foods'),
(13, 'Emergency Visit', 'Impacted wisdom tooth', 'Extraction', 'Scheduled follow-up for removal'),
(14, 'Consultation', 'Infected tooth pulp', 'Root canal therapy', 'Prescribed antibiotics for infection'),
(15, 'Routine Checkup', 'Healthy gums and teeth', 'Cleaning', 'Reminder for next checkup in 6 months'),
(16, 'Routine Checkup', 'Minor tartar buildup', 'Cleaning', 'Advised on proper oral hygiene techniques'),
(17, 'Follow-up Visit', 'Tooth sensitivity', 'Fluoride treatment', 'Suggested using desensitizing toothpaste'),
(18, 'Initial Visit', 'Tooth fracture detected', 'Extraction', 'Discussed options for tooth replacement'),
(19, 'Routine Checkup', 'Healthy gums and teeth', 'Checkup', 'No further treatment required'),
(10, 'Follow-up Visit', 'Minor cavity', 'Filling', 'Reviewed proper brushing and flossing techniques'),
(11, 'Routine Checkup', 'Gum inflammation', 'Cleaning', 'Advised on proper gum care techniques'),
(12, 'Consultation', 'Toothache', 'Extraction', 'Scheduled for extraction in next visit'),
(13, 'Routine Checkup', 'No significant issues', 'Checkup', 'Next appointment scheduled in 6 months'),
(14, 'Emergency Visit', 'Broken tooth', 'Root canal therapy', 'Treatment completed successfully'),
(15, 'Routine Checkup', 'Gingivitis', 'Deep cleaning', 'Prescribed mouthwash for home use'),
(16, 'Initial Visit', 'Tooth decay detected', 'Fillings', 'Scheduled follow-up for additional treatment'),
(17, 'Follow-up Visit', 'Tooth sensitivity', 'Fluoride treatment', 'Suggested using desensitizing toothpaste'),
(18, 'Routine Checkup', 'Healthy gums and teeth', 'Checkup', 'No further treatment required'),
(19, 'Consultation', 'Misaligned teeth', 'Orthodontic evaluation', 'Discussed options for braces treatment'),
(10, 'Routine Checkup', 'Minor tartar buildup', 'Cleaning', 'Advised on proper oral hygiene techniques'),
(11, 'Follow-up Visit', 'Tooth sensitivity', 'Fluoride treatment', 'Suggested using desensitizing toothpaste'),
(12, 'Initial Visit', 'Tooth fracture detected', 'Extraction', 'Discussed options for tooth replacement'),
(13, 'Routine Checkup', 'Healthy gums and teeth', 'Checkup', 'Next appointment scheduled in 6 months'),
(14, 'Emergency Visit', 'Severe toothache', 'Emergency extraction', 'Immediate relief provided'),
(15, 'Routine Checkup', 'Gum inflammation', 'Cleaning', 'Advised on proper gum care techniques'),
(16, 'Consultation', 'Toothache', 'Extraction', 'Scheduled for extraction in next visit'),
(17, 'Routine Checkup', 'No significant issues', 'Checkup', 'Next appointment scheduled in 6 months'),
(18, 'Emergency Visit', 'Broken tooth', 'Root canal therapy', 'Treatment completed successfully'),
(19, 'Routine Checkup', 'Healthy gums and teeth', 'Checkup', 'No further treatment required'),
(10, 'Follow-up Visit', 'Minor cavity', 'Filling', 'Reviewed proper brushing and flossing techniques'),
(11, 'Routine Checkup', 'Gum inflammation', 'Cleaning', 'Advised on proper gum care techniques'),
(12, 'Consultation', 'Toothache', 'Extraction', 'Scheduled for extraction in next visit'),
(13, 'Routine Checkup', 'No significant issues', 'Checkup', 'Next appointment scheduled in 6 months'),
(14, 'Emergency Visit', 'Broken tooth', 'Root canal therapy', 'Treatment completed successfully'),
(15, 'Routine Checkup', 'Gingivitis', 'Deep cleaning', 'Prescribed mouthwash for home use'),
(16, 'Initial Visit', 'Tooth decay detected', 'Fillings', 'Scheduled follow-up for additional treatment'),
(17, 'Follow-up Visit', 'Tooth sensitivity', 'Fluoride treatment', 'Suggested using desensitizing toothpaste'),
(18, 'Routine Checkup', 'Healthy gums and teeth', 'Checkup', 'No further treatment required'),
(19, 'Consultation', 'Misaligned teeth', 'Orthodontic evaluation', 'Discussed options for braces treatment'),
(10, 'Routine Checkup', 'Minor tartar buildup', 'Cleaning', 'Advised on proper oral hygiene techniques'),
(11, 'Follow-up Visit', 'Tooth sensitivity', 'Fluoride treatment', 'Suggested using desensitizing toothpaste'),
(12, 'Initial Visit', 'Tooth fracture detected', 'Extraction', 'Discussed options for tooth replacement'),
(13, 'Routine Checkup', 'Healthy gums and teeth', 'Checkup', 'Next appointment scheduled in 6 months'),
(14, 'Emergency Visit', 'Severe toothache', 'Emergency extraction', 'Immediate relief provided'),
(15, 'Routine Checkup', 'Gum inflammation', 'Cleaning', 'Advised on proper gum care techniques'),
(16, 'Consultation', 'Toothache', 'Extraction', 'Scheduled for extraction in next visit'),
(17, 'Routine Checkup', 'No significant issues', 'Checkup', 'Next appointment scheduled in 6 months'),
(18, 'Emergency Visit', 'Broken tooth', 'Root canal therapy', 'Treatment completed successfully'),
(19, 'Routine Checkup', 'Healthy gums and teeth', 'Checkup', 'No further treatment required');

-- @block 
SELECT * FROM visit_details

-- @block
INSERT INTO medical_records (patientID, dentistID, visitID, Date_Created, Allergies, Height, Weight, Notes)
VALUES
(304, 10, 53, '2023-12-25', 'None', 170, 65, 'Routine checkup, patient in good health'),
(305, 11, 54, '2023-11-15', 'None', 165, 60, 'Mild gum bleeding reported, advised proper oral hygiene'),
(306, 12, 55, '2023-10-10', 'None', 175, 70, 'Cavity detected in molar tooth, filling recommended'),
(307, 13, 56, '2023-09-05', 'None', 168, 68, 'Scheduled for impacted wisdom tooth extraction'),
(308, 14, 57, '2023-08-20', 'None', 172, 67, 'Root canal therapy completed successfully'),
(309, 15, 58, '2023-07-15', 'None', 166, 62, 'Regular cleaning performed, next appointment in 6 months'),
(310, 16, 59, '2023-06-10', 'None', 174, 69, 'Minor tartar buildup observed, advised proper brushing'),
(311, 17, 60, '2023-05-05', 'None', 169, 66, 'Filling for minor cavity performed'),
(312, 18, 61, '2023-04-25', 'None', 171, 64, 'Tooth extraction recommended for fractured tooth'),
(313, 19, 62, '2023-03-20', 'None', 167, 63, 'Routine checkup, no issues reported'),
(314, 10, 63, '2023-02-15', 'None', 173, 68, 'No cavities detected, advised on oral hygiene'),
(315, 11, 64, '2023-01-10', 'None', 168, 65, 'Cleaning performed, patient instructed on flossing'),
(316, 12, 65, '2022-12-05', 'None', 175, 71, 'Filling for minor cavity recommended'),
(317, 13, 66, '2022-11-20', 'None', 166, 62, 'Tooth extraction scheduled for next visit'),
(318, 14, 67, '2022-10-15', 'None', 172, 67, 'Root canal therapy completed successfully'),
(319, 15, 68, '2022-09-10', 'None', 164, 59, 'Routine checkup, patient in good health'),
(320, 16, 69, '2022-08-05', 'None', 170, 64, 'Minor tartar buildup, advised proper brushing'),
(321, 17, 70, '2022-07-01', 'None', 168, 63, 'Fluoride treatment for tooth sensitivity recommended'),
(322, 18, 71, '2022-06-20', 'None', 174, 68, 'Tooth extraction recommended for fractured tooth'),
(323, 19, 72, '2022-05-15', 'None', 167, 62, 'Routine checkup, no issues reported'),
(324, 10, 73, '2022-04-10', 'None', 173, 67, 'No cavities detected, advised on oral hygiene'),
(325, 11, 74, '2022-03-05', 'None', 169, 65, 'Cleaning performed, patient instructed on flossing'),
(326, 12, 75, '2022-02-01', 'None', 176, 72, 'Filling for minor cavity recommended'),
(327, 13, 76, '2022-01-25', 'None', 167, 61, 'Tooth extraction scheduled for next visit'),
(328, 14, 77, '2021-12-20', 'None', 173, 66, 'Root canal therapy completed successfully'),
(329, 15, 78, '2021-11-15', 'None', 165, 60, 'Routine checkup, patient in good health'),
(330, 16, 79, '2021-10-10', 'None', 171, 64, 'Minor tartar buildup, advised proper brushing'),
(331, 17, 80, '2021-09-05', 'None', 169, 63, 'Fluoride treatment for tooth sensitivity recommended'),
(332, 18, 81, '2021-08-01', 'None', 175, 69, 'Tooth extraction recommended for fractured tooth'),
(333, 19, 82, '2021-07-01', 'None', 168, 62, 'Routine checkup, no issues reported'),
(334, 10, 83, '2021-06-20', 'None', 174, 68, 'No cavities detected, advised on oral hygiene'),
(335, 11, 84, '2021-05-15', 'None', 170, 65, 'Cleaning performed, patient instructed on flossing'),
(336, 12, 85, '2021-04-10', 'None', 177, 73, 'Filling for minor cavity recommended'),
(337, 13, 86, '2021-03-05', 'None', 168, 61, 'Tooth extraction scheduled for next visit'),
(338, 14, 87, '2021-02-01', 'None', 174, 66, 'Root canal therapy completed successfully'),
(339, 15, 88, '2021-01-25', 'None', 166, 60, 'Routine checkup, patient in good health'),
(340, 16, 89, '2020-12-20', 'None', 172, 65, 'Minor tartar buildup, advised proper brushing'),
(341, 17, 90, '2020-11-15', 'None', 170, 64, 'Fluoride treatment for tooth sensitivity recommended'),
(342, 18, 91, '2020-10-10', 'None', 176, 70, 'Tooth extraction recommended for fractured tooth'),
(343, 19, 92, '2020-09-05', 'None', 169, 63, 'Routine checkup, no issues reported'),
(344, 10, 93, '2020-08-01', 'None', 175, 69, 'No cavities detected, advised on oral hygiene'),
(345, 11, 94, '2020-07-01', 'None', 171, 66, 'Cleaning performed, patient instructed on flossing'),
(346, 12, 95, '2020-06-20', 'None', 178, 74, 'Filling for minor cavity recommended'),
(347, 13, 96, '2020-05-15', 'None', 169, 62, 'Tooth extraction scheduled for next visit'),
(348, 14, 97, '2020-04-10', 'None', 175, 67, 'Root canal therapy completed successfully'),
(349, 15, 98, '2020-03-05', 'None', 167, 61, 'Routine checkup, patient in good health'),
(350, 16, 99, '2020-02-01', 'None', 173, 66, 'Minor tartar buildup, advised proper brushing'),
(351, 17, 100, '2020-01-25', 'None', 171, 65, 'Fluoride treatment for tooth sensitivity recommended');

-- @block
SELECT * FROM medical_records;