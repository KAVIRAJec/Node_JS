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

  // Create the "users" table if it doesn't exist
  dbConnection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table "users" created (if it didn\'t exist)');
    }
  });
});

// Serve static files from the "public" directory (e.g., styles.css)
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define a route to fetch and display table data
app.get('/', (req, res) => {
  dbConnection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error executing the query:', err.message);
      return res.status(500).send('Error fetching data from the database');
    }
    // Render the fetched data in the HTML page using EJS
    res.render('index', { users: results });
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
