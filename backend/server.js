require('dotenv').config();
const express = require('express')
const cors = require('cors');
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const pool = require('./db')
const app = express();
const jwt = require('jsonwebtoken')

app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET;
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
  }
  try {
      const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (existingUser.length > 0) {
          return res.status(400).json({ message: 'Email already exist' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username,email, hashedPassword]);

      res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
  }
  try {
      const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (user.length === 0) {
          return res.status(400).json({ message: 'Invalid username or password' });
      }
      const isMatch = await bcrypt.compare(password, user[0].password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid username or password' });
      }
      const token = jwt.sign({ id: user[0].id, username: user[0].username }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error Failed to Login' });
  }
});

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
      return res.status(401).json({ message: 'Access denied' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
          return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
  });
};

app.get("/projects", authenticateToken, async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM projects");
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/tasks", authenticateToken, async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM tasks");
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get('/projects:id', authenticateToken, async (req, res) => {
  const {id} = req.params;
  try {
    const [result] = await pool.query("SELECT * FROM projects WHERE id = ?", [id]);
    if (result.length === 0) return res.status(404).json({ message: "Project not found" });
    res.json(result[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get('/tasks/:id', authenticateToken, async (req, res) => {
  const {id} = req.params;
  try {
    const [result] = await pool.query("SELECT * FROM tasks WHERE project_id = ?", [id]);
    if (result.length === 0) return res.status(404).json({ message: "No tasks found for this project" });
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get('/projects', authenticateToken, async (req, res) => {
  const { name, dueDate, numTasks } = req.query;

  try {
    let query = 'SELECT p.*, (SELECT COUNT(*) FROM tasks WHERE project_id = p.id) AS task_count FROM projects p';
    let queryParams = [];
    let whereClauses = [];

    if (name) {
      whereClauses.push('p.name LIKE ?');
      queryParams.push(`%${name}%`);
    }
    if (dueDate) {
      whereClauses.push('p.due_date = ?');
      queryParams.push(dueDate);
    }
    if (numTasks) {
      whereClauses.push('(SELECT COUNT(*) FROM tasks WHERE project_id = p.id) >= ?');
      queryParams.push(parseInt(numTasks, 10));
    }

    if (whereClauses.length > 0) {
      query += ' WHERE ' + whereClauses.join(' AND ');
    }

    const [result] = await pool.query(query, queryParams);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/projects', authenticateToken, async (req, res) => {
  const { name, description, due_date } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO projects (name, description, due_date) VALUES (?, ?, ?)',
      [name, description, due_date]
    );
    res.status(201).json({ id: result.insertId, name, description, due_date });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating project', error });
  }
});

app.post('/tasks', authenticateToken, async (req, res) => {
  const { name, description, status, project_id } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO tasks (name, description, status, project_id) VALUES (?, ?, ?, ?)',
      [name, description, status, project_id]
    );
    res.status(201).json({ id: result.insertId, name, description, status, project_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating tasks', error });
  }
});

app.put('/projects/:id', authenticateToken, async (req, res) => {
  const {id} = req.params;
  const {name, description, due_date} = req.body;
  try {
      await pool.query(
        'UPDATE projects SET name = ?, description = ?, due_date = ? WHERE id = ?',
        [name, description, due_date, id]
      );
      res.json({ id: req.params.id, name, description, due_date });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating project', error });
    }
});
app.put('/tasks/:id', authenticateToken, async (req, res) => {
  const {id} = req.params;
  const {name, description, status} = req.body;
  try {
      await pool.query(
        'UPDATE tasks SET name = ?, description = ?, status = ? WHERE id = ?',
        [name, description, status, id]
      );
      res.json({ name, description, status, id: id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating task', error });
    }
});

app.delete('/projects/:id',authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM tasks WHERE project_id = ?', [req.params.id]);
    await pool.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    res.json({ message: 'Project and associated tasks deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting project', error });
  }
});
app.delete('/tasks/:id', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
    res.json({ message: 'tasks deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting project', error });
  }
});

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});