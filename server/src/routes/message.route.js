import express from "express";
import isAuthentication from "../middlewares/auth.js";
import sendMessage from "../controllers/messages/sendMessage.controller.js";
import getMessage from "../controllers/messages/getMessage.controller.js";

const messageRoutes = express.Router();

messageRoutes.post("/", isAuthentication, sendMessage);
messageRoutes.get("/:conversationId", isAuthentication, getMessage);

export default messageRoutes;
