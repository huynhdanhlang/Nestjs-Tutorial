import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import StripeEvent from './stripeEvent.entity';
import { Repository } from 'typeorm';
import Stripe from 'stripe';
import PosgresErrorCode from 'src/database/posgresErrorCodes.enum';
import { UserService } from 'src/users/user.service';

@Injectable()
export default class stripeWebhookService {
  constructor(
    @InjectRepository(StripeEvent)
    private eventRepository: Repository<StripeEvent>,
    private readonly usersService: UserService,
  ) {}

  createEvent(id: string) {
    return this.eventRepository.insert({ id });
  }

  async processSubscriptionUpdate(event: Stripe.Event) {
    try {
      await this.createEvent(event.id);
    } catch (error) {
      if (error?.code === PosgresErrorCode.UniqueViolation) {
        throw new BadRequestException('This event was already processed');
      }
    }
    const data = event.data.object as Stripe.Subscription;

    const customerId: string = data.customer as string;
    const subscriptionStatus = data.status;

    await this.usersService.updateMonthlySubscriptionStatus(
      customerId,
      subscriptionStatus,
    );
  }
}
