import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Airline from './airline.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Airline]), ConfigModule],
  providers: [],
  controllers: [],
  exports: [],
})
export class AirlineModule {}
