// Initialise router
const router = require("express").Router();

// Import schema
const Message = require("../models/message");

// Route to get all messages
router.get("/all", (req, res, next) => {
  Message.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Route to create new message
router.post("/new", (req, res, next) => {
  const message = req.body;
  Message.create(message, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

module.exports = router;
