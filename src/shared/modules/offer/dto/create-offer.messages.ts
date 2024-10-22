export const CreateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  createdDate: {
    invalidFormat: 'createdDate must be a valid ISO date',
  },
  city: {
    invalid: 'type must be one of enum City',
  },
  previewImage: {
    invalid: 'Must be ref to «image»',
  },
  images: {
    invalidFormat: 'Field images must be an array',
  },
  isPremium: {
    invalid: 'type must be Boolean',
  },
  isFavorite: {
    invalid: 'type must be Buy and Sell',
  },
  rating: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum count is 1',
    maxValue: 'Maximum count is 5',
  },
  OfferTypeEnum: {
    invalid: 'type must be one of enum OfferTypeEnum',
  },
  bedrooms: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum count is 1',
    maxValue: 'Maximum count is 8',
  },
  quests: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum count is 1',
    maxValue: 'Maximum count is 10',
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100000',
  },
  features: {
    invalidFormat: 'Field features must be an array',
    invalidId: 'Categories field must be an array of valid id',
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
  location: {
    invalid: 'type must be one of enum Location',
  },
} as const;
