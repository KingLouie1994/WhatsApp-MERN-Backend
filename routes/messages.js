// Initialise router
const router = require("express").Router();

// Import schema
const Message = require("../models/message");

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
