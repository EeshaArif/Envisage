import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jsonwebtoken from "jsonwebtoken";
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
/*
// jwt setup
app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "RESTFULAPIs",
      (err, decode) => {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});
*/
app.use(express.static(path.join(__dirname, "/frontend/dist/frontend")));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/frontend/dist/frontend/index.html"));
});

app.use("/api", api);
app.use("/auth", auth);

app.listen(process.env.PORT, () => {
  console.log(`Your server is running on Port: ${process.env.PORT}`);
});
