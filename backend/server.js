require('dotenv').config();
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const pool = require('./db')
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/projects", async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM projects");
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM tasks");
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get('/projects:id', async (req, res) => {
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
app.get('/tasks/:id', async (req, res) => {
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

app.post('/projects', async (req, res) => {
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

app.post('/tasks', async (req, res) => {
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

app.put('/projects/:id', async (req, res) => {
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
app.put('/tasks/:id', async (req, res) => {
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

app.delete('/projects/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM tasks WHERE project_id = ?', [req.params.id]);
    await pool.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    res.json({ message: 'Project and associated tasks deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting project', error });
  }
});
app.delete('/tasks/:id', async (req, res) => {
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