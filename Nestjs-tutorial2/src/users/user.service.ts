import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import User from './user.entity';
import CreateUserDto from './dto/createUser.dto';
import { FileService } from '../files/files.service';
import { PrivateFileService } from '../privateFiles/privateFiles.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly fileService: FileService,
    private readonly privateFilesService: PrivateFileService,
    private connection: Connection,
  ) {}

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (user) {
      return user;
    }

    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
    const avatar = await this.fileService.uploadPublicFile(
      imageBuffer,
      filename,
    );
    const user = await this.getById(userId);
    await this.userRepository.update(userId, {
      ...user,
      avatar,
    });
    return avatar;
  }

  async deletePublicAvatar(userId: number) {
    const queryRunner = this.connection.createQueryRunner();
    const user = await this.getById(userId);
    const fileId = user.avatar?.id;
    if (fileId) {
      // Sử dụng queryRunner và connection để tạo giao dịch tránh thất thoát dữ liệu
      // await this.userRepository.update(userId, {
      //   ...user,
      //   avatar: null,
      // });
      // await this.fileService.deletePublicFile(fileId);
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        await queryRunner.manager.update(User, userId, {
          ...user,
          avatar: null,
        });
        await this.fileService.deletePublicFileWithQueryRunner(
          fileId,
          queryRunner,
        );
        await queryRunner.commitTransaction();
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException();
      } finally {
        await queryRunner.release();
      }
    }
  }

  async addPrivateFile(userId: number, imageBuffer: Buffer, filename: string) {
    return this.privateFilesService.uploadPrivateFile(
      imageBuffer,
      userId,
      filename,
    );
  }

  async getPrivateFile(userId: number, fileId: number) {
    const file = await this.privateFilesService.getPrivateFile(fileId);
    if (file.info.owner.id === userId) {
      return file;
    }
    throw new UnauthorizedException();
  }

  async getAllPrivateFiles(userId: number) {
    const userWithFiles = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['files'],
    });

    if (userWithFiles) {
      return Promise.all(
        userWithFiles.files.map(async (file) => {
          const url = await this.privateFilesService.generatePresignedUrl(
            file.key,
          );
          return {
            ...file,
            url,
          };
        }),
      );
    }
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.getById(userId);

    console.log(['adaj'], refreshToken, user.currentHashedRefreshToken);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );
    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async removeRefreshToken(userId: number) {
    return this.userRepository.update(userId, {
      currentHashedRefreshToken: null,
    });
  }
}
