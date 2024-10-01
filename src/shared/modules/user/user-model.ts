import { Document, model, Schema } from 'mongoose';
import { UserType } from '../../types/entities.types.js';

export interface UserDocument extends UserType, Document {}

const userSchema = new Schema({
  name: String,
  email: String,
  avatarUrl: String,
  password: String,
  isPro: Boolean,
});

export const UserModel = model<UserDocument>('User', userSchema);
