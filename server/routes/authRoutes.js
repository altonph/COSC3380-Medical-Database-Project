const { registerUser, loginUser } = require('../controllers/authController');

function handleRegister(req, res) {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', () => {
        try {
            const userData = JSON.parse(data);
            registerUser(userData, res);
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.writeHead(400);
            res.end('Invalid JSON data');
        }
    });
}

function handleLogin(req, res) {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', () => {
        try {
            const { Username: username, Password: password } = JSON.parse(data);
            loginUser(username, password, res);
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.writeHead(400);
            res.end('Invalid JSON data');
        }
    });
}

module.exports = {
    handleRegister,
    handleLogin
};
