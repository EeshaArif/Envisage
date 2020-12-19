import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import {
  addNewMessage,
  getMessages,
} from "./src/controllers/messageController";
require("dotenv").config();
const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/frontend/dist/frontend")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/frontend/dist/frontend/index.html"));
});

app.route("/api/message").get(getMessages).post(addNewMessage);

app.listen(process.env.PORT, () => {
  console.log(`Your server is running on Port: ${process.env.PORT}`);
});
