const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3005;

// Create a MySQL connection pool
const pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'secret', // Change to your MySQL password
  database: 'employees' // Change to your MySQL database name
});

app.use(bodyParser.json());
app.use(cors());

// Route to get all users
app.get('/api/users', (req, res) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
