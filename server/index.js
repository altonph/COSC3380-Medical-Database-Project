// index.js
const http = require('http');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { handleRegisterPatient, handleLoginPatient, handleRegisterDoctor, handleLoginDoctor, handleRegisterAdmin, handleLoginAdmin, handleRegisterStaff,
    handleLoginStaff, handleEditDentist, handleEditStaff, handleEditPatient, handleArchiveDentist, handleArchiveStaff, handleArchivePatient, handleGetUserRole } = require('./routes/authRoutes');
const { handleProtectedRoute } = require('./controllers/authController');
const { handleGetPatient, handlePatientUpdate, handlePatientAppointment, handleGetInvoicesByPatientUsername, handleGetVisitDetailsByPatient, handleGetMedicalHistoryByPatient, handleGetPrescriptionsByPatient, handleGetAppointmentsByPatient, handleGetPatientID, handleCancelAppointment, handlePayInvoice } = require('./routes/patientRoutes');
const { doctorRoutes, verifyToken } = require('./routes/doctorRoutes'); 
const { staffRoutes, staffverifyToken } = require('./routes/staffRoutes');
const { handleGenerateAppointmentReport, handleGetAllDentists, handleGetAllPatients, handleGetAllStaff, handleGetAllOfficeDentists, handleGetAllSchedules } = require('./routes/adminRoutes'); 
const { handleAssignDentistToOffice , handleUpdateDentistOffice} = require('./routes/officeRoutes');
const { handleAssignDentistSchedule, handleGetDentistsByOfficeAndDay, handleUpdateAppointmentWithStaff, handleGetAvailableTimeBlocks, handleGetAllDentistsByOfficeAndDay, handleEditDentistSchedule } = require('./routes/dentistRoutes');
const { handleGenerateRevenueReport } = require('./routes/adminRoutes');    
const { getSpecialtyByDoctorUsername } = require('./controllers/doctorController');
const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, UPDATE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    if (req.url === '/api/patient/register' && req.method === 'POST') {
        handleRegisterPatient(req, res);
    } else if (req.url === '/api/patient/login' && req.method === 'POST') {
        handleLoginPatient(req, res, jwt);
    } else if (req.url === '/api/patient/protected' && req.method === 'GET') {
        handleProtectedRoute(req, res, jwt);
    } else if (req.url === '/api/staff/register' && req.method === 'POST') {
        handleRegisterStaff(req, res, jwt);
    } else if (req.url === '/api/staff/login' && req.method === 'POST') {
        handleLoginStaff(req, res, jwt);
    } else if (req.url === '/doctor/check-role' && req.method === 'POST') {
        handleGetUserRole(req, res, jwt);
    } else if (req.url === '/doctor/register' && req.method === 'POST') {
        handleRegisterDoctor(req, res, jwt);
    } else if (req.url === '/staff/register' && req.method === 'POST') {
        handleRegisterStaff(req, res, jwt);
    } else if (req.url === '/doctor/login' && req.method === 'POST') {
        handleLoginDoctor(req, res, jwt);
    } else if (req.url === '/staff/login' && req.method === 'POST') {
        handleLoginStaff(req, res, jwt);
    } else if (req.url === '/api/admin/register' && req.method === 'POST') {
        handleRegisterAdmin(req, res, jwt);
    } else if (req.url === '/api/admin/login' && req.method === 'POST') {
        handleLoginAdmin(req, res, jwt);
    } else if (req.url === '/api/patient/profile' && req.method === 'GET') {
        handleGetPatient(req, res, jwt);
    } else if (req.url === '/api/patient/profile/update' && req.method === 'PATCH') {
        handlePatientUpdate(req, res, jwt);
    } else if (req.url === '/api/patient/schedule' && req.method === 'POST') { 
        handlePatientAppointment(req, res, jwt);
    } else if (req.url === '/api/patient/invoices' && req.method === 'GET') {
        handleGetInvoicesByPatientUsername(req, res, jwt);
    } else if (req.url === '/api/patient/visit-details' && req.method === 'GET') {
        handleGetVisitDetailsByPatient(req, res, jwt);
    } else if (req.url === '/api/patient/medical-history' && req.method === 'GET') {
        handleGetMedicalHistoryByPatient(req, res, jwt);
    } else if (req.url === '/api/patient/prescriptions' && req.method === 'GET') {
        handleGetPrescriptionsByPatient(req, res, jwt);
    } else if (req.url === '/api/patient/appointments' && req.method === 'GET') {
        handleGetAppointmentsByPatient(req, res, jwt);
    } else if (req.url === '/api/patient/id' && req.method === 'GET') {
        handleGetPatientID(req, res, jwt);
    } else if (req.url === '/api/patient/cancel-appointment' && req.method === 'POST') {
        handleCancelAppointment(req, res, jwt);
    } else if (req.url === '/api/patient/pay-invoice' && req.method === 'PATCH') {
        handlePayInvoice(req, res, jwt);
    } else if (req.url === '/api/office/assignDentist' && req.method === 'POST') {
        handleAssignDentistToOffice(req, res);
    } else if (req.url === '/api/dentist/assignSchedule' && req.method === 'POST') {
        handleAssignDentistSchedule(req, res);
    } else if (req.url.startsWith('/api/dentist/getDentist') && req.method === 'GET') {
        handleGetDentistsByOfficeAndDay(req, res);
    } else if (req.url.startsWith('/api/dentist/getAllDentists') && req.method === 'GET') {
        handleGetAllDentistsByOfficeAndDay(req, res);
    } else if (req.url.startsWith('/api/dentist/updateAppointmentWithStaff') && req.method === 'PATCH') {
        handleUpdateAppointmentWithStaff(req, res);
    } else if (req.url.startsWith('/api/dentist/editDentist') && req.method === 'PATCH') {
        handleEditDentist(req, res);
    } else if (req.url.startsWith('/api/staff/editStaff') && req.method === 'PATCH') {
        handleEditStaff(req, res);
    } else if (req.url.startsWith('/api/patient/editPatient') && req.method === 'PATCH') {
        handleEditPatient(req, res);
    } else if (req.url.startsWith('/api/dentist/archive') && req.method === 'PATCH') {
        handleArchiveDentist(req, res);
    } else if (req.url.startsWith('/api/staff/archive') && req.method === 'PATCH') {
        handleArchiveStaff(req, res);
    } else if (req.url.startsWith('/api/patient/archive') && req.method === 'PATCH') {
        handleArchivePatient(req, res);
    } else if (req.url.startsWith('/api/dentist/getAvailableTimeBlocks') && req.method === 'GET') {
        handleGetAvailableTimeBlocks(req, res); 
    } else if (req.url.startsWith('/api/dentist/getAvailableStaff') && req.method === 'GET') {
        handleGetAvailableStaff(req, res); 
    } else if (req.url.startsWith('/api/admin/appointment-data-report') && req.method === 'POST') {
        handleGenerateAppointmentReport(req, res); 
    } else if (req.url.startsWith('/api/admin/finance-revenue-report') && req.method === 'GET') {
        handleGenerateRevenueReport(req, res);
    }  else if (req.url.startsWith('/api/admin/getDentists') && req.method === 'GET') {
        handleGetAllDentists(req, res);
    }  else if (req.url.startsWith('/api/admin/getPatients') && req.method === 'GET') {
        handleGetAllPatients(req, res);
    }  else if (req.url.startsWith('/api/admin/getStaff') && req.method === 'GET') {
        handleGetAllStaff(req, res);
    }  else if (req.url === '/api/doctor/appointments/get-specialty' && req.method === 'GET') {
        getSpecialtyByDoctorUsername(req, res);
    }   else if (req.url === '/api/admin/getOfficeDentists' && req.method === 'GET') {
        handleGetAllOfficeDentists(req, res);
    }   else if (req.url === '/api/admin/getSchedules' && req.method === 'GET') {
        handleGetAllSchedules(req, res);
    }   else if (req.url === '/api/admin/updateDentistOffice' && req.method === 'POST') {
        handleUpdateDentistOffice(req, res);
    } else if (req.url === '/api/admin/updateSchedule' && req.method === 'POST') {
        handleEditDentistSchedule(req, res);
    }  else if (req.url.startsWith('api/admin/demographics-data-report') && req.method === 'GET') {
        handleGenerateDemographicReport(req,res);
    }
    
    
    
    //handleUpdateAppointmentWithStaff
    // doctor pages
    else if (req.url === '/api/doctor/patients' || req.url.startsWith('/api/doctor/patients/') || req.url.startsWith('/api/doctor/appointments/') || req.url === ('/api/doctor/appointments') || req.url === ('/api/doctor/visit-details')) {
        doctorRoutes(req, res); 
    }
    else if (req.url === '/api/staff/patients' || req.url.startsWith('/api/staff/patients/') || req.url.startsWith('/api/staff/appointments/') || req.url === ('/api/staff/appointments')) {
        staffRoutes(req, res); 
    }
    
    else {
        res.writeHead(404);
        res.end('Not Found');
    }

});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
