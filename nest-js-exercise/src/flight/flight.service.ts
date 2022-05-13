import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import Flight from './flight.entity';

@Injectable()
export class FlightService extends TypeOrmCrudService<Flight> {
  constructor(@InjectRepository(Flight) repo) {
    super(repo);
  }
  
}
