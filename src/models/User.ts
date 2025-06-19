import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  role: string;
  name?: string;
  avatarUrl?: string;
  lastChattedWith?: string,
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastChattedWith: String,
  avatarUrl: String,
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
},
  {
    timestamps: true
  });


const User = models.User || model<IUser>('User', userSchema);

export default User;


