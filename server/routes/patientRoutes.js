// patientRoutes.js
const jwt = require('jsonwebtoken');
const { getPatientProfile, updatePatientProfile, scheduleAppointment } = require('../controllers/patientController');

const patientRoutes = (req, res, jwt) => {
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

const patientUpdate = (req, res, jwt) => {
    const { url, method } = req;
    
    if (method === 'POST' && url === '/api/patient/profile/update') {
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

const appointmentRoutes = (req, res, jwt) => {
    const { url, method } = req;
    
    if (method === 'POST' && url === '/api/appointment/schedule') {
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
                scheduleAppointment(req, res, patientID, appointmentDetails);
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

module.exports = {
    patientRoutes,
    patientUpdate,
    appointmentRoutes
};