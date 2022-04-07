import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import FileService from './files.service';
import PublicFile from './publicFile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PublicFile]), ConfigModule],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
