import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
} from '@nestjsx/crud';
import User from 'src/users/user.entity';
import { createFlightDto } from './dto/createFlight.dto';
import Flight from './flight.entity';
import { FlightService } from './flight.service';

@Crud({
  model: {
    type: Flight,
  },
  dto: {
    create: createFlightDto,
  },
  query: {
    join: {
      reservation: {
        eager: true,
      },
      airline: {
        eager: true,
      },
    },
  },
})
@ApiTags('flight')
@Controller('flight')
export class FlightController implements CrudController<Flight> {
  constructor(public service: FlightService) {}

  @Override('createOneBase')
  async createOne(req: CrudRequest, dto: createFlightDto): Promise<Flight> {
    return await this.service.createOne(req, dto);
  }
}
