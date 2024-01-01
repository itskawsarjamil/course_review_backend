import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({
  username: {
    type: String,
    unique: true,
    required: [true, 'username is required'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  role: {
    type: String,
    required: [true, 'role is required'],
    enum: ['user', 'admin'],
    default: 'user',
  },
});

export const User = model<TUser>('user', userSchema);
