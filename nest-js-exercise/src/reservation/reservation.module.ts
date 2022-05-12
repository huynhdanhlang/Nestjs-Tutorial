import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Reservation from './reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), ConfigModule],
  providers: [],
  controllers: [],
  exports: [],
})
export class ReservationModule {}
