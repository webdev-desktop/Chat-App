import express from "express";
import isAuthentication from "../middlewares/auth.js";
import { allUsers } from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.get("/", isAuthentication, allUsers);

export default userRoutes;
