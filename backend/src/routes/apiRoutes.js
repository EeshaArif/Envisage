import express from "express";

import {
  addNewMessage,
  getMessages,
  getUserMessages,
} from "../controllers/messageController";
import {
  addNewTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "../controllers/taskController";
import {
  getUser,
  checkAuthenticated,
  updateUser,
  loginRequired,
} from "../controllers/userController";

const api = express.Router();
api.route("/messages").get(getMessages).post(addNewMessage);
api.route("/messages/:user").get(getUserMessages);
api
  .route("/users/me")
  .get(checkAuthenticated, loginRequired, getUser)
  .post(checkAuthenticated, updateUser);
api.route("/tasks").get(getAllTasks).post(addNewTask);
api.route("/tasks/:taskId").get(getTask).put(updateTask).delete(deleteTask);
export default api;
