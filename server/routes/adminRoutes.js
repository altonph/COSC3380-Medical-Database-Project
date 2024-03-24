// adminRoutes.js
const jwt = require('jsonwebtoken');
const { generateReport } = require('../controllers/adminController');

const adminRoutes = (req, res, jwt) => {
    const { url, method } = req;

    if ((method === 'GET' || method === 'POST') && url.startsWith('/api/admin/generate-report')) {
        const decodedToken = verifyToken(req.headers.authorization, jwt);
        if (!decodedToken) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Unauthorized' }));
            return;
        }

        const { isAdmin } = decodedToken;
        if (!isAdmin) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Forbidden: User is not an admin' }));
            return;
        }

        // Extract query parameters for GET requests
        const { reportType, startDate, endDate } = method === 'GET' ? req.query : req.body;

        generateReport(req, res, reportType, startDate, endDate);
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
        console.log('Decoded token:', decoded);
        
        // Check if the decoded token contains isAdmin field and is set to true
        if (decoded.isAdmin === true) {
            return decoded;
        } else {
            console.error('User is not an admin');
            return null;
        }
    } catch (err) {
        console.error('Error verifying token:', err);
        return null;
    }
};

module.exports = {
    adminRoutes,
};
