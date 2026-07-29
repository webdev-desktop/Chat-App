import express from "express";
import isAuthentication from "../middlewares/auth.js";
import { allUsers, findUser } from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.get("/", isAuthentication, allUsers);
userRoutes.get("/user", isAuthentication, findUser);

export default userRoutes;
