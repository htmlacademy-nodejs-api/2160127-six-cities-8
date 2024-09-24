export interface IUser {
  name: string;
  email: string;
  avatar: string;
  password: string;
  userType: string;
}

export interface IComments {
  comment: string;
  date: string;
  rating: number;
  author: IUser;
}

export interface ILocation {
  latitude: number;
  longitude: number;
}

export interface IOffer {
  title: string;
  description: string;
  date: string;
  city: string;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  quests: number;
  price: number;
  goods: string[];
  host: IUser;
  comments: number;
  location: ILocation;
}
