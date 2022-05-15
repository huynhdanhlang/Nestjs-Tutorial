import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import RoleGuard from 'src/users/role.guard';
import Role from 'src/users/roles.enum';
import Airline from './airline.entity';
import { AirlineService } from './airline.service';
import { AirlineDto } from './dto/airline.dto';

@Crud({
  model: {
    type: Airline,
  },
  dto: {
    create: AirlineDto,
    update: AirlineDto,
    replace: AirlineDto,
  },
})
@ApiTags('airline')
@Controller('airline')
@UseGuards(RoleGuard([Role.Admin]))
export class AirlineController implements CrudController<Airline> {
  constructor(public service: AirlineService) {}
}
