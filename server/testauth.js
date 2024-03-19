// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

// Middleware to parse incoming JSON requests
app.use(express.json());

// Array to store refresh tokens
let refreshTokens = [];

// Route to exchange refresh token for access token
app.post('/token', (req, res) => {
    // Extract refresh token from request body
    const refreshToken = req.body.token;
    // If no token is provided, send unauthorized status
    if (refreshToken == null) return res.sendStatus(401);
    // If the provided refresh token is not in the list of stored tokens, send forbidden status
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    // Verify the refresh token and generate a new access token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        // If token verification fails, send forbidden status
        if (err) return res.sendStatus(403);
        // Generate a new access token for the user
        const accessToken = generateAccessToken({ name: user.name });
        // Send the new access token as a JSON response
        res.json({ accessToken: accessToken });
    });
});

// Route to logout and invalidate a refresh token
app.delete('/logout', (req, res) => {
    // Remove the provided refresh token from the array of stored tokens
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    // Send no content status to indicate successful logout
    res.sendStatus(204);
});

// Route to authenticate and generate access and refresh tokens
app.post('/login', async (req, res) => {
    // Authenticate the user here (not implemented in this code snippet)
    
    // Extract username from request body
    const username = req.body.username;
    // Create a user object with the username
    const user = {name : username };
    // Generate a new access token
    const accessToken = generateAccessToken(user);
    // Generate a new refresh token
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    // Store the refresh token in the array of stored tokens
    refreshTokens.push(refreshToken);
    // Send the access and refresh tokens as a JSON response
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

// Function to generate an access token
function generateAccessToken(user) {
    // Generate a JWT access token with the user data and a short expiration time
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

// Start the server and listen on port 4000
app.listen(4000);
