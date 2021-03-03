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

// Connenting to DB and app listening
const port = process.env.PORT || 8000;
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@portfolio.us1zu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`API running on port:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
