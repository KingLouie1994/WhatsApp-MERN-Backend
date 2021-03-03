// Import express.js
const express = require("express");

// Importing other libraries
const mongoose = require("mongoose");

// Initialising express application
const app = express();

// Middleware
require("dotenv").config();

// Welcome Route
app.get("/", (req, res, next) => {
  res.status(200).send("Welcome to the WhatsApp Clone API");
});

// App listening
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`API running on port:${port}`));
