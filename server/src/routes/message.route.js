import express from "express";
import isAuthentication from "../middlewares/auth.js";
import sendMessage from "../controllers/messages/sendMessage.controller.js";

const messageRoutes = express.Router();

messageRoutes.post("/", isAuthentication, sendMessage);

export default messageRoutes;
