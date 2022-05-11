import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import LocalFile from './localFiles.entity';
import LocalFilesService from './localFiles.service';
import LocalFilesController from './localFiles.controller';
import { UserModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([LocalFile]),
  ],
  providers: [LocalFilesService],
  exports: [LocalFilesService],
  controllers: [LocalFilesController],
})
export class LocalFilesModule {}
