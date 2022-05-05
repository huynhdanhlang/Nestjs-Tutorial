import { Module } from '@nestjs/common';
import { EmailConfirmationService } from './emailConfirmation.service';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from '../email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailConfirmationController } from './emailConfirmation.controller';
import { UserModule } from '../users/users.module';

@Module({
  imports: [ConfigModule, EmailModule, JwtModule.register({}), UserModule],
  providers: [EmailConfirmationService],
  exports: [EmailConfirmationService],
  controllers: [EmailConfirmationController],
})
export class EmailConfirmationModule {}
