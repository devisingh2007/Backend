const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/note.routes");

dotenv.config();

// Connect database
connectDB();

const app = express();

app.use(express.json());

// Routes
app.use("/api/notes", noteRoutes);

module.exports = app;