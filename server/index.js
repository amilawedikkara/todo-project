const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json()); // Allow parsing of JSON bodies in requests
app.use(express.urlencoded({ extended: false })); // Allow parsing of URL-encoded bodies in requests
const port = 3001;

const openDb = () => {
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "todo",
    password: "todo@123",
    port: 5432,
  });
  return pool;
};

// GET route to fetch tasks
app.get("/", async (req, res) => {
  const pool = openDb(); // Open database connection
  try {
    const result = await pool.query("SELECT * FROM task");
    res.status(200).json(result.rows); // Return the rows from the task table
  } catch (error) {
    res.status(500).json({ error: error.message }); // Internal server error
  }
});

// POST route to insert a new task
app.post("/new", async (req, res) => {
  const pool = openDb(); // Open database connection
  pool.query(
    "INSERT INTO task (description) VALUES ($1) RETURNING *",
    [req.body.description],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(201).json(results.rows[0]);
      }
    }
  );
});

app.delete("/delete/:id", async (req, res) => {
  const pool = openDb(); // Open database connection
  const id = parseInt(req.params.id); // Get task id from the request parameters
  pool.query('DELETE FROM task WHERE id = $1', 
    [id],
    (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json({ id: id });
    }
  });
});

app.listen(port, async () => {
  try {
    const pool = openDb();
    await pool.connect(); // Test the database connection
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1); // Exit if database connection fails
  }
});
