const jwt = require('jsonwebtoken');
const { getAllPatients, getPatientById, getMedicalHistoryByPatientId, insertMedicalHistoryByPatientId, getPrescriptionsByPatientId, getInvoicesByPatientId, getVisitDetailsByPatientId, updateMedicalHistoryByPatientId, updatePatientInformationByPatientId,getInformationByPatientId, updatePrescriptionsByPatientId, updateVisitDetailsByPatientId, getAppointmentsByDoctorUsername, insertVisitDetails, insertPrescription, insertAppointment, checkVisitDetailsCount, updateAppointmentStatus, checkPatientExistence, generateInvoice, updatePrimaryApproval, getAvailableStaff, verifyPrimaryApproval, getSpecialtyByDoctorUsername } = require('../controllers/doctorController');

const doctorRoutes = (req, res) => {
    const { url, method } = req;
    const authHeader = req.headers.authorization;
    
    if (method === 'GET' && url === '/api/doctor/patients') {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff') {
            return forbiddenResponse(res);
        }
        getAllPatients(req, res);
    } else if (method === 'GET' && url.startsWith('/api/doctor/patients/') && url.endsWith('/prescriptions')) {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff') {
            return forbiddenResponse(res);
        }
        const parts = url.split('/');
        const patientId = parts[parts.length - 2];
        getPrescriptionsByPatientId(req, res, patientId);
    } else if (method === 'GET' && url.startsWith('/api/doctor/patients/') && url.endsWith('/medical-history')) {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff') {
            return forbiddenResponse(res);
        }
        const parts = url.split('/');
        const patientId = parts[parts.length - 2];
        getMedicalHistoryByPatientId(req, res, patientId);
    } else if (method === 'GET' && url.startsWith('/api/doctor/patients/') && url.endsWith('/invoices')) {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff') {
            return forbiddenResponse(res);
        }
        const parts = url.split('/');
        const patientId = parts[parts.length - 2];
        getInvoicesByPatientId(req, res, patientId);
    } else if (method === 'GET' && url.startsWith('/api/doctor/patients/') && url.endsWith('/visit-details')) {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff') {
            return forbiddenResponse(res);
        }
        const parts = url.split('/');
        const patientId = parts[parts.length - 2];
        getVisitDetailsByPatientId(req, res, patientId);
    } else if (method === 'GET' && url.startsWith('/api/doctor/patients/')) {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff') {
            return forbiddenResponse(res);
        }
        const parts = url.split('/');
        const patientId = parts[parts.length - 1];
        getPatientById(req, res, patientId);
    } else if (method === 'PUT' && url.startsWith('/api/doctor/patients/') && url.endsWith('/medical-history')) {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff') {
            return forbiddenResponse(res);
        }
        const parts = url.split('/');
        const patientId = parts[parts.length - 2];
        updateMedicalHistoryByPatientId(req, res, patientId);
    } else if (method === 'POST' && url.startsWith('/api/doctor/patients/') && url.endsWith('/medical-history')) {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff') {
            return forbiddenResponse(res);
        }
        const parts = url.split('/');
        const patientId = parts[parts.length - 2];
        insertMedicalHistoryByPatientId(req, res, patientId);
    } else if (method === 'PUT' && url.startsWith('/api/doctor/patients/') && url.endsWith('/prescriptions')) {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff') {
            return forbiddenResponse(res);
        }
        const parts = url.split('/');
        const patientId = parts[parts.length - 2];
        updatePrescriptionsByPatientId(req, res, patientId);
    } else if (method === 'PUT' && url.startsWith('/api/doctor/patients/') && url.endsWith('/visit-details')) {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff') {
            return forbiddenResponse(res);
        }
        const parts = url.split('/');
        const patientId = parts[parts.length - 2];
        updateVisitDetailsByPatientId(req, res, patientId); 
    } else if (method === 'GET' && url === '/api/doctor/appointments') {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff') {
            return forbiddenResponse(res);
        }
        const { username } = decodedToken; 
        getAppointmentsByDoctorUsername(req, res, username);
    } else if (method === 'GET' && url === '/api/doctor/appointments/get-specialty') {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff') {
            return forbiddenResponse(res);
        }
        const { username } = decodedToken; 
        getSpecialtyByDoctorUsername(req, res, username);
    } else if (method === 'GET' && url.startsWith('/api/doctor/patients/') && url.endsWith('/information')) {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff') {
            return forbiddenResponse(res);
        }
        const parts = url.split('/');
        const patientId = parts[parts.length - 2];
        getInformationByPatientId(req, res, patientId);
    } else if (method === 'PUT' && url.startsWith('/api/doctor/patients/') && url.endsWith('/information')) {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff') {
            return forbiddenResponse(res);
        }
        const parts = url.split('/');
        const patientId = parts[parts.length - 2];
        updatePatientInformationByPatientId(req, res, patientId);
    } else if (method === 'POST' && url === '/api/doctor/appointments/visit-details') {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff') {
            return forbiddenResponse(res);
        }
        insertVisitDetails(req, res); 
    } else if (method === 'POST' && url === '/api/doctor/appointments/prescriptions') {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff') {
            return forbiddenResponse(res);
        }
        insertPrescription(req, res);
    } else if (method === 'POST' && url === '/api/doctor/appointments') {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff' && userRole !== 'Patient') {
            return forbiddenResponse(res);
        }
        console.log(req.body);
        insertAppointment(req, res);
    } else if (method === 'POST' && url === '/api/doctor/appointments/check-visit-details') {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff') {
            return forbiddenResponse(res);
        }
        checkVisitDetailsCount(req, res);
    }
    else if (method === 'PATCH' && url === '/api/doctor/appointments/update-status') {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff') {
            return forbiddenResponse(res);
        }
        updateAppointmentStatus(req, res);
    } else if (method === 'POST' && url === '/api/doctor/appointments/check-patientID') {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff' && userRole !== 'Patient') {
            return forbiddenResponse(res);
        }
        checkPatientExistence(req, res);
    } else if (method === 'POST' && url === '/api/doctor/appointments/generate-invoice') {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff') {
            return forbiddenResponse(res);
        }
        generateInvoice(req, res);
    } else if (method === 'PATCH' && url === '/api/doctor/appointments/update-primary-approval') {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff') {
            return forbiddenResponse(res);
        }
        updatePrimaryApproval(req, res);
    } else if (method === 'POST' && url === '/api/doctor/appointments/available-staff') {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff' && userRole !== 'Patient') {
            return forbiddenResponse(res);
        }
        getAvailableStaff(req, res);
    } else if (method === 'POST' && url === '/api/doctor/appointments/verify-primary-approval') {
        const decodedToken = verifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const userRole = decodedToken.role;
        if (userRole !== 'Dentist' && userRole !== 'Admin' && userRole !== 'Staff') {
            return forbiddenResponse(res);
        }
        verifyPrimaryApproval(req, res); 
    }
    else {
        return notFoundResponse(res);
    }
};

const verifyToken = (authHeader) => {
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        console.error('Error verifying token:', err);
        return null;
    }
};

const unauthorizedResponse = (res) => {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Unauthorized' }));
};

const notFoundResponse = (res) => {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
};

const forbiddenResponse = (res) => {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Forbidden' }));
};

module.exports = {
    doctorRoutes,
    verifyToken
};