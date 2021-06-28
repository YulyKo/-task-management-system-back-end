export const passwordParams = {
  minLength: 6,
  minLowercase: 0,
  minUppercase: 0,
  minNumbers: 0,
  minSymbols: 0,
  returnScore: false,
  pointsPerUnique: 0,
  pointsPerRepeat: 0.5,
  pointsForContainingLower: 0,
  pointsForContainingUpper: 0,
  pointsForContainingNumber: 0,
  pointsForContainingSymbol: 0
};

export const locate = ['en-US'];

export const messages = {
  INVALID_PASSWORD: `Password is not correct.
  It must have minimum 6 symbols or letters`,
  INVALID_EMAIL: 'Email is not correct',
  INVALID_USERNAME: 'Username must have only letters and numbers',
  REQUARIED: 'Cannot be empty',
  NOT_EQUALS_PASSWRODS: 'Passwords not equals',
  USER_EXIST: 'User with this email already exist',
  USER_NOT_EXIST: 'User with this email already don&#39;t exist',
};

export const ACCESS_TOKEN = 'tms-access-token';
export const OWNER_KEY = 'tms-owner';
export const CONFIRMED_STATUS = 'tms-confirmed';
