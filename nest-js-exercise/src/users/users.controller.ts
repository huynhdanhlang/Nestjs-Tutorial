import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override } from '@nestjsx/crud';
import { UserDto } from './dto/user.dto';
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
      reservation: {
        eager: true,
      },
    },
  },
})
@ApiTags('users')
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}
