import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import RoleGuard from '../users/role.guard';
import Role from '../users/roles.enum';
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
@UseGuards(RoleGuard([Role.Admin]))
export class FlightController implements CrudController<Flight> {
  constructor(public service: FlightService) {}
}
