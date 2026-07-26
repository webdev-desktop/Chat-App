import { createServer } from "http";
import "dotenv/config";
import connectDB from "./config/db.js";
import app from "./app.js";

const httpServer = createServer(app);

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB();

    // ✅ Pass io as parameter - no circular import
    // socketIo(io);

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server is Working on ${PORT} Port`);
    });
  } catch (error) {
    console.error("🛑 CRITICAL: Server Error! : ", error);
    process.exit(1);
  }
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
