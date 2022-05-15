import { Controller, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  GetManyDefaultResponse,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import RoleGuard from '../users/role.guard';
import Role from '../users/roles.enum';
import { FlightDto } from './dto/flight.dto';
import Flight from './flight.entity';
import { FlightService } from './flight.service';
import User from 'src/users/user.entity';

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
      user: {
        eager: true,
      },
    },
  },
})
@CrudAuth({
  persist: (user: User) => ({
    id: user.id,
  }),
})
@ApiTags('flight')
@Controller('flight')
export class FlightController implements CrudController<Flight> {
  constructor(public service: FlightService) {}

  get base(): CrudController<Flight | FlightDto> {
    return this;
  }

  @Override('createOneBase')
  // @UseGuards(RoleGuard([Role.Admin]))
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: FlightDto,
  ): Promise<Flight | FlightDto> {
    return this.base.createOneBase(req, dto);
  }

  @Override('getManyBase')
  @UseGuards(RoleGuard([Role.Passenger]))
  getMany(
    @ParsedRequest() req: CrudRequest,
  ): Promise<
    GetManyDefaultResponse<Flight | FlightDto> | Flight[] | FlightDto[]
  > {
    console.log(['user'], req.parsed.authPersist);

    req.parsed.filter.push({
      field: 'userId',
      operator: '$eq',
      value: req.parsed.authPersist.id,
    });
    return this.base.getManyBase(req);
  }
}
