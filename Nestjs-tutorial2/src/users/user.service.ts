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
import StripeService from 'src/stripe/stripe.service';
import DatabaseFilesService from 'src/databaseFiles/databaseFiles.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly fileService: FileService,
    private readonly privateFilesService: PrivateFileService,
    private connection: Connection,
    private stripeService: StripeService,
    private readonly databaseFilesService: DatabaseFilesService,
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
    const stripeCustomer = await this.stripeService.createCustomer(
      userData.name,
      userData.email,
    );
    const newUser = await this.userRepository.create({
      ...userData,
      stripeCustomerId: stripeCustomer.id,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }

  // async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
  //   const avatar = await this.databaseFilesService.uploadDatabaseFile( //fileService
  //     imageBuffer,
  //     filename,
  //   );
  //   const user = await this.getById(userId);
  //   await this.userRepository.update(userId, {
  //     ...user,
  //     avatar,
  //   });
  //   return avatar;
  // }

  async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { id: userId },
      });
      const currentAvatarId = user.avatarId;
      const avatar =
        await this.databaseFilesService.uploadDatabaseFileWithQueryRunner(
          imageBuffer,
          filename,
          queryRunner,
        );

      await queryRunner.manager.update(User, userId, {
        avatarId: avatar.id,
      });

      if (currentAvatarId) {
        await this.databaseFilesService.deleteFileWithQueryRunner(
          currentAvatarId,
          queryRunner,
        );
      }

      await queryRunner.commitTransaction();

      return avatar;
    } catch {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
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

  async seTwoFactorAuthenticationSecret(secret: string, userId: number) {
    return this.userRepository.update(userId, {
      twoFactorAuthenticationSecret: secret,
    });
  }

  async turnOnTwoFactorAuthentication(userId: number) {
    return this.userRepository.update(userId, {
      isTwoFactorAuthenticationEnabled: true,
    });
  }

  async updateMonthlySubscriptionStatus(
    stripeCustomerId: string,
    monthlySubscriptionStatus: string,
  ) {
    return this.userRepository.update(
      { stripeCustomerId },
      {
        monthlySubscriptionStatus,
      },
    );
  }

  async markEmailAsConfirmed(email: string) {
    return this.userRepository.update(
      { email },
      {
        isEmailConfirmed: true,
      },
    );
  }

  markPhoneNumberAsConfirmed(userId: number) {
    return this.userRepository.update(
      {
        id: userId,
      },
      {
        isPhoneNumberConfirmed: true,
      },
    );
  }

  async createWithGoogle(email: string, name: string) {
    const stripeCustomer = await this.stripeService.createCustomer(name, email);
    const newUser = await this.userRepository.create({
      email,
      name,
      isRegisterWithGoogle: true,
      stripeCustomerId: stripeCustomer.id,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }
}
