import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user.entity';
import { FileModule } from '../files/files.module';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), FileModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UsersController],
})
export class UserModule {}
