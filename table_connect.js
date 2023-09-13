const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Create a database connection
const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'secret',
  database: 'employees'
});

// Connect to the database
dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the database');

  // Define a route to fetch and display table data
  app.get('/', (req, res) => {
    dbConnection.query('SELECT * FROM items', (err, results) => {
      if (err) {
        console.error('Error executing the query:', err.message);
        return res.status(500).send('Error fetching data from the database');
      }
      // Render the data as JSON
      res.json(results);
    });
  });
});

// Handle database connection errors
dbConnection.on('error', (err) => {
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Database connection was closed.');
  } else {
    console.error('Database error occurred:', err.message);
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
