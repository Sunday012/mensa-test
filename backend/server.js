require('dotenv').config();
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const projectRoutes = require("./api/routes")
const pool = require('./db')
const app = express();

app.use(cors());
app.use(bodyParser.json());

// app.use("/api/projects", projectRoutes);
app.get("/projects", async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM projects");
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.get('/:id', async (req, res) => {
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

app.post('/projects', async (req, res) => {
  const { name, description, due_date } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO projects (name, description, due_date) VALUES (?, ?, ?)',
      [name, description, due_date]
    );
    res.status(201).json({ id: result.insertId, name, description, due_date });
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
});

app.put('/:id', async (req, res) => {
  const {id} = req.params;
  const {name, description} = req.body;
  try {
      await pool.query(
        'UPDATE projects SET name = ?, description = ?, due_date = ? WHERE id = ?',
        [name, description, due_date, id]
      );
      res.json({ id: req.params.id, name, description, due_date });
    } catch (error) {
      res.status(500).json({ message: 'Error updating project', error });
    }
});

app.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
});

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});