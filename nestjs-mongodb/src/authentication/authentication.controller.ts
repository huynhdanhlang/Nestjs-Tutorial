import {
  Body,
  Req,
  Controller,
  Post,
  HttpCode,
  UseGuards,
  Res,
  SerializeOptions,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
} from '@nestjs/common';
import { response, Response } from 'express';
import { AuthenticationServices } from './authentication.service';
import RegisterDto from './dto/register.dto';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { LocalAuthentication } from './localAuthentication.guard';
import RequestWithUser from './requestWithUser.interface';

@Controller('authentication')
// @UseInterceptors(ClassSerializerInterceptor) // những thuộc tính có @Exclude() sẽ không được trả về
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationServices) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthentication) // gọi tới LocalStategy => nếu tài khoản và mật khẩu đúng thì trẻ về user
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    //Xóa response: Response để tránh mất khả năng tương thích nest như interceptors,decorators.
    // Thông tin thêm https://docs.nestjs.com/controllers#library-specific-approach
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtAccessToken(
      user._id,
    );
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @Post('log-out')
  @UseGuards(JwtAuthenticationGuard)
  async logOut(@Res() response: Response) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogout(),
    );
    return response.sendStatus(200);

  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

}

export default AuthenticationController;
