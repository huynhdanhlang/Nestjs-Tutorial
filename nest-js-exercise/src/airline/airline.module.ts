import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirlineController } from './airline.controller';
import Airline from './airline.entity';
import { AirlineService } from './airline.service';
@Module({
  imports: [TypeOrmModule.forFeature([Airline]), ConfigModule],
  providers: [AirlineService],
  controllers: [AirlineController],
  exports: [],
})
export class AirlineModule {}
