/*
// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Middleware to parse incoming JSON requests
app.use(express.json());

// Array to store users (in-memory storage for simplicity)
const users = [];

// Array to store user posts
const posts = [];

app.get('/users', (req, res) => {
    res.json(users); // Return the array of users as JSON
});

// Route to register a new user
// Route to register a new user and create a new post
app.post('/register', async (req, res) => {
    try {
        // Hash the password using bcrypt with a salt of 10 rounds
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { username: req.body.username, password: hashedPassword };
        users.push(user); // Add the user to the users array

        // Create a new post for the registered user
        const newPost = {
            username: req.body.username,
            title: "Welcome to our platform!"
        };
        posts.push(newPost); // Add the new post to the posts array

        res.status(201).send(); // Respond with status 201 (Created) to indicate successful creation
    } catch {
        res.status(500).send(); // If an error occurs, respond with status 500 (Internal Server Error)
    }
});


// Route to authenticate and generate access and refresh tokens
app.post('/login', async (req, res) => {
    // Authenticate the user (check if username exists and password matches)
    const user = users.find(user => user.username === req.body.username);
    if (user == null) {
        return res.status(400).send('Cannot find user'); // If user is not found, respond with status 400 (Bad Request)
    }
    try {
        // Compare the provided password with the hashed password stored for the user
        if (await bcrypt.compare(req.body.password, user.password)) {
            // Generate a new access token
            const accessToken = generateAccessToken({ username: user.username });
            // Generate a new refresh token
            const refreshToken = jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_SECRET);
            // Send the access and refresh tokens as a JSON response
            res.json({ accessToken: accessToken, refreshToken: refreshToken });
        } else {
            res.status(401).send('Invalid password'); // If passwords don't match, respond with status 401 (Unauthorized)
        }
    } catch {
        res.status(500).send(); // If an error occurs, respond with status 500 (Internal Server Error)
    }
});



// Route to fetch posts, protected by authentication
app.get('/posts', authenticateToken, (req, res) => {
    // Filter posts based on the authenticated user's username
    const userPosts = posts.filter(post => post.username === req.user.username);
    res.json(userPosts);
});

let refreshTokens = [];

// Route to exchange refresh token for access token
app.post('/token', (req, res) => {
    // Extract refresh token from request body
    const refreshToken = req.body.token;
    // If no token is provided, send unauthorized status
    if (!refreshToken) return res.sendStatus(401);

    // Verify the refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        // If token verification fails, send forbidden status
        if (err) {
            console.error("Error verifying refresh token:", err);
            return res.sendStatus(403);
        }
        // Generate a new access token for the user
        const accessToken = generateAccessToken({ name: user.name });
        // Send the new access token as a JSON response
        res.json({ accessToken: accessToken });
    });
});


app.delete('/logout', (req, res) => {
    // Remove the provided refresh token from the array of stored tokens
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    // Send no content status to indicate successful logout
    res.sendStatus(204);
});


// Middleware function to authenticate JWT token
function authenticateToken(req, res, next) {
    // Extract authorization header
    const authHeader = req.headers['authorization'];
    // Extract token from header (Bearer token)
    const token = authHeader && authHeader.split(' ')[1];
    // If no token is provided, send unauthorized status
    if (token == null) return res.sendStatus(401);

    // Verify JWT token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        // If token verification fails, send forbidden status
        if (err) return res.sendStatus(403);
        // Attach user information to request object for further use
        req.user = user;
        // Call next middleware
        next();
    });
}

// Function to generate an access token
function generateAccessToken(user) {
    // Generate a JWT access token with the user data and a short expiration time
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

// Start the server and listen on port 5000
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
*/



// authentication using http server
const http = require('http');
const url = require('url');
const { parse } = require('querystring');
const bcrypt = require('bcrypt');

// In-memory storage for user data
const users = [];

// Function to handle user registration
function registerUser(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk; // Convert buffer to string
    });
    req.on('end', async () => {
        const { name, password } = JSON.parse(body);
        // debugging
        // console.log('Name:', name);
        // console.log('Password:', password);
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            users.push({ name, password: hashedPassword });
            res.writeHead(201, { 'Content-Type': 'text/plain' });
            res.end();
        } catch (error) {
            console.error('Error hashing password:', error);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        }
    });
}

// Function to handle user login
function loginUser(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk; // Convert buffer to string
    });
    req.on('end', async () => {
        const { name, password } = JSON.parse(body);
        const user = users.find(user => user.name === name);
        if (!user) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Cannot find user');
            return;
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Success');
            } else {
                res.writeHead(401, { 'Content-Type': 'text/plain' });
                res.end('Not allowed');
            }
        } catch {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        }
    });
}

function getUsers(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
}

// Create HTTP server
const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    if (req.method === 'POST') {
        if (pathname === '/users') {
            registerUser(req, res);
        } else if (pathname === '/users/login') {
            loginUser(req, res);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    } else if (req.method === 'GET') {
        if (pathname === '/users') {
            getUsers(req, res);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Start the server and listen on port 5000
server.listen(5000, () => {
    console.log('Server is running on port 5000');
}); 


/*
// authentication using express
const express = require('express'); // Import the Express framework
const app = express(); // Create an instance of Express
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

app.use(express.json()); // Middleware to parse JSON bodies of requests

const users = []; // Array to store user data (in-memory storage for simplicity)

// Route to get all users
app.get('/users', (req, res) => {
    res.json(users); // Return the array of users as JSON
});

// Route to register a new user
app.post('/users', async (req, res) => {
    try {
        // Hash the password using bcrypt with a salt of 10 rounds
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { name: req.body.name, password: hashedPassword }; // Create a user object
        users.push(user); // Add the user to the users array
        res.status(201).send(); // Respond with status 201 (Created) to indicate successful creation
    } catch {
        res.status(500).send(); // If an error occurs, respond with status 500 (Internal Server Error)
    }
});

// Route to authenticate a user
app.post('/users/login', async (req, res) => {
    // Find the user in the users array based on the provided username
    const user = users.find(user => user.name === req.body.name);
    if (user == null) {
        return res.status(400).send('Cannot find user') // If user is not found, respond with status 400 (Bad Request)
    }
    try {
        // Compare the provided password with the hashed password stored for the user
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.send("Success"); // If passwords match, respond with "Success"
        } else {
            res.send("Not allowed"); // If passwords don't match, respond with "Not allowed"
        }
    } catch {
        res.status(500).send(); // If an error occurs, respond with status 500 (Internal Server Error)
    }
})

app.listen(5000); // Start the server and listen on port 5000
*/

// testing in postman
// POST http://localhost:5000/users
// {
//     "name": "Kyle",
//     "password": "password"
// }

// GET http://localhost:5000/users

// POST http://localhost:5000/users/login
// {
//     "name": "Kyle",
//     "password": "password"
// }

// POST http://localhost:5000/users/login
// {
//     "name": "Kyle",
//     "password": "passw"
// }

// POST http://localhost:5000/users/login
// {
//     "name": "Kyl",
//     "password": "password"
// }
