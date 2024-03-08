import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserType } from '../../shares/types';

const userSchema = new mongoose.Schema<UserType>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'user', 'pending'],
    default: 'pending',
  },
});

userSchema.pre('validate', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model<UserType>('User', userSchema);

export default User;
