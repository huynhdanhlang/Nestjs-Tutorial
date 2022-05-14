import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
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
export class AirlineController implements CrudController<Airline> {
  constructor(public service: AirlineService) {}
}
