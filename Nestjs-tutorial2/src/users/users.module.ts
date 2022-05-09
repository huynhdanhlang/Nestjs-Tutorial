import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user.entity';
import { FileModule } from '../files/files.module';
import { UsersController } from './users.controller';
import { PrivateFilesModule } from '../privateFiles/privateFiles.module';
import { StripeModule } from '../stripe/stripe.module';
import { DatabaseFilesModule } from '../databaseFiles/databaseFiles.module';
import { LocalFilesModule } from '../localFiles/localFiles.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    FileModule,
    PrivateFilesModule,
    StripeModule,
    DatabaseFilesModule,
    LocalFilesModule,
  ],
  providers: [UserService, ConfigService],
  exports: [UserService],
  controllers: [UsersController],
})
export class UserModule {}
