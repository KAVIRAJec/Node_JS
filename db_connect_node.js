const mysql = require('mysql2');

// Create a database connection
const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'secret',
  database: 'employees'
});

// Attempt to connect to the database
dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database');
  }
});

// Handle database connection errors
dbConnection.on('error', (err) => {
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Database connection was closed.');
  } else {
    console.error('Database error occurred:', err.message);
  }
});

// Close the database connection when your application exits (optional)
process.on('SIGINT', () => {
  dbConnection.end((err) => {
    if (err) {
      console.error('Error closing the database connection:', err.message);
    } else {
      console.log('Database connection closed.');
    }
    process.exit();
  });
});
