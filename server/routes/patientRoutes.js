// patientRoutes.js
const jwt = require('jsonwebtoken');
const { getPatientProfile, updatePatientProfile, schedulePatientAppointment, getInvoicesByPatientUsername, getVisitDetailsByPatientUsername } = require('../controllers/patientController');

const handleGetPatient = (req, res, jwt) => {

    const { url, method } = req;
    
    if (method === 'GET' && url === '/api/patient/profile') {
        const decodedToken = verifyToken(req.headers.authorization, jwt);
        if (!decodedToken) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Unauthorized' }));
            return;
        }

        const { patientID } = decodedToken;
        getPatientProfile(req, res, patientID);

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

const handlePatientUpdate = (req, res, jwt) => {

    const { url, method } = req;
    
    if (method === 'PATCH' && url === '/api/patient/profile/update') {
        const decodedToken = verifyToken(req.headers.authorization, jwt);
        if (!decodedToken) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Unauthorized' }));
            return;
        }

        const { patientID } = decodedToken;
        
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });

        req.on('end', () => {
            try {
                const updatedProfile = JSON.parse(body);
                updatePatientProfile(req, res, patientID, updatedProfile);
            } catch (error) {
                console.error('Error parsing JSON data:', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON data' }));
            }
        });

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

const handlePatientAppointment = (req, res, jwt) => {

    const { url, method } = req;
    
    if (method === 'POST' && url === '/api/patient/schedule') {
        const decodedToken = verifyToken(req.headers.authorization, jwt);
        if (!decodedToken) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Unauthorized' }));
            return;
        }

        const { patientID } = decodedToken;
        
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            try {
                const appointmentDetails = JSON.parse(body);
                schedulePatientAppointment(req, res, patientID, appointmentDetails);
            } catch (error) {
                console.error('Error parsing JSON data:', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON data' }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

const verifyToken = (authHeader, jwt) => {

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

const handleGetInvoicesByPatientUsername = (req, res, jwt) => {
    const { url, method } = req;

    if (method === 'GET' && url === '/api/patient/invoices') { 
        const decodedToken = verifyToken(req.headers.authorization, jwt);
        if (!decodedToken) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Unauthorized' }));
            return;
        }

        const { username } = decodedToken;
        getInvoicesByPatientUsername(req, res, username);

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

const handleGetVisitDetailsByPatient = (req, res, jwt) => {
    const { url, method } = req;

    if (method === 'GET' && url === '/api/patient/visit-details') { 
        const decodedToken = verifyToken(req.headers.authorization, jwt);
        if (!decodedToken) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Unauthorized' }));
            return;
        }

        const { username } = decodedToken;
        getVisitDetailsByPatientUsername(req, res, username);

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

module.exports = {
    handleGetPatient,
    handlePatientUpdate,
    handlePatientAppointment,
    handleGetInvoicesByPatientUsername,
    handleGetVisitDetailsByPatient
};
