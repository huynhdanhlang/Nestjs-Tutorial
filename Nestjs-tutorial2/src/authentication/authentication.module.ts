import { Module } from '@nestjs/common';
import { AuthenticationServices } from './authentication.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../users/users.module';
import AuthenticationController from './authentication.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtStrategy } from './jwt.strategy';
import { JwtRefreshTokenStrategy } from './jwt-refresh-token.strategy';
import { TwoFactorAuthenticationController } from './twoFactor/twoFactorAuthentication.controller';
import { TwoFactorAuthenticationService } from './twoFactor/twoFactorAuthentication.service';
import { JwtTwoFactorStrategy } from './jwt-two-factor.strategy';
import { EmailConfirmationModule } from 'src/emailConfirmation/emailConfirmation.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    EmailConfirmationModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  providers: [
    AuthenticationServices,
    LocalStrategy,
    jwtStrategy,
    JwtRefreshTokenStrategy,
    TwoFactorAuthenticationService,
    JwtTwoFactorStrategy,
  ],
  controllers: [AuthenticationController, TwoFactorAuthenticationController],
  exports: [AuthenticationServices],
})
export class AuthenticationModule {}
