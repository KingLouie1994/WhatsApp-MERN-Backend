// Import express.js
const express = require("express");

// Importing other libraries
const mongoose = require("mongoose");
const Pusher = require("pusher");

// Initialising express application
const app = express();

// Middleware
require("dotenv").config();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Configure and initialising pusher for real time updates
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

// Welcome Route
app.get("/", (req, res, next) => {
  res.status(200).send("Welcome to the WhatsApp Clone API");
});

// Import Routes
const messageRoute = require("./routes/messages");

// Use of Routes
app.use("/api/messages", messageRoute);

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

const db = mongoose.connection;

// Use pusher to recognise changes on DB
db.once("open", () => {
  console.log("DB connected");
  const msgCollection = db.collection("messages");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
        _id: messageDetails._id,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});
