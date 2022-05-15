import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.modules';
import { AirlineController } from './airline.controller';
import Airline from './airline.entity';
import { AirlineService } from './airline.service';
@Module({
  imports: [TypeOrmModule.forFeature([Airline]), ConfigModule, UsersModule],
  providers: [AirlineService],
  controllers: [AirlineController],
  exports: [],
})
export class AirlineModule {}
