// index.js
const http = require('http');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { handleRegister, handleLogin, handleRegisterAdmin, handleLoginAdmin } = require('./routes/authRoutes');
const { handleProtectedRoute } = require('./controllers/authController');
const { patientRoutes, patientUpdate, appointmentRoutes } = require('./routes/patientRoutes');
const officeRoutes = require('./routes/officeRoutes');
const { dentistRoutes, dentistByOffice } = require('./routes/dentistRoutes');
const { handleAdminRoutes } = require('./routes/adminRoutes');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, UPDATE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Handle patient routes
    if (req.url === '/patient/register' && req.method === 'POST') {
        handleRegister(req, res);
    } else if (req.url === '/patient/login' && req.method === 'POST') {
        handleLogin(req, res, jwt);
    } else if (req.url === '/protected-patient' && req.method === 'GET') {
        handleProtectedRoute(req, res, jwt);
    } else if (req.url === '/register/admin' && req.method === 'POST') {
        handleRegisterAdmin(req, res, jwt);
    } else if (req.url === '/login/admin' && req.method === 'POST') {
        handleLoginAdmin(req, res, jwt);
    } else if (req.url === '/api/patient/profile' && req.method === 'GET') {
        patientRoutes(req, res, jwt);
    } else if (req.url === '/api/patient/profile/update' && req.method === 'POST') {
        patientUpdate(req, res, jwt);
    } else if (req.url === '/api/appointment/schedule' && req.method === 'POST') { // schedule an appointment
        appointmentRoutes(req, res, jwt);
    } else if (req.url.startsWith('/api/office') && req.method === 'GET') { //get officeID given officeAddress
        officeRoutes(req, res);
    } else if (req.url.startsWith('/api/dentist') && req.method === 'GET') { //get dentistID given dentist first and last name
        dentistRoutes(req, res);
    } else if (req.url.startsWith('/api/getDentistByOffice') && req.method === 'GET') { //get list of dentist given officeID
        dentistByOffice(req, res);
    } else if (req.url.startsWith('/api/admin/salary-report') && req.method === 'GET') { //get list of dentist given officeID
        handleAdminRoutes(req, res);
    }  else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
