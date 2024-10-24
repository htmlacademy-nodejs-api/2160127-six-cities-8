export const CreateUserValidationMessage = {
  name: {
    minLength: 'Minimum name length must be 1',
    maxLength: 'Maximum name length must be 15',
  },
  email: {
    invalid: 'Email must be correct'
  },
  avatar: {
    invalidFormat: 'avatar picture must be ".jpg" or ".png"',
  },
  password: {
    minLength: 'Minimum password length is 6 symbols',
    maxLength: 'Maximum password length is 12 symbols',
  },
  isPro: {
    invalid: 'type must be boolean',
  },
} as const;
