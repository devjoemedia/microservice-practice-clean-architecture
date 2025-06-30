import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/auth-service";
    await mongoose.connect(mongoUri);
    console.log("Connected to Auth Service database");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};
