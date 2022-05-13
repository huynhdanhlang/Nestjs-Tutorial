import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ReservationService } from 'src/reservation/reservation.service';
import User from './user.entity';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) repo,
    private readonly reservationService: ReservationService,
  ) {
    super(repo);
  }
  
  
}
