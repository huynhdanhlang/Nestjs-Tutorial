import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import { UserService } from './user.service';
import { Express } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('avatar')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(
    @Req() request: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.addAvatar(
      request.user.id,
      file.buffer,
      file.originalname,
    );
  }

  @Post('delete/avatar')
  @UseGuards(JwtAuthenticationGuard)
  async deletePublicFile(@Req() request: RequestWithUser) {
    return this.userService.deletePublicAvatar(request.user.id);
  }
}
