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
import { Response } from 'express';
import { EmailConfirmationService } from 'src/emailConfirmation/emailConfirmation.service';
import { UserService } from '../users/user.service';
import { AuthenticationServices } from './authentication.service';
import RegisterDto from './dto/register.dto';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import JwtRefreshGuard from './jwt-refresh.guard';
import { LocalAuthentication } from './localAuthentication.guard';
import RequestWithUser from './requestWithUser.interface';

@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor) // những thuộc tính có @Exclude() sẽ không được trả về
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationServices,
    private readonly userService: UserService,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    const user = await this.authenticationService.register(registrationData);
    await this.emailConfirmationService.sendVerificationLink(
      registrationData.email,
    );
    return user;
  }

  @HttpCode(200)
  @UseGuards(LocalAuthentication) // gọi tới LocalStategy => nếu tài khoản và mật khẩu đúng thì trẻ về user
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    //Xóa response: Response để tránh mất khả năng tương thích nest như interceptors,decorators.
    // Thông tin thêm https://docs.nestjs.com/controllers#library-specific-approach
    const user = request.user;
    const accessTokenCookie =
      this.authenticationService.getCookieWithJwtAccessToken(user.id);
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authenticationService.getCookieWithJwtRefreshToken(user.id);

    await this.userService.setCurrentRefreshToken(refreshToken, user.id);
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    if (user.isTwoFactorAuthenticationEnabled) {
      return;
    }
    // user.password = undefined;
    return user;
  }

  @Post('log-out')
  @UseGuards(JwtAuthenticationGuard)
  async logOut(@Req() request: RequestWithUser) {
    await this.userService.removeRefreshToken(request.user.id);
    request.res.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogout(),
    );
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie =
      this.authenticationService.getCookieWithJwtAccessToken(request.user.id);
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }
}

export default AuthenticationController;
