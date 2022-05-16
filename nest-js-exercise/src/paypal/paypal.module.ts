import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import PayPalService from './paypal.service';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from 'src/users/users.modules';
import PaypalController from './paypal.controller';
@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [PaypalController],
  providers: [PayPalService],
  exports: [PayPalService],
})
export class PaypalModule {}
