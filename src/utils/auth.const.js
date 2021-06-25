export const passwordParams = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
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
  It must have minimum 8 letters, minimum one uppercase and one lovercase letter`,
  INVALID_EMAIL: 'Email is not correct',
  INVALID_USERNAME: 'Username must have only letters and numbers',
  REQUARIED: 'Cannot be empty',
  NOT_EQUALS_PASSWRODS: 'Passwords not equals',
};

export const TOKEN_NAME = 'tms-access-token';
export const OWNER_TOKEN_NAME = 'tms-owner';
export const CONFIRMED_STATUS = 'confirmed';