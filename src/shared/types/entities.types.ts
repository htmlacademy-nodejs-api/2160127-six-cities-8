export interface IUser {
  name: string;
  email: string;
  avatar: string;
  password: string;
  userType: 'normal' | 'pro';
}

export interface IComments {
  comment: string;
  date: string;
  rating: number;
  author: IUser;
}

export interface ILocation {
  latitude: string;
  longitude: string;
}

export interface IOffer {
  title: string;
  description: string;
  postDate: Date;
  city: string;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  hostType: string;
  bedrooms: number;
  quests: number;
  price: number;
  features: string[];
  author: IUser;
  comments: number;
  location: ILocation;
}
