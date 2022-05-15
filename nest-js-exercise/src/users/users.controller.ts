import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  GetManyDefaultResponse,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import PayPalService from '../paypal/paypal.service';
import { RequestWithPayPal } from '../paypal/requestWithPaypal';
import { UserDto } from './dto/user.dto';
import RoleGuard from './role.guard';
import Role from './roles.enum';
import User from './user.entity';
import { UsersService } from './users.service';

@Crud({
  model: {
    type: User,
  },
  dto: {
    create: UserDto,
    update: UserDto,
    replace: UserDto,
  },
  query: {
    join: {
      reservation: {
        eager: true,
      },
    },
  },
})
@ApiTags('users')
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(
    public service: UsersService,
    private paypalService: PayPalService,
  ) {}

  get base(): CrudController<User | UserDto> {
    return this;
  }

  @Post('payment')
  async createPayment() {
    return await this.paypalService.createPayment();
  }

  @Get('excute_payment')
  async excutePayment(@Req() request: RequestWithPayPal) {
    console.log(['request'], request.query);
    const response = await this.paypalService.paymentExcute(
      request.query.PayerID,
      request.query.paymentId,
    );
    console.log(['response'], response);
    return response;
  }

  @Override("createOneBase")
  @UseGuards(RoleGuard([Role.Admin]))
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UserDto,
  ): Promise<User | UserDto> {
    return this.base.createOneBase(req, dto);
  }

  @Override("getManyBase")
  @UseGuards(RoleGuard([Role.Admin, Role.Employee]))
  getMany(
    @ParsedRequest() req: CrudRequest,
  ): Promise<GetManyDefaultResponse<User | UserDto> | User[] | UserDto[]> {
    return this.base.getManyBase(req);
  }
}
