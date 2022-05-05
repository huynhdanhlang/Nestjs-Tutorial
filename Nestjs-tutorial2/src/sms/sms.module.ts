import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import SmsService from './sms.service';
import SmsController from './sms.controller';
import { UserModule } from '../users/users.module';

@Module({
  imports: [ConfigModule, UserModule],
  controllers: [SmsController],
  providers: [SmsService],
  exports: [SmsService]
})
export class SmsModule {}