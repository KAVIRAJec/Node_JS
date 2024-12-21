const db = require('../config/db');

exports.getAllTasks = async (req, res) => {
  const query = 'SELECT * FROM tasks';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error fetching tasks' });
    } else {
      res.send(results);
    }
  });
}

exports.getTaskById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const query = `SELECT * FROM tasks WHERE id = ${id}`;
  db.query(query, (err, results) => {
    if (err) {
      res.status(404).send({ message: 'Task not found' });
    } else {
      res.send(results[0]);
    }
  });
}

exports.addTask = async (req, res) => {
  const { name, description } = req.body;
  const query = `INSERT INTO tasks (name, description) VALUES (?, ?)`;
  db.query(query, [name, description], (err, results) => {
    if (err) {
      console.error('Error adding task:', err);
      res.status(500).send({ message: 'Error adding task' });
    } else {
      res.send({ message: 'Task added successfully' });
    }
  });
}

exports.updateTask = async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  const query = `UPDATE tasks SET name = ?, description = ? WHERE id = ${id}`;
  db.query(query, [name, description], (err, results) => {
    if (err) {
      res.status(404).send({ message: 'Task not found' });
    } else {
      res.send({ message: 'Task updated successfully' });
    }
  });
}

exports.deleteTask = async (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM tasks WHERE id = ${id}`;
  db.query(query, (err, results) => {
    if (err) {
      res.status(404).send({ message: 'Task not found' });
    } else {
      res.send({ message: 'Task deleted successfully' });
    }
  });
}
