const { 
        registerPatient, loginPatient, registerAdmin, loginAdmin, 
        registerDoctor, loginDoctor, registerStaff, loginStaff, 
        editDentist, editStaff,  editPatient, archiveDentist,
        archivePatient, archiveStaff, getUserRole, getStaffProfile, updateStaffProfile
} = require('../controllers/authController');
const url = require('url');

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

function handleRegisterStaff(req, res) {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        try {
            const staffData = JSON.parse(data);
            registerStaff(staffData, res);

        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.writeHead(400);
            res.end('Invalid JSON data');
        }
    });
}

function handleLoginStaff(req, res, jwt) {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        try {
            const { Username: username, Password: password } = JSON.parse(data);
            loginStaff(username, password, res, jwt);
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.writeHead(400);
            res.end('Invalid JSON data');
        }
    });
}

function handleEditDentist(req, res) {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        try {
            const parsedUrl = url.parse(req.url, true);
            const dentistID = parsedUrl.pathname.split('/').pop(); // Extract dentistID from the URL
            const userData = JSON.parse(data);
            editDentist(dentistID, userData, res);
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.writeHead(400);
            res.end('Invalid JSON data');
        }
    });
}

function handleEditStaff(req, res) {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        try {
            const parsedUrl = url.parse(req.url, true);
            const staffID = parsedUrl.pathname.split('/').pop(); // Extract staffID from the URL
            const userData = JSON.parse(data);
            editStaff(staffID, userData, res);
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.writeHead(400);
            res.end('Invalid JSON data');
        }
    });
}

const handleEditPatient = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        try {
            const parsedUrl = url.parse(req.url, true);
            const patientID = parsedUrl.pathname.split('/').pop(); // Extract patientID from the URL
            const userData = JSON.parse(body);
            editPatient(patientID, userData, res);
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.writeHead(400);
            res.end('Invalid JSON data');
        }
    });
};

function handleArchiveDentist(req, res) {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        console.log('Received data:', data);
        try {
            const parsedUrl = url.parse(req.url, true);
            const dentistID = parsedUrl.pathname.split('/').pop(); // Extract dentistID from the URL
            const { End_date } = JSON.parse(data);
            archiveDentist(dentistID, End_date, res);
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.writeHead(400);
            res.end('Invalid JSON data');
        }
    });
}

function handleArchiveStaff(req, res) {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
      });
  
      req.on('end', () => {
        try {
            const parsedUrl = url.parse(req.url, true);
            const staffID = parsedUrl.pathname.split('/').pop(); // Extract staffID from the URL
            const { End_date } = JSON.parse(data);
            archiveStaff(staffID, End_date, res);
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.writeHead(400);
            res.end('Invalid JSON data');
        }
    });
}
  
function handleGetUserRole(req, res) {
  let data = '';
    req.on('data', chunk => {
        data += chunk;
    });
    req.on('end', () => {
        try {
            const { Username: username, Password: password } = JSON.parse(data);
            getUserRole(username, password, res);
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.writeHead(400);
            res.end('Invalid JSON data');
        }
    });
}

function handleArchivePatient(req, res) {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        try {
            const parsedUrl = url.parse(req.url, true);
            const patientID = parsedUrl.pathname.split('/').pop(); // Extract patientID from the URL
            archivePatient(patientID, res);
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            res.writeHead(400);
            res.end('Invalid JSON data');
        }
    });
}

const handleGetStaffProfile = (req, res, jwt) => {
    const { url, method } = req;
    
    if (method === 'GET' && url === '/api/staff/profile') {
        const decodedToken = verifyToken(req.headers.authorization, jwt);
        if (!decodedToken) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Unauthorized' }));
            return;
        }

        const { staffID } = decodedToken;
        getStaffProfile(req, res, staffID);

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

const handleUpdateStaffProfile = (req, res, jwt) => {
    const { url, method } = req;
    
    if (method === 'PATCH' && url === '/api/staff/profile/update') {
        const decodedToken = verifyToken(req.headers.authorization, jwt);
        if (!decodedToken) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Unauthorized' }));
            return;
        }

        const { staffID } = decodedToken;
        
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); 
        });

        req.on('end', () => {
            try {
                const updatedProfile = JSON.parse(body);
                updateStaffProfile(req, res, staffID, updatedProfile);
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
    handleRegisterPatient,
    handleLoginPatient,
    handleRegisterAdmin,
    handleLoginAdmin,
    handleRegisterDoctor,
    handleLoginDoctor,
    handleRegisterStaff,
    handleLoginStaff,
    handleEditDentist,
    handleEditStaff,
    handleEditPatient,
    handleArchiveDentist,
    handleArchiveStaff,
    handleArchivePatient,
    handleGetUserRole,
    handleGetStaffProfile,
    handleUpdateStaffProfile
};
