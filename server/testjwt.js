// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

// Middleware to parse incoming JSON requests
app.use(express.json());

// Sample posts data
const posts = [
    {
        username: 'Kyle',
        password: 'password1',
        title: 'Post 1'
    },
    {
        username: 'Jim',
        password: 'password2',
        title: 'Post 2'
    }
];

// Route to get posts, protected by authentication
app.get('/posts', authenticateToken, (req, res) => {
    // Filter posts based on username extracted from JWT
    res.json(posts.filter(post => post.username === req.user.name));
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

// Start the server and listen on port 5000
app.listen(5000);
