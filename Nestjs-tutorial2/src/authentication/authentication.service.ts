import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import RegisterDto from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import TokenPayload from './tokenPayload.interface';
import PosgresErrorCode from '../database/posgresErrorCodes.enum';

@Injectable()
export class AuthenticationServices {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(registrationData: RegisterDto) {
    const hashPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createUser = await this.userService.create({
        ...registrationData,
        password: hashPassword,
      });

      // createUser.password = undefined;
      return createUser;
    } catch (error) {
      if (error?.code === PosgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      // user.password = undefined; // Đã dùng @Exclude class-transformer thay vì

      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwtAccessToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: `${this.configService.get('JWT_EXPIRATION_TIME')}s`,
    });
    return `Authentication=${token}; HttpOnly; Path=/;Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }


  public getCookieForLogout() {
    return [
      `Authentication=; HttpOnly; Path=/; Max-Age=0`,
      `Refresh=; HttpOnly; Path=/; Max-Age=0`,
    ];
  }



  public getCookieWithJwtRefreshToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}`;
    return {
      cookie,
      token,
    };
  }
}
