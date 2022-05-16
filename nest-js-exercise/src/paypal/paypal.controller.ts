import { Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import PayPalService from './paypal.service';
import { RequestWithPayPal } from './requestWithPaypal';

@ApiTags('paypal')
@ApiBearerAuth()
@Controller('paypal')
export default class PaypalController {
  constructor(private readonly paypalService: PayPalService) {}

  @ApiOperation({
    deprecated: true,
  })
  @Post('payment')
  async makePayment() {
    return await this.paypalService.createPayment();
  }

  @ApiOperation({
    deprecated: true,
  })
  @Get('success')
  async excutePayment(@Req() request: RequestWithPayPal) {
    console.log(['request'], request.query);
    const response = await this.paypalService.paymentExcute(
      request.query.PayerID,
      request.query.paymentId,
    );
    console.log(['response'], response);
    return response;
  }

  @Post('create_order')
  @ApiOperation({
    summary: 'create a order',
  })
  async createOrder() {
    return this.paypalService.createOrder();
  }

  @Get('capture_order')
  @ApiOperation({
    summary: 'Captures payment for an order',
  })
  async captureOder(@Req() request: RequestWithPayPal) {
    console.log(['capture_order'], request.query);
    return await this.paypalService.captureOrder(request.query.token);
  }
}
