import express from "express";

import {
  addNewMessage,
  getMessages,
  getUserMessages,
} from "../controllers/messageController";
import {
  getUser,
  checkAuthenticated,
  updateUser,
} from "../controllers/userController";

const api = express.Router();
api.route("/messages").get(getMessages).post(addNewMessage);
api.route("/messages/:user").get(getUserMessages);
api
  .route("/users/me")
  .get(checkAuthenticated, getUser)
  .post(checkAuthenticated, updateUser);

export default api;
