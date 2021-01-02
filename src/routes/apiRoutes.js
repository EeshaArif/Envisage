import express from "express";
import {
  addNewMessage,
  getMessages,
  getUserMessages,
} from "../controllers/messageController";

const api = express.Router();
api.route("/messages").get(getMessages).post(addNewMessage);
api.route("/messages/:user").get(getUserMessages);

export default api;
