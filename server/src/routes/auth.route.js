import express from "express";
import isAuthentication from "../middlewares/auth.js";
import register from "../controllers/auth/register.controller.js";
import login from "../controllers/auth/login.controller.js";
import logout from "../controllers/auth/logout.controller.js";
import refreshToken from "../controllers/auth/refreshToken.controller.js";

const authRoutes = express.Router();

// POST   /api/v1/auth/register
authRoutes.post("/register", register);
// POST   /api/v1/auth/login
authRoutes.post("/login", login);
// POST   /api/v1/auth/logout
authRoutes.post("/logout", isAuthentication, logout);
// POST   /api/v1/auth/refresh
authRoutes.post("/refresh-token", refreshToken);

export default authRoutes;
