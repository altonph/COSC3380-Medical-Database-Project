const { registerPatient, loginPatient, registerAdmin, loginAdmin, registerDoctor, loginDoctor } = require('../controllers/authController');

function handleRegisterPatient(req, res) {

    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    
    req.on('end', () => {
        try {
            const userData = JSON.parse(data);
            registerPatient(userData, res);
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.writeHead(400);
            res.end('Invalid JSON data');
        }
    });

}

function handleLoginPatient(req, res, jwt) {

    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        try {
            const { Username: username, Password: password } = JSON.parse(data);
            loginPatient(username, password, res, jwt);
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.writeHead(400);
            res.end('Invalid JSON data');
        }
    });

}

function handleRegisterAdmin(req, res) {

    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        try {
            const userData = JSON.parse(data);
            registerAdmin(userData, res);
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.writeHead(400);
            res.end('Invalid JSON data');
        }
    });

}

function handleLoginAdmin(req, res, jwt) {

    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        try {
            const { Username: username, Password: password } = JSON.parse(data);
            loginAdmin(username, password, res, jwt);
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.writeHead(400);
            res.end('Invalid JSON data');
        }
    });

}

function handleRegisterDoctor(req, res) {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', () => {
        try {
            const userData = JSON.parse(data);
            registerDoctor(userData, res);
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.writeHead(400);
            res.end('Invalid JSON data');
        }
    });
}

function handleLoginDoctor(req, res, jwt) {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', () => {
        try {
            const { Username: username, Password: password } = JSON.parse(data);
            loginDoctor(username, password, res, jwt);
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.writeHead(400);
            res.end('Invalid JSON data');
        }
    });
}

module.exports = {
    handleRegisterPatient,
    handleLoginPatient,
    handleRegisterAdmin,
    handleLoginAdmin,
    handleRegisterDoctor,
    handleLoginDoctor
};