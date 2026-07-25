import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Chat-Database",
    });
    console.log(
      `Database Connected Successfully! on this Host: ${db.connection.host}`
    );
  } catch (error) {
    console.log("Database Error! : ", error);
  }
}
