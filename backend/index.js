import express from "express";
import path from "path";

const app = express();
const PORT = 3000;
const messages = [
  {
    text: "some text",
    owner: "Tim",
  },
  {
    text: "more text",
    owner: "Tana",
  },
];

app.use(express.static(path.join(__dirname, "../frontend/dist/frontend")));
app.get("/message", (req, res) => {
  console.log("get response in /messages route");
  res.json(messages);
});

/*
app.get("/", (req, res) => {
  res.send("Get Response in / route!");
});

app.get("/messages", (req, res) => {
  console.log("get response in /messages route");
  res.json(messages);
});
*/
app.listen(PORT, () => {
  console.log(`Your server is running on Port: ${PORT}`);
});
