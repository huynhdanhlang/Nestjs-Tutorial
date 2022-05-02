import User from '../../users/user.entity';

const mockedUser: User = {
  id: 1,
  email: 'user@email.com',
  name: 'John',
  password: '$2b$10$1A0wm81IcdCHkABDHEgHveMDZ9q/Q/L0YZLApRt4sSWzLTAK0UhJa',
  address: {
    id: 1,
    street: 'streetName',
    city: 'cityName',
    country: 'countryName',
  },
  isTwoFactorAuthenticationEnabled: false,
  stripeCustomerId: 'stripe_customer_id',
};

export default mockedUser;
