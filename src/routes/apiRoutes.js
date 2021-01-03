import express from "express";

import {
  addNewMessage,
  getMessages,
  getUserMessages,
} from "../controllers/messageController";
import { checkAuthenticated } from "../controllers/userController";

const api = express.Router();
api.route("/messages").get(getMessages).post(addNewMessage);
api.route("/messages/:user").get(getUserMessages);
api.route("/users/me").get(checkAuthenticated, (req, res) => {
  console.log(req.user);
});

export default api;
