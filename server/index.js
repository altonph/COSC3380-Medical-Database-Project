// index.js
const http = require('http');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { handleRegister, handleLogin, handleRegisterDoctor, handleLoginDoctor, handleRegisterAdmin, handleLoginAdmin } = require('./routes/authRoutes');
const { handleProtectedRoute } = require('./controllers/authController');
const { patientRoutes, patientUpdate, appointmentRoutes } = require('./routes/patientRoutes');
const { doctorRoutes, verifyToken } = require('./routes/doctorRoutes'); 
const { adminRoutes } = require('./routes/adminRoutes'); 
const { getPatientById, getMedicalHistoryByPatientId, getPrescriptionsByPatientId, getInvoicesByPatientId, getVisitDetailsByPatientId, updateMedicalHistoryByPatientId, updatePrescriptionsByPatientId, getAppointmentsByDoctorUsername, updateVisitDetailsByPatientId } = require('./controllers/doctorController');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, UPDATE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    if (req.url === '/patient/register' && req.method === 'POST') {
        handleRegister(req, res);
    } else if (req.url === '/patient/login' && req.method === 'POST') {
        handleLogin(req, res, jwt);
    } else if (req.url === '/protected-patient' && req.method === 'GET') {
        handleProtectedRoute(req, res, jwt);
    } else if (req.url === '/doctor/register' && req.method === 'POST') {
        handleRegisterDoctor(req, res, jwt);
    } else if (req.url === '/doctor/login' && req.method === 'POST') {
        handleLoginDoctor(req, res, jwt);
    } else if (req.url === '/register/admin' && req.method === 'POST') {
        handleRegisterAdmin(req, res, jwt);
    } else if (req.url === '/login/admin' && req.method === 'POST') {
        handleLoginAdmin(req, res, jwt);
    } else if (req.url === '/api/patient/profile' && req.method === 'GET') {
        patientRoutes(req, res, jwt);
    } else if (req.url === '/api/patient/profile/update' && req.method === 'POST') {
        patientUpdate(req, res, jwt);
    } else if (req.url === '/api/appointment/schedule' && req.method === 'POST') { 
        appointmentRoutes(req, res, jwt);
    } else if (req.url.startsWith('/api/admin/generate-report') && req.method === 'GET') {
        adminRoutes(req, res, jwt);
    } else if (req.url === '/api/admin/generate-report' && req.method === 'POST') {
        adminRoutes(req, res, jwt);
    } else if (req.url.startsWith('/api/report') && req.method === 'GET') {
        reportRoutes(req, res, jwt);
    } else if (req.url === '/api/doctor/patients' && req.method === 'GET') {
        doctorRoutes(req, res, jwt); 
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
        handleGenerateSalaryReport(req, res);
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});