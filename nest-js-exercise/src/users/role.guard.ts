import Role from './roles.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';

const RoleGuard = (role: Role[]): Type<CanActivate> => {
  class RoleGuardMixin extends AuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      return user?.role.includes(role);
    }
  }
  return mixin(RoleGuardMixin);
};

export default RoleGuard;
