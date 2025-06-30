import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/user-service';
    await mongoose.connect(mongoUri);
    console.log('Connected to User Service database');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};
