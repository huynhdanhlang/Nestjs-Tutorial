import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Flight from './flight.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Flight]), ConfigModule],
  providers: [],
  controllers: [],
  exports: [],
})
export class FlightModule {}
