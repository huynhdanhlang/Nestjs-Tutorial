import { Module } from '@nestjs/common';
import StripeWebhookController from './stripeWebhook.controller';
import { StripeModule } from '../stripe/stripe.module';
import { UserModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import StripeEvent from './stripeEvent.entity';
import StripeWebhookService from './stripeWebhook.service';

@Module({
  imports: [StripeModule, UserModule, TypeOrmModule.forFeature([StripeEvent])],
  controllers: [StripeWebhookController],
  providers: [StripeWebhookService],
})
export class StripeWebhookModule {}
