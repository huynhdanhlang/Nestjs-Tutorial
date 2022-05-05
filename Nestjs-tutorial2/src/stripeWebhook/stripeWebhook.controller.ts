import {
  Controller,
  Post,
  BadRequestException,
  Req,
  Headers,
} from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import Stripe from 'stripe';
import StripeService from '../stripe/stripe.service';
import RequestWithRawBody from '../stripeWebhook/requestWithRawBody.interface';
import stripeWebhookService from './stripeWebhook.service';

@Controller('webhook')
export default class StripeWebhookController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly userService: UserService,
    private readonly stripeWebhookService: stripeWebhookService,
  ) {}

  @Post()
  async handleIncomingEvents(
    @Headers('stripe-signature') signature: string,
    @Req() request: RequestWithRawBody,
  ) {
    console.log(['ooo'], request.rawBody);

    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }
    const event = await this.stripeService.constructEventFromPayload(
      signature,
      request.rawBody,
    );

    if (
      event.type === 'customer.subscription.updated' ||
      event.type === 'customer.subscription.created'
    ) {
      return this.stripeWebhookService.processSubscriptionUpdate(event);
    }
  }
}
