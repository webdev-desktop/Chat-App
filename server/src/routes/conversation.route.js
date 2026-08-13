import express from "express";
import isAuthentication from "../middlewares/auth.js";
import conversation from "../controllers/conversation/conversion.controller.js";

const conversationRoutes = express.Router();

conversationRoutes.get("/", isAuthentication, conversation);

export default conversationRoutes;
