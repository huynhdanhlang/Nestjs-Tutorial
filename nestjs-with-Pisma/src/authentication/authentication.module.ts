import { Module } from '@nestjs/common';
import { AuthenticationServices } from './authentication.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import AuthenticationController from './authentication.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
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
  providers: [AuthenticationServices, LocalStrategy, jwtStrategy],
  controllers: [AuthenticationController],
  exports: [AuthenticationServices],
})
export class AuthenticationModule {}
