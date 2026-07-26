import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Chat_Database",
    });
    console.log(
      `✅ MongoDB Database Connected Successfully! \n on this Host: ${db.connection.host}`
    );
  } catch (error) {
    console.error("🛑 CRITICAL: Database Connection Failed! : ", error);
    throw error;
  }
}
