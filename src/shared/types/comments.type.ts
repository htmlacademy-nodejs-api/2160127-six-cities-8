import { User } from './user.type.js';
export type CommentsType = {
  comment: string;
  date: string;
  rating: number;
  author: User;
}
