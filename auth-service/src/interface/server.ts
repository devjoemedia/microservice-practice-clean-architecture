import express from "express";
import "reflect-metadata";
import authRoutes from "./routes/authRoutes";
import "../infrastructure/di/container"; // DI registration
import dotenv from "dotenv";
import { connectDB } from "../infrastructure/database/config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
