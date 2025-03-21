require("dotenv").config();
console.log(process.env);

const express = require("express");
const cors = require("cors");
//const { Pool } = require("pg");
const { query } = require("./helpers/db.js");

const app = express();
app.use(cors());
app.use(express.json()); // Allow parsing of JSON bodies in requests
app.use(express.urlencoded({ extended: false })); // Allow parsing of URL-encoded bodies in requests
const port = process.env.PORT;

// GET route to fetch tasks
app.get("/", async (req, res) => {
  console.log(query);
  //const pool = openDb(); // Open database connection
  try {
    const result = await query("SELECT * FROM task");
    const rows = result.rows ? result.rows : [];
    res.status(200).json(rows); // Return the rows from the task table// chenge 6
  } catch (error) {
    //console.log(error);
    console.log("Error in GET / route:", error);
    res.statusMessage = error;
    res.status(500).json({ error: error.message }); // Internal server error
  }
});

// POST route to insert a new task
app.post("/new", async (req, res) => {
  try {
    const result = await query(
      "INSERT INTO task (description) VALUES ($1) RETURNING *",
      [req.body.description]
    );
    console.log("Inserted Task:", result.rows[0]);
    res
      .status(201)
      .json({ id: result.rows[0].id, description: result.rows[0].description });
  } catch (error) {
    console.log(error);
    res.statusMessage = error;
    res.status(500).json({ error: error });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = Number(req.params.id); // Get task id from the request parameters
  try {
    const result = await query("DELETE FROM task WHERE id = $1 ", [id]);
    res.status(200).json({ id: id });
  } catch (error) {
    console.log(error);
    res.statusMessage = error;
    res.status(500).json({ error: error });
  }
});

app.listen(port, () => {
  /*try {
    const pool = openDb();
    await pool.connect(); // Test the database connection
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1); // Exit if database connection fails
  }*/
  console.log(`Server is running on http://localhost:${port}`);
});
