import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import FindOneParams from '../utils/findOneParams';
import { diskStorage } from 'multer';
import LocalFilesInterceptor from '../localFiles/localFiles.interceptor';
import LocalFilesService from '../localFiles/localFiles.service';
import { join } from 'path';
import * as etag from 'etag';
import * as filesystem from 'fs';
import * as util from 'util';

const readFile = util.promisify(filesystem.readFile);

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly localFilesService: LocalFilesService,
  ) {}

  @Post('avatar')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/avatars',
      fileFilter: (request, file, callback) => {
        if (!file.mimetype.includes('image')) {
          return callback(
            new BadRequestException('Provide a valid image'),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: Math.pow(1024, 2), //1MB
      },
    }),
  )
  async addAvatar(
    @Req() request: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.addAvatar(request.user.id, {
      path: file.path,
      filename: file.originalname,
      mimetype: file.mimetype,
    });
  }

  @Post('delete/avatar')
  @UseGuards(JwtAuthenticationGuard)
  async deletePublicFile(@Req() request: RequestWithUser) {
    return this.userService.deletePublicAvatar(request.user.id);
  }

  @Post('files')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addPrivateFile(
    @Req() request: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.addPrivateFile(
      request.user.id,
      file.buffer,
      file.originalname,
    );
  }

  @Get('files/:id')
  @UseGuards(JwtAuthenticationGuard)
  async getPrivateFile(
    @Req() request: RequestWithUser,
    @Param() { id }: FindOneParams,
    @Res() res: Response,
  ) {
    const file = await this.userService.getPrivateFile(
      request.user.id,
      Number(id),
    );
    file.stream.pipe(res);
  }

  @Get('files')
  @UseGuards(JwtAuthenticationGuard)
  async getAllPrivateFiles(@Req() request: RequestWithUser) {
    return this.userService.getAllPrivateFiles(request.user.id);
  }

  @Get(':userId/avatar')
  async getAvatar(
    @Param('userId', ParseIntPipe) userId: number,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    const user = await this.userService.getById(userId);
    const fileId = user.avatarId;
    if (!fileId) {
      throw new NotFoundException();
    }
    const fileMetaData = await this.localFilesService.getFileById(
      user.avatarId,
    );
    const pathOnDisk = join(process.cwd(), fileMetaData.path);

    const file = await readFile(pathOnDisk);
    // const tag = etag(file); //hash
    const tag = `W/"file-id-${fileId}"`; //not hash


    response.set({
      'Content-Disposition': `inline; filename="${fileMetaData.filename}"`,
      'Content-Type': fileMetaData.mimetype,
      ETag: tag,
    });
    if (request.headers['if-none-match'] === tag) {
      response.status(304);
      return;
    }
    return new StreamableFile(file);
  }
}
