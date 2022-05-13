import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightController } from './flight.controller';
import Flight from './flight.entity';
import { FlightService } from './flight.service';
@Module({
  imports: [TypeOrmModule.forFeature([Flight]), ConfigModule],
  providers: [FlightService],
  controllers: [FlightController],
  exports: [],
})
export class FlightModule {}
