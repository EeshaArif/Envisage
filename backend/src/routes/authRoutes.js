import express from "express";
import { findUser, login, register } from "../controllers/userController";

const auth = express.Router();
auth.route("/register").post(register);
auth.route("/login").post(login);
auth.route("/unique").post(findUser);
export default auth;
