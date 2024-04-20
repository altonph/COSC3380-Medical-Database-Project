-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: dental_database
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `dentistID` int NOT NULL,
  `patientID` int NOT NULL,
  `Date` date NOT NULL,
  `Start_time` time NOT NULL,
  `End_time` time DEFAULT NULL,
  `officeID` int NOT NULL,
  `staffID` int DEFAULT NULL,
  `Appointment_type` enum('Cleaning','Whitening','Extraction','Root Canal') DEFAULT NULL,
  `Appointment_status` enum('Scheduled','Cancelled','Completed') NOT NULL,
  `Cancellation_reason` varchar(255) DEFAULT NULL,
  `Primary_approval` enum('Pending','Approved','Denied') DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`dentistID`,`patientID`,`Date`,`Start_time`),
  KEY `officeID` (`officeID`),
  KEY `staffID` (`staffID`),
  KEY `patientID` (`patientID`),
  CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`officeID`) REFERENCES `office` (`officeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`dentistID`) REFERENCES `dentist` (`dentistID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `appointment_ibfk_3` FOREIGN KEY (`staffID`) REFERENCES `staff` (`staffID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `appointment_ibfk_4` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `prevent_overlapping_appointments` BEFORE INSERT ON `appointment` FOR EACH ROW BEGIN
    DECLARE appointment_count INT;
    
    SELECT COUNT(*) INTO appointment_count
    FROM appointment
    WHERE dentistID = NEW.dentistID
    AND Date = NEW.Date
    AND Appointment_Status <> 'Cancelled'  
    AND ((NEW.Start_time > Start_time AND NEW.Start_time < End_time)
         OR (NEW.End_time > Start_time AND NEW.End_time < End_time)
         OR (NEW.Start_time <= Start_time AND NEW.End_time >= End_time));
    
    IF appointment_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Appointment time overlaps with an existing non-cancelled appointment for the same dentist.';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `prevent_scheduling_if_denied_approval` BEFORE INSERT ON `appointment` FOR EACH ROW BEGIN
    IF NEW.Primary_approval = 'Denied' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot schedule appointment. The respective specialist has denied this proceduer.';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `dentist`
--

DROP TABLE IF EXISTS `dentist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dentist` (
  `dentistID` int NOT NULL AUTO_INCREMENT,
  `FName` varchar(20) NOT NULL,
  `LName` varchar(20) NOT NULL,
  `Specialty` enum('General Dentistry','Endodontist') DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Phone_num` varchar(10) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `Start_date` date DEFAULT NULL,
  `End_date` date DEFAULT NULL,
  `Is_active` tinyint(1) DEFAULT '1',
  `Salary` int DEFAULT NULL,
  PRIMARY KEY (`dentistID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dentist`
--

LOCK TABLES `dentist` WRITE;
/*!40000 ALTER TABLE `dentist` DISABLE KEYS */;
INSERT INTO `dentist` VALUES (1,'John','Smith','General Dentistry','admin@example.com','1111111111','123 Main Rd','1980-01-01','2024-03-22',NULL,1,100000),(2,'Test','Dentist','General Dentistry','dentist@test.com','2222222222','Test','2001-01-01','2024-01-01',NULL,1,10);
/*!40000 ALTER TABLE `dentist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `invoiceID` int NOT NULL AUTO_INCREMENT,
  `Policy_number` varchar(14) DEFAULT NULL,
  `patientID` int DEFAULT NULL,
  `visitID` int DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Gross_Amount` decimal(10,2) DEFAULT NULL,
  `Insurance_coverage` decimal(10,2) DEFAULT NULL,
  `Net_Amount` decimal(10,2) DEFAULT NULL,
  `Paid_Amount` decimal(10,2) DEFAULT NULL,
  `Is_paid` tinyint(1) DEFAULT '0',
  `cleaning_discount_applied` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`invoiceID`),
  KEY `patientID` (`patientID`),
  KEY `visitID` (`visitID`),
  CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `invoice_ibfk_2` FOREIGN KEY (`visitID`) REFERENCES `visit_details` (`visitID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `cleaning_discount` BEFORE INSERT ON `invoice` FOR EACH ROW BEGIN
    DECLARE cleaning_service INT;
    DECLARE discount DECIMAL(10, 2);

    SELECT COUNT(*)
    INTO cleaning_service
    FROM appointment a
    JOIN visit_details vd ON a.officeID = vd.officeID AND a.patientID = vd.patientID
    WHERE a.Appointment_type = 'Cleaning' AND vd.visitID = NEW.visitID
        AND NOT EXISTS (
            SELECT 1 FROM invoice WHERE patientID = NEW.patientID
        );

    IF cleaning_service = 1 THEN
        SET NEW.cleaning_discount_applied = 1; 
        SET discount = 0.2; -- 20% discount
    ELSE
        SET discount = 0;
    END IF;

    SET NEW.Gross_Amount = NEW.Gross_Amount * (1 - discount); -- Apply discount

    SET NEW.Net_Amount = NEW.Gross_Amount + 20.00; 

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `Username` varchar(50) NOT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `User_role` enum('Patient','Dentist','Staff','Admin') DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `patientID` int DEFAULT NULL,
  `dentistID` int DEFAULT NULL,
  `staffID` int DEFAULT NULL,
  PRIMARY KEY (`Username`),
  UNIQUE KEY `Email` (`Email`),
  KEY `patientID` (`patientID`),
  KEY `dentistID` (`dentistID`),
  KEY `staffID` (`staffID`),
  CONSTRAINT `login_ibfk_1` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `login_ibfk_2` FOREIGN KEY (`dentistID`) REFERENCES `dentist` (`dentistID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `login_ibfk_3` FOREIGN KEY (`staffID`) REFERENCES `staff` (`staffID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES ('administrator','$2b$10$hRwzm7h3Q/cnsJ6M51acwedSpeZPDtBbXc54DqDcCV2xDiSbTvuD.','Admin','admin@example.com',NULL,1,NULL),('dentist','$2b$10$vQ0WpQUqb/pjv6X38v3cDuBOADIIrAYnPygpeYy5HeeIAfXJ22FEq','Dentist','dentist@test.com',NULL,2,NULL),('patient','$2b$10$1JEnyYp2NeNHjkJIT1umm.OOp2u9oKutYbeQztW0iXcKzJaH1eOZu','Patient','patient@test.com',1,NULL,NULL),('staff','$2b$10$ju/XwGUmdTT1w/RIonKU6usIBjuiMMH18/VhcQ2kZlkHZzEXxeAnS','Staff','staff@test.com',NULL,NULL,1);
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medical_records`
--

DROP TABLE IF EXISTS `medical_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_records` (
  `recordsID` int NOT NULL AUTO_INCREMENT,
  `patientID` int DEFAULT NULL,
  `Date_Created` date DEFAULT NULL,
  `Allergies` varchar(255) DEFAULT NULL,
  `Feet` int DEFAULT NULL,
  `Inches` int DEFAULT NULL,
  `Weight` int DEFAULT NULL,
  `Notes` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`recordsID`),
  KEY `patientID` (`patientID`),
  CONSTRAINT `medical_records_ibfk_1` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_records`
--

LOCK TABLES `medical_records` WRITE;
/*!40000 ALTER TABLE `medical_records` DISABLE KEYS */;
/*!40000 ALTER TABLE `medical_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `office`
--

DROP TABLE IF EXISTS `office`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `office` (
  `officeID` int NOT NULL,
  `office_address` varchar(100) DEFAULT NULL,
  `Phone_num` varchar(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`officeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `office`
--

LOCK TABLES `office` WRITE;
/*!40000 ALTER TABLE `office` DISABLE KEYS */;
INSERT INTO `office` VALUES (1,'5432 Magnolia Drive','1234567890','office1@shastadental.com'),(2,'9876 Sunflower Boulevard','1234567890','office2@shastadental.com');
/*!40000 ALTER TABLE `office` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `office_dentist`
--

DROP TABLE IF EXISTS `office_dentist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `office_dentist` (
  `officeID` int NOT NULL,
  `dentistID` int NOT NULL,
  PRIMARY KEY (`officeID`,`dentistID`),
  KEY `dentistID` (`dentistID`),
  CONSTRAINT `office_dentist_ibfk_1` FOREIGN KEY (`officeID`) REFERENCES `office` (`officeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `office_dentist_ibfk_2` FOREIGN KEY (`dentistID`) REFERENCES `dentist` (`dentistID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `office_dentist`
--

LOCK TABLES `office_dentist` WRITE;
/*!40000 ALTER TABLE `office_dentist` DISABLE KEYS */;
INSERT INTO `office_dentist` VALUES (1,1);
/*!40000 ALTER TABLE `office_dentist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `patientID` int NOT NULL AUTO_INCREMENT,
  `Policy_number` varchar(14) DEFAULT NULL,
  `Insurance_Company_Name` enum('Anthem','Guardian','Ameritas','Humana','Spirit Dental') DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `FName` varchar(20) DEFAULT NULL,
  `LName` varchar(20) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Phone_num` varchar(10) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`patientID`),
  UNIQUE KEY `Policy_number` (`Policy_number`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,'ABCDE123456789','Ameritas','Male','Test','Patient','2001-01-01','patient@test.com','1111111111','Test',1);
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription`
--

DROP TABLE IF EXISTS `prescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription` (
  `prescriptionID` int NOT NULL AUTO_INCREMENT,
  `dentistID` int DEFAULT NULL,
  `patientID` int NOT NULL,
  `visitID` int DEFAULT NULL,
  `National_Drug_Code` varchar(13) DEFAULT NULL,
  `Medication_Name` varchar(50) DEFAULT NULL,
  `Medication_Dosage` varchar(50) DEFAULT NULL,
  `Refills` int DEFAULT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `Date_prescribed` date DEFAULT NULL,
  PRIMARY KEY (`prescriptionID`),
  KEY `dentistID` (`dentistID`),
  KEY `patientID` (`patientID`),
  KEY `visitID` (`visitID`),
  CONSTRAINT `prescription_ibfk_1` FOREIGN KEY (`dentistID`) REFERENCES `dentist` (`dentistID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `prescription_ibfk_2` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `prescription_ibfk_3` FOREIGN KEY (`visitID`) REFERENCES `visit_details` (`visitID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription`
--

LOCK TABLES `prescription` WRITE;
/*!40000 ALTER TABLE `prescription` DISABLE KEYS */;
/*!40000 ALTER TABLE `prescription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `scheduleID` int NOT NULL AUTO_INCREMENT,
  `officeID` int DEFAULT NULL,
  `dentistID` int DEFAULT NULL,
  `Monday` tinyint(1) DEFAULT '0',
  `Tuesday` tinyint(1) DEFAULT '0',
  `Wednesday` tinyint(1) DEFAULT '0',
  `Thursday` tinyint(1) DEFAULT '0',
  `Friday` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`scheduleID`),
  KEY `dentistID` (`dentistID`),
  KEY `officeID` (`officeID`),
  CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`dentistID`) REFERENCES `dentist` (`dentistID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`officeID`) REFERENCES `office` (`officeID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (1,1,1,0,0,0,0,0);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `prevent_overlapping_schedules` BEFORE UPDATE ON `schedule` FOR EACH ROW BEGIN
    DECLARE overlap_count_austin INT;
    DECLARE overlap_count_phoenix INT;

    IF NEW.Monday = 1 THEN
        -- Check for overlapping schedules on Monday at Austin office
        SELECT COUNT(*) INTO overlap_count_austin
        FROM schedule
        WHERE dentistID = NEW.dentistID
        AND officeID = 1 -- Austin office
        AND Monday = 1
        AND scheduleID != NEW.scheduleID; -- Exclude the current schedule being updated

        IF overlap_count_austin > 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Dentist cannot have overlapping schedules';
        END IF;

        -- Check for overlapping schedules on Monday at Phoenix office
        SELECT COUNT(*) INTO overlap_count_phoenix
        FROM schedule
        WHERE dentistID = NEW.dentistID
        AND officeID = 2 -- Phoenix office
        AND Monday = 1
        AND scheduleID != NEW.scheduleID; -- Exclude the current schedule being updated

        IF overlap_count_phoenix > 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Dentist cannot have overlapping schedules';
        END IF;
    END IF;
    
    IF NEW.Tuesday = 1 THEN
        SELECT COUNT(*) INTO overlap_count_austin
        FROM schedule
        WHERE dentistID = NEW.dentistID
        AND officeID = 1 -- Austin office
        AND Tuesday = 1
        AND scheduleID != NEW.scheduleID;

        IF overlap_count_austin > 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Dentist cannot have overlapping schedules';
        END IF;

        -- Check for overlapping schedules on Tuesday at Phoenix office
        SELECT COUNT(*) INTO overlap_count_phoenix
        FROM schedule
        WHERE dentistID = NEW.dentistID
        AND officeID = 2 -- Phoenix office
        AND Tuesday = 1
        AND scheduleID != NEW.scheduleID;

        IF overlap_count_phoenix > 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Dentist cannot have overlapping schedules';
        END IF;
    END IF;
    
    IF NEW.Wednesday = 1 THEN
        SELECT COUNT(*) INTO overlap_count_austin
        FROM schedule
        WHERE dentistID = NEW.dentistID
        AND officeID = 1 -- Austin office
        AND Wednesday = 1
        AND scheduleID != NEW.scheduleID;

        IF overlap_count_austin > 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Dentist cannot have overlapping schedules';
        END IF;

        -- Check for overlapping schedules on Wednesday at Phoenix office
        SELECT COUNT(*) INTO overlap_count_phoenix
        FROM schedule
        WHERE dentistID = NEW.dentistID
        AND officeID = 2 -- Phoenix office
        AND Wednesday = 1
        AND scheduleID != NEW.scheduleID;

        IF overlap_count_phoenix > 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Dentist cannot have overlapping schedules';
        END IF;
    END IF;
    
    IF NEW.Thursday = 1 THEN
        SELECT COUNT(*) INTO overlap_count_austin
        FROM schedule
        WHERE dentistID = NEW.dentistID
        AND officeID = 1 -- Austin office
        AND Thursday = 1
        AND scheduleID != NEW.scheduleID;

        IF overlap_count_austin > 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Dentist cannot have overlapping schedules';
        END IF;

        -- Check for overlapping schedules on Thursday at Phoenix office
        SELECT COUNT(*) INTO overlap_count_phoenix
        FROM schedule
        WHERE dentistID = NEW.dentistID
        AND officeID = 2 -- Phoenix office
        AND Thursday = 1
        AND scheduleID != NEW.scheduleID;

        IF overlap_count_phoenix > 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Dentist cannot have overlapping schedules';
        END IF;
    END IF;
    
    IF NEW.Friday = 1 THEN
        SELECT COUNT(*) INTO overlap_count_austin
        FROM schedule
        WHERE dentistID = NEW.dentistID
        AND officeID = 1 -- Austin office
        AND Friday = 1
        AND scheduleID != NEW.scheduleID;

        IF overlap_count_austin > 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Dentist cannot have overlapping schedules';
        END IF;

        -- Check for overlapping schedules on Friday at Phoenix office
        SELECT COUNT(*) INTO overlap_count_phoenix
        FROM schedule
        WHERE dentistID = NEW.dentistID
        AND officeID = 2 -- Phoenix office
        AND Friday = 1
        AND scheduleID != NEW.scheduleID;

        IF overlap_count_phoenix > 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Dentist cannot have overlapping schedules';
        END IF;
    END IF;
    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `staffID` int NOT NULL AUTO_INCREMENT,
  `officeID` int DEFAULT NULL,
  `Fname` varchar(20) NOT NULL,
  `Lname` varchar(20) NOT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Phone_num` varchar(10) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `Position` enum('Receptionist','Hygienist') DEFAULT NULL,
  `Start_date` date DEFAULT NULL,
  `End_date` date DEFAULT NULL,
  `Is_active` tinyint(1) DEFAULT '1',
  `Salary` int DEFAULT NULL,
  PRIMARY KEY (`staffID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,1,'Test','Staff','staff@test.com','3333333333','2001-01-01','test','Hygienist','2024-01-01',NULL,1,10);
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visit_details`
--

DROP TABLE IF EXISTS `visit_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visit_details` (
  `visitID` int NOT NULL AUTO_INCREMENT,
  `patientID` int DEFAULT NULL,
  `dentistID` int DEFAULT NULL,
  `officeID` int DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Start_time` time DEFAULT NULL,
  `Diagnosis` varchar(255) NOT NULL,
  `Treatment` varchar(255) NOT NULL,
  `Notes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`visitID`),
  KEY `patientID` (`patientID`),
  KEY `dentistID` (`dentistID`),
  KEY `officeID` (`officeID`,`dentistID`,`patientID`,`Date`,`Start_time`),
  CONSTRAINT `visit_details_ibfk_1` FOREIGN KEY (`patientID`) REFERENCES `patient` (`patientID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `visit_details_ibfk_2` FOREIGN KEY (`dentistID`) REFERENCES `dentist` (`dentistID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `visit_details_ibfk_3` FOREIGN KEY (`officeID`, `dentistID`, `patientID`, `Date`, `Start_time`) REFERENCES `appointment` (`officeID`, `dentistID`, `patientID`, `Date`, `Start_time`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visit_details`
--

LOCK TABLES `visit_details` WRITE;
/*!40000 ALTER TABLE `visit_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `visit_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-19 22:31:48
