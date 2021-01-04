import express from "express";
// import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import api from "./src/routes/apiRoutes";
import auth from "./src/routes/authRoutes";

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
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  next();
});
app.use("/api", api);
app.use("/auth", auth);

app.listen(process.env.PORT, () => {
  console.log(`Your server is running on Port: ${process.env.PORT}`);
});
