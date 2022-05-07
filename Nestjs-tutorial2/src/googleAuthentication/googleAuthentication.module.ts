import { Module } from '@nestjs/common';
import { GoogleAuthenticationController } from './googleAuthencation.controller';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../users/users.module';
import { GoogleAuthenticationService } from './googleAuthentication.service';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [ConfigModule, UserModule, AuthenticationModule],
  providers: [GoogleAuthenticationService],
  controllers: [GoogleAuthenticationController],
  exports: []
})
export class GoogleAuthenticationModule {}