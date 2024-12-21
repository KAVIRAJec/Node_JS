const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: "root",
  password: "secret",
  database: "employees"
});

db.connect((err) => {
    console.log(process.env.DB_HOST);
    console.log(process.env.DB_USER);
    console.log(process.env.DB_PASSWORD);
    console.log(process.env.DB_NAME);

  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to database');
    //createTable(); 
  }
});

function createTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT
      )`;
  
    db.query(createTableQuery, (err, result) => {
      if (err) {
        console.error('Error creating table:', err);
      } else {
        console.log('Table created successfully');
      }
    });
  }

module.exports = db;
