const jwt = require('jsonwebtoken');
const { getAllPatients, getPatientById, getMedicalHistoryByPatientId, getPrescriptionsByPatientId, getInvoicesByPatientId, getVisitDetailsByPatientId, updateMedicalHistoryByPatientId, updatePrescriptionsByPatientId, updateVisitDetailsByPatientId, getAppointmentsByStaffUsername, getAppointmentsByDoctorUsername, insertVisitDetails, insertPrescription, updatePatientInformationByPatientId } = require('../controllers/doctorController');

const staffRoutes = (req, res) => {
    const { url, method } = req;
    const authHeader = req.headers.authorization;

    if (method === 'GET' && url === '/api/staff/patients') {
        const decodedToken = staffVerifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        getAllPatients(req, res);
    } else if (method === 'GET' && url.startsWith('/api/staff/patients/') && url.endsWith('/prescriptions')) {
        const decodedToken = staffVerifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const parts = url.split('/');
        const patientId = parts[parts.length - 2];
        getPrescriptionsByPatientId(req, res, patientId);
    } else if (method === 'GET' && url.startsWith('/api/staff/patients/') && url.endsWith('/medical-history')) {
        const decodedToken = staffVerifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const parts = url.split('/');
        const patientId = parts[parts.length - 2];
        getMedicalHistoryByPatientId(req, res, patientId);
    } else if (method === 'GET' && url.startsWith('/api/staff/patients/') && url.endsWith('/invoices')) {
        const decodedToken = staffVerifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const parts = url.split('/');
        const patientId = parts[parts.length - 2];
        getInvoicesByPatientId(req, res, patientId);
    } else if (method === 'GET' && url.startsWith('/api/staff/patients/') && url.endsWith('/visit-details')) {
        const decodedToken = staffVerifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const parts = url.split('/');
        const patientId = parts[parts.length - 2];
        getVisitDetailsByPatientId(req, res, patientId);
    } else if (method === 'GET' && url.startsWith('/api/staff/patients/')) {
        const decodedToken = staffVerifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const parts = url.split('/');
        const patientId = parts[parts.length - 1];
        getPatientById(req, res, patientId);
    } else if (method === 'PUT' && url.startsWith('/api/staff/patients/') && url.endsWith('/medical-history')) {
        const decodedToken = staffVerifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const parts = url.split('/');
        const patientId = parts[parts.length - 2];
        updateMedicalHistoryByPatientId(req, res, patientId);
    } else if (method === 'PUT' && url.startsWith('/api/staff/patients/') && url.endsWith('/prescriptions')) {
        const decodedToken = staffVerifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const parts = url.split('/');
        const patientId = parts[parts.length - 2];
        updatePrescriptionsByPatientId(req, res, patientId);
    } else if (method === 'PUT' && url.startsWith('/api/staff/patients/') && url.endsWith('/visit-details')) {
        const decodedToken = staffVerifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const parts = url.split('/');
        const patientId = parts[parts.length - 2];
        updateVisitDetailsByPatientId(req, res, patientId); 
    } else if (method === 'GET' && url === '/api/staff/appointments') {
        const decodedToken = staffVerifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const { username } = decodedToken; 
        getAppointmentsByStaffUsername(req, res, username);
    } else if (method === 'GET' && url.startsWith('/api/staff/patients/') && url.endsWith('/information')) {
        const decodedToken = staffVerifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const parts = url.split('/');
        const patientId = parts[parts.length - 2];
        getInformationByPatientId(req, res, patientId);
    } else if (method === 'PUT' && url.startsWith('/api/staff/patients/') && url.endsWith('/information')) {
        const decodedToken = staffVerifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        const parts = url.split('/');
        const patientId = parts[parts.length - 2];
        updatePatientInformationByPatientId(req, res, patientId);
    } else if (method === 'POST' && url === '/api/staff/appointments/visit-details') {
        const decodedToken = staffVerifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        insertVisitDetails(req, res); 
    } else if (method === 'POST' && url === '/api/staff/appointments/prescriptions') {
        const decodedToken = staffVerifyToken(authHeader);
        if (!decodedToken) {
            return unauthorizedResponse(res);
        }
        insertPrescription(req, res);
    }
    else {
        return notFoundResponse(res);
    }
};

const staffVerifyToken = (authHeader) => {
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

module.exports = {
    staffRoutes,
    staffVerifyToken
};