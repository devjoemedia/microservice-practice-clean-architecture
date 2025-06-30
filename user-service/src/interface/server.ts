import 'reflect-metadata'; // Crucial for tsyringe
import '../infrastructure/di/container'; // Load DI configurations first
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from '../infrastructure/database/config/db';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`User Service listening on port ${PORT}`);
});
