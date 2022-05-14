import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import User from 'src/users/user.entity';
import { FlightDto } from './dto/flight.dto';
import Flight from './flight.entity';
import { FlightService } from './flight.service';

@Crud({
  model: {
    type: Flight,
  },
  dto: {
    create: FlightDto,
    update: FlightDto,
    replace: FlightDto,
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

  // @Override('createOneBase')
  // async createOneBase(req: CrudRequest, dto: createFlightDto): Promise<Flight> {
  //   return await this.service.createOne(req, dto);
  // }
}
