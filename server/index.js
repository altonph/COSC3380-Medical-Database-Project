const http = require('http');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { handleRegister, handleLogin } = require('./routes/authRoutes');
const { handleProtectedRoute } = require('./controllers/authController');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, UPDATE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.url === '/register' && req.method === 'POST') {
        handleRegister(req, res);
    } else if (req.url === '/login' && req.method === 'POST') {
        handleLogin(req, res, jwt);
    } else if (req.url === '/protected-route' && req.method === 'GET') {
        handleProtectedRoute(req, res, jwt);
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
