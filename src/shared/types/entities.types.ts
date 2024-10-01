export type UserType = {
  name: string;
  email: string;
  avatar: string;
  password: string;
  isPro: boolean;
}

export type CommentsType = {
  comment: string;
  date: string;
  rating: number;
  author: UserType;
}

export type LocationType = {
  latitude: number;
  longitude: number;
}

export type Location = {
  latitude: number;
  longitude: number;
}

export type CityType = {
  name: string;
  location: Location;
}

export enum OfferTypeEnum {
  apartment = 'apartment',
  house = 'house',
  room = 'room',
  hotel = 'hotel'
}

export enum FeaturesTypeEnum {
  'Breakfast' = 'Breakfast',
  'Air conditioning' = 'Air conditioning',
  'Laptop friendly workspace' = 'Laptop friendly workspace',
  'Baby seat' = 'Baby seat',
  'Washer' = 'Washer',
  'Towels' = 'Towels',
  'Fridge' = 'Fridge',
}


export type OfferType = {
  title: string;
  description: string;
  date: Date;
  city: CityType;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  hostType: OfferTypeEnum;
  bedrooms: number;
  quests: number;
  price: number;
  features: FeaturesTypeEnum[];
  author: UserType;
  comments: number;
  location: LocationType;
};


