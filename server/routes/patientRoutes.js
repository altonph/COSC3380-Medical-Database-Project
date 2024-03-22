// patientRoutes.js
const jwt = require('jsonwebtoken');
const { getPatientProfile } = require('../controllers/patientController');

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
};
