// index.js
const http = require('http');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { handleRegisterPatient, handleLoginPatient, handleRegisterDoctor, handleLoginDoctor, handleRegisterAdmin, handleLoginAdmin } = require('./routes/authRoutes');
const { handleProtectedRoute } = require('./controllers/authController');
const { handleGetPatient, handlePatientUpdate, handlePatientAppointment } = require('./routes/patientRoutes');
const { doctorRoutes, verifyToken } = require('./routes/doctorRoutes'); 
const { handleGenerateSalaryReport } = require('./routes/adminRoutes'); 
const { getPatientById, getMedicalHistoryByPatientId, getPrescriptionsByPatientId, getInvoicesByPatientId, getVisitDetailsByPatientId, updateMedicalHistoryByPatientId, updatePrescriptionsByPatientId, getAppointmentsByDoctorUsername, updateVisitDetailsByPatientId, getInformationByPatientId, updatePatientInformationByPatientId } = require('./controllers/doctorController');
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
    } else if (req.url.startsWith('/api/admin/salary-report') && req.method === 'GET') {
        handleGenerateSalaryReport(req, res, jwt);
    } else if (req.url.startsWith('/api/dentist/updateAppointmentWithStaff') && req.method === 'PATCH') {
        handleUpdateAppointmentWithStaff(req, res);
    }
    
    //handleUpdateAppointmentWithStaff
    // doctor pages
    else if (req.url === '/api/doctor/patients' && req.method === 'GET') {
        doctorRoutes(req, res, jwt);
    } else if (req.url.startsWith('/api/doctor/patients/') && req.url.endsWith('/information') && req.method === 'GET') {
        const parts = req.url.split('/');
        const patientId = parts[parts.length - 2];
        getInformationByPatientId(req, res, patientId);
    } else if (req.url.startsWith('/api/doctor/patients/') && req.url.endsWith('/medical-history') && req.method === 'GET') {
        const parts = req.url.split('/');
        const patientId = parts[parts.length - 2];
        getMedicalHistoryByPatientId(req, res, patientId); 
    } else if (req.url.startsWith('/api/doctor/patients/') && req.url.endsWith('/prescriptions') && req.method === 'GET') {
        const parts = req.url.split('/');
        const patientId = parts[parts.length - 2];
        getPrescriptionsByPatientId(req, res, patientId); 
    } else if (req.url.startsWith('/api/doctor/patients/') && req.url.endsWith('/invoices') && req.method === 'GET') {
        const parts = req.url.split('/');
        const patientId = parts[parts.length - 2];
        getInvoicesByPatientId(req, res, patientId); 
    } else if (req.url.startsWith('/api/doctor/patients/') && req.url.endsWith('/visit-details') && req.method === 'GET') {
        const parts = req.url.split('/');
        const patientId = parts[parts.length - 2];
        getVisitDetailsByPatientId(req, res, patientId); 
    } else if (req.url.startsWith('/api/doctor/patients/') && req.url.endsWith('/medical-history') && req.method === 'PUT') { 
        const parts = req.url.split('/');
        const patientId = parts[parts.length - 2];
        updateMedicalHistoryByPatientId(req, res, patientId); 
    } else if (req.url.startsWith('/api/doctor/patients/') && req.url.endsWith('/prescriptions') && req.method === 'PUT') { 
        const parts = req.url.split('/');
        const patientId = parts[parts.length - 2];
        updatePrescriptionsByPatientId(req, res, patientId); 
    } else if (req.url.startsWith('/api/doctor/patients/') && req.url.endsWith('/visit-details') && req.method === 'PUT') { 
        const parts = req.url.split('/');
        const patientId = parts[parts.length - 2];
        updateVisitDetailsByPatientId(req, res, patientId); 
    } else if (req.url.startsWith('/api/doctor/patients/') && req.url.endsWith('/information') && req.method === 'PUT') { 
        const parts = req.url.split('/');
        const patientId = parts[parts.length - 2];
        updatePatientInformationByPatientId(req, res, patientId); 
    } else if (req.url.startsWith('/api/doctor/patients/') && req.method === 'GET') {
        const parts = req.url.split('/');
        const patientId = parts[parts.length - 1];
        getPatientById(req, res, patientId);
    } else if (req.url === '/api/doctor/appointments' && req.method === 'GET') {
        const authHeader = req.headers.authorization; 
        if (!authHeader) {
            return unauthorizedResponse(res);
        }
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const { username } = decodedToken;
        getAppointmentsByDoctorUsername(req, res, username);
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
