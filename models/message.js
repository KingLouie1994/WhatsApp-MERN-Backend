// Import mongoose
const mongoose = require("mongoose");

// Defining schema
const Schema = mongoose.Schema;

// Creating Schema for messages
const messageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Message", messageSchema);
