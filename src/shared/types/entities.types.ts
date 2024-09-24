export type UserType = {
  name: string;
  email: string;
  avatar: string;
  password: string;
  userType: string;
};

export type CommentsType = {
  comment: string;
  date: string;
  rating: number;
  author: UserType;
};

export type LocationType = {
  latitude: number;
  longitude: number;
};

export type OfferType = {
  title: string;
  description: string;
  date: Date;
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
  author: UserType;
  comments: number;
  location: LocationType;
};

export enum OfferTypeEnum {
  apartment = 'apartment',
  house = 'house',
  room = 'room',
  hotel = 'hotel'
}
