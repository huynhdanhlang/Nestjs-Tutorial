import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { ReservationDto } from './dto/reservation.dto';
import Reservation from './reservation.entity';
import { ReservationService } from './reservation.service';

@Crud({
  model: {
    type: Reservation,
  },
  dto: {
    create: ReservationDto,
    update: ReservationDto,
    replace: ReservationDto,
  },
  query: {
    join: {
      user: {
        eager: true,
      },
    },
  },
})
@ApiTags('reservation')
@Controller('reservation')
export class ReservationController implements CrudController<Reservation> {
  constructor(public service: ReservationService) {}
}
