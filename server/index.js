const http = require('http');
const { json } = require('body-parser');
const cors = require('cors');
const pool = require('./models/db');

// Create a server instance
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.end('Server is running');
});

// Apply CORS middleware
server.on('request', cors());

// Apply JSON middleware
server.on('request', json());

//testing database connection to backend
pool.query('SELECT * FROM patient', (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(results);
  });

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
