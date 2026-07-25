import express from "express";
import { createServer } from "http";
import "dotenv/config";
import connectDB from "./config/db.js";

const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT;

const startServer = async () => {
  await connectDB();

  // ✅ Pass io as parameter - no circular import
  // socketIo(io);

  httpServer.listen(PORT, () => {
    console.log(`Server is Working on ${PORT} Port`);
  });
};

startServer();

process.on("SIGTERM", () => {
  console.log("⚡ SIGTERM received. Closing server...");
  httpServer.close(() => {
    console.log("✅ HTTP server closed");
    process.exit(0);
  });
});

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Promise Rejection:", err.message);
  httpServer.close(() => process.exit(1));
});
