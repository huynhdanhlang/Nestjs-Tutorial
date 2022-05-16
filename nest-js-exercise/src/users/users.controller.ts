import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  Crud,
  CrudController,
  CrudRequest,
  GetManyDefaultResponse,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { UserDto } from './dto/user.dto';
import RoleGuard from './role.guard';
import Role from './roles.enum';
import User from './user.entity';
import { UsersService } from './users.service';

@Crud({
  model: {
    type: User,
  },
  dto: {
    create: UserDto,
    update: UserDto,
    replace: UserDto,
  },
  query: {
    join: {
      flights: {
        eager: true,
      },
    },
  },
})
@ApiTags('users')
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}

  get base(): CrudController<User | UserDto> {
    return this;
  }

  @Override('createOneBase')
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UserDto,
  ): Promise<User | UserDto> {
    return this.base.createOneBase(req, dto);
  }

  @Override('getManyBase')
  @UseGuards(RoleGuard([Role.Admin, Role.Employee]))
  getMany(
    @ParsedRequest() req: CrudRequest,
  ): Promise<GetManyDefaultResponse<User | UserDto> | User[] | UserDto[]> {
    return this.base.getManyBase(req);
  }
}
