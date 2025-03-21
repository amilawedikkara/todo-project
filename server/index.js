require("dotenv").config();
const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todo.js");

const app = express();
app.use(cors());
app.use(express.json()); // Allow parsing of JSON bodies in requests
app.use(express.urlencoded({ extended: false })); // Allow parsing of URL-encoded bodies in requests
app.use("/todo", todoRoutes); // todos or tasks?
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
