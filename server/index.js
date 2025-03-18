const express = require("express");
const cors = require("cors");
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json()); // Allow parsing of JSON bodies in requests

const port = 3001;

const openDb = () => {
  return new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo',
    password: 'todo@123',
    port: 5432,
  });
};

// GET route to fetch tasks
app.get("/", async (req, res) => {
  const pool = openDb();  // Open database connection
  try {
    const result = await pool.query('SELECT * FROM tasks');
    res.status(200).json(result.rows);  // Return the rows from the task table
  } catch (error) {
    res.status(500).json({ error: error.message });  // Internal server error
  } finally {
    pool.end();  // Close the pool after query is done
  }
});

// POST route to insert a new task
app.post("/new", async (req, res) => {
  const pool = openDb(); // Open database connection
  const { description } = req.body; // Get task description from the request body

  try {
    // Insert task into the database
    const result = await pool.query(
      'INSERT INTO tasks (description) VALUES ($1) RETURNING *',
      [description]  // Parameterized query to prevent SQL injection
    );

    // Return the inserted task (including the generated ID)
    res.status(201).json(result.rows[0]);  // Return the first row (the inserted task)
  } catch (error) {
    res.status(500).json({ error: error.message });  // Internal server error
  } finally {
    pool.end();  // Close the pool after query is done
  }
});

app.listen(port, async () => {
  try {
    const pool = openDb();
    await pool.connect(); // Test the database connection
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);  // Exit if database connection fails
  }
});
