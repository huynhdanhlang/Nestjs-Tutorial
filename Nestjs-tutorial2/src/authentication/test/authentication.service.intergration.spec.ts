import { AuthenticationServices } from '../authentication.service';
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../../users/user.entity';
import { UserService } from '../../users/user.service';
import mockedJwtService from '../../utils/mocks/jwt.service';
import mockedConfigService from '../../utils/mocks/config.service';
import bcrypt from 'bcrypt';
import mockedUser from './user.mock';

jest.mock('bcrypt');

describe('The AuthenticationService', () => {
  let authenticationService: AuthenticationServices;
  let usersService: UserService;
  let bcryptCompare: jest.Mock;
  let userData: User;
  let findUser: jest.Mock;
  beforeEach(async () => {
    userData = {
      ...mockedUser,
    };
    findUser = jest.fn().mockResolvedValue(userData);
    const usersRepository = {
      findOne: findUser,
    };

    bcryptCompare = jest.fn().mockReturnValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    const module = await Test.createTestingModule({
      providers: [
        UserService,
        AuthenticationServices,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
      ],
    }).compile();
    authenticationService = await module.get(AuthenticationServices);
    usersService = await module.get(UserService);
  });

  describe('when accessing the data of authenticating user', () => {
    it('should attempt to get a user by email', async () => {
      const getByEmailSpy = jest.spyOn(usersService, 'getByEmail');
      await authenticationService.getAuthenticatedUser(
        'user@email.com',
        'strongPassword',
      );
      expect(getByEmailSpy).toBeCalledTimes(1);
    });
    describe('and the provided password is not valid', () => {
      beforeEach(() => {
        bcryptCompare.mockReturnValue(false);
      });
      it('should throw an error', async () => {
        await expect(
          authenticationService.getAuthenticatedUser(
            'user@email.com',
            'strongPassword',
          ),
        ).rejects.toThrow();
      });
    });
    describe('and the provided password is valid', () => {
      beforeEach(() => {
        bcryptCompare.mockReturnValue(true);
      });
      describe('and the user is found in the database', () => {
        beforeEach(() => {
          findUser.mockResolvedValue(userData);
        });
        it('should return the user data', async () => {
          const user = await authenticationService.getAuthenticatedUser(
            'user@email.com',
            'strongPassword',
          );
          expect(user).toBe(userData);
        });
      });
      describe('and the user is not found in the database', () => {
        beforeEach(() => {
          findUser.mockResolvedValue(undefined);
        });
        it('should throw an error', async () => {
          await expect(
            authenticationService.getAuthenticatedUser(
              'user@email.com',
              'strongPassword',
            ),
          ).rejects.toThrow();
        });
      });
    });
  });
});
