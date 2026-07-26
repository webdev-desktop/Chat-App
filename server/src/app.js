import express from "express";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

import { errorMiddleware } from "./middlewares/error.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/message", messageRoute);

app.use(errorMiddleware);

export default app;
