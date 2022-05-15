import { Controller, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  GetManyDefaultResponse,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import RoleGuard from '../users/role.guard';
import Role from '../users/roles.enum';
import { FlightDto } from './dto/flight.dto';
import Flight from './flight.entity';
import { FlightService } from './flight.service';
import RequestWithUser from '../users/requestWithUser';

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

  get base(): CrudController<Flight | FlightDto> {
    return this;
  }

  @Override('createOneBase')
  @UseGuards(RoleGuard([Role.Admin]))
  createOne(req: CrudRequest, dto: Flight): Promise<Flight | FlightDto> {
    return this.base.createOneBase(req, dto);
  }

  @Override('getManyBase')
  @UseGuards(RoleGuard([Role.Passenger]))
  getMany(
    @ParsedRequest() req: CrudRequest,
    @Req() request: RequestWithUser,
  ): Promise<
    GetManyDefaultResponse<Flight | FlightDto> | Flight[] | FlightDto[]
  > {
    console.log(['user'], request.user);

    req.parsed.filter.push({
      field: 'userId',
      operator: '$eq',
      value: request.user.id,
    });
    return this.base.getManyBase(req);
  }
}
