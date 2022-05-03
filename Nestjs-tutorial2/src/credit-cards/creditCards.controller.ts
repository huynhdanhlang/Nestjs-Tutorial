import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import StripeService from '../stripe/stripe.service';
import AddCreditCardDto from './dto/addCreditCardDto';
import SetDefaultCreditCardDto from './dto/setDefaultCreditCard.dto';

@Controller('credit-cards')
export default class CreditCardsController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
//   @UseGuards(JwtAuthenticationGuard)
  async addCreditCard(
    @Body() creditCard: AddCreditCardDto,
    @Req() request: RequestWithUser,
  ) {
    return this.stripeService.attachCreditCard(
      creditCard.paymentMethodId,
      "cus_LcS4Q1wRTwEcJH",
    );
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getCreditCards(@Req() request: RequestWithUser) {
    return this.stripeService.listCreditCards(request.user.stripeCustomerId);
  }

  // @Post("default")
  // @HttpCode(200)
  // @UseGuards(JwtAuthenticationGuard)
  // async setDefaultCard(@Body() creditCard:SetDefaultCreditCardDto){
  //     await this.stripeService
  // }
}
