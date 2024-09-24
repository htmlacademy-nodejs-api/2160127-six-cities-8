export interface IUser {
  name: string;
  email: string;
  avatar: string;
  password: string;
  userType: 'normal' | 'pro';
}
