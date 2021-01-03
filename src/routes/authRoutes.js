import express from "express";
import { login, register } from "../controllers/userController";

const auth = express.Router();
auth.route("/register").post(register);
auth.route("/login").post(login);
export default auth;
