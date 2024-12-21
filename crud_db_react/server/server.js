const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Create a MySQL connection pool
const pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'secret', // Change to your MySQL password
  database: 'employees' // Change to your MySQL database name
});

app.use(bodyParser.json());
app.use(cors());

// Get all users
app.get('/api/users', (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to fetch users' });
      }
      return res.json(results);
    });
  });
  
  // Get a single user by ID
  app.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to fetch user' });
      }
      return res.json(results[0]);
    });
  });
  
  // Create a new user
  app.post('/api/users', (req, res) => {
    const { username, email } = req.body;
    pool.query('INSERT INTO users (username, email) VALUES (?, ?)', [username, email], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to create user' });
      }
      return res.status(201).json({ message: 'User created successfully' });
    });
  });
  
  // Update a user by ID
  app.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const { username, email } = req.body;
    pool.query('UPDATE users SET username = ?, email = ? WHERE id = ?', [username, email, id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to update user' });
      }
      return res.json({ message: 'User updated successfully' });
    });
  });
  
  // Delete a user by ID
  app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to delete user' });
      }
      return res.json({ message: 'User deleted successfully' });
    });
  });  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
