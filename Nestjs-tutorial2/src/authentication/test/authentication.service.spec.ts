import { AuthenticationServices } from '../authentication.service';
import { UserService } from '../../users/user.service';
import User from '../../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import mockerConfigService from '../../utils/mocks/config.service'; 
import mockedJwtService from '../../utils/mocks/jwt.service';

describe('The AuthenticationService', () => {
  let authenticationService: AuthenticationServices;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        AuthenticationServices,
        {
          provide: ConfigService,
          useValue: mockerConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();
    authenticationService = await module.get(AuthenticationServices);
  });

  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = 1;
      expect(
        typeof authenticationService.getCookieWithJwtAccessToken(userId),
      ).toEqual('string');
    });
  });
});
