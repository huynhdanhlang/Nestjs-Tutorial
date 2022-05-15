import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    req['user'] = await this.usersService.findOne({
      where: { id: 2 },
    });
    console.log(['req_user'], req.user);

    return true;
  }
}
