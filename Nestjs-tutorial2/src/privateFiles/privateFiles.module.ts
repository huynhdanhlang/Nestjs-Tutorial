import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivateFileService } from './privateFiles.service';
import { ConfigModule } from '@nestjs/config';
import PrivateFile from './privateFile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrivateFile]), ConfigModule],
  providers: [PrivateFileService],
  exports: [PrivateFileService],
})
export class PrivateFilesModule {}
