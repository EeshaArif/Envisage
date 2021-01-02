import express from "express";
import { register } from "../controllers/userController";

const auth = express.Router();
auth.route("/register").post(register);
export default auth;
