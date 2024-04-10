// index.js
const http = require('http');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { handleRegisterPatient, handleLoginPatient, handleRegisterDoctor, handleLoginDoctor, handleRegisterAdmin, handleLoginAdmin, handleRegisterStaff,
    handleLoginStaff, handleEditDentist, handleEditStaff, handleEditPatient, handleArchiveDentist, handleArchiveStaff, handleArchivePatient } = require('./routes/authRoutes');
const { handleProtectedRoute } = require('./controllers/authController');
const { handleGetPatient, handlePatientUpdate, handlePatientAppointment } = require('./routes/patientRoutes');
const { doctorRoutes, verifyToken } = require('./routes/doctorRoutes'); 
const { handleGenerateSalaryReport } = require('./routes/adminRoutes'); 
const { handleAssignDentistToOffice } = require('./routes/officeRoutes');
const { handleAssignDentistSchedule, handleGetDentistsByOfficeAndDay, handleUpdateAppointmentWithStaff } = require('./routes/dentistRoutes');

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
    } else if (req.url === '/doctor/register' && req.method === 'POST') {
        handleRegisterDoctor(req, res, jwt);
    } else if (req.url === '/doctor/login' && req.method === 'POST') {
        handleLoginDoctor(req, res, jwt);
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
    } else if (req.url === '/api/office/assignDentist' && req.method === 'POST') {
        handleAssignDentistToOffice(req, res);
    } else if (req.url === '/api/dentist/assignSchedule' && req.method === 'POST') {
        handleAssignDentistSchedule(req, res);
    } else if (req.url.startsWith('/api/dentist/getDentist') && req.method === 'GET') {
        handleGetDentistsByOfficeAndDay(req, res);
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
    }
    
    
    //handleUpdateAppointmentWithStaff
    // doctor pages
    else if (req.url === '/api/doctor/patients' || req.url.startsWith('/api/doctor/patients/') || req.url === '/api/doctor/appointments') {
        doctorRoutes(req, res); 
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
