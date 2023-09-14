const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Create a database connection
const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'secret',
  database: 'employees',
});

// Connect to the database
dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the database');
});

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Create a route for displaying all users(READ)
app.get('/', (req, res) => {
  const sql = 'SELECT * FROM users';

  dbConnection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err.message);
      return;
    }

    res.render('users', { users: results });
  });
});

// Create a route for adding a new user (CREATE)
app.post('/', (req, res) => {
  const { username, email } = req.body;
  const sql = 'INSERT INTO users (username, email) VALUES (?, ?)';

  dbConnection.query(sql, [username, email], (err, result) => {
    if (err) {
      console.error('Error adding a new user:', err.message);
      return;
    }

    console.log('New user added:', result.insertId);
    res.redirect('/');
  });
});

// Define the route for editing a user
app.get('/edit/:id', (req, res) => {
    const userId = req.params.id;
    // Fetch the user by ID from the database or your data source
    const user = { id: userId};
    res.render('edit', { user });
  });

// Create a route for updating a user (UPDATE)
app.post('/update/:id', (req, res) => {
  const userId = req.params.id;
  const { username, email } = req.body;
  const sql = 'UPDATE users SET username = ?, email = ? WHERE id = ?';

  dbConnection.query(sql, [username, email, userId], (err, result) => {
    if (err) {
      console.error('Error updating user:', err.message);
      res.redirect(`/edit/${userId}?error=${encodeURIComponent(err.message)}`);
    }
    console.log('User updated:', result.affectedRows);
    res.redirect('/');
  });
});

// Create a route for deleting a user (DELETE)
app.post('/delete/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'DELETE FROM users WHERE id = ?';

  dbConnection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err.message);
      return;
    }

    console.log('User deleted:', result.affectedRows);
    res.redirect('/');
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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
