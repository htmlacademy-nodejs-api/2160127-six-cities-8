import { City } from './city.type.js';
import { Features } from './feature.type.js';
import { Location } from './location.type.js';
import { OfferTypeEnum } from './offer-type.enum.js';
import { User } from './user.type.js';

export type OfferType = {
  title: string;
  description: string;
  date: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  hostType: OfferTypeEnum;
  bedrooms: number;
  quests: number;
  price: number;
  features: Features[];
  author: User;
  comments: number;
  location: Location;
};
