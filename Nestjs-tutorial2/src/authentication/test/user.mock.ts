import User from '../../users/user.entity';

const mockedUser: User = {
  id: 1,
  email: 'user@email.com',
  name: 'John',
  password: '$2b$10$1A0wm81IcdCHkABDHEgHveMDZ9q/Q/L0YZLApRt4sSWzLTAK0UhJa',
  phoneNumber: '+840987623513',
  address: {
    id: 1,
    street: 'streetName',
    city: 'cityName',
    country: 'countryName',
  },
  isTwoFactorAuthenticationEnabled: false,
  stripeCustomerId: 'stripe_customer_id',
  isEmailConfirmed: false,
  isPhoneNumberConfirmed: false,
};

export default mockedUser;
