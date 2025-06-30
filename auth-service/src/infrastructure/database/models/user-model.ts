import mongoose, { Schema, Document } from 'mongoose';

export interface IUserDocument extends Document {
  id: string; // Storing the domain ID as a string, separate from MongoDB's _id
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true }, // Domain ID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUserDocument>('User', UserSchema);
