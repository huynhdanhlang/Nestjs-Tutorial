import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import RequestWithUser from '../../authentication/requestWithUser.interface';
import JwtAuthenticationGuard from '../../authentication/jwt-authentication.guard';
import Permission from '../types/permission.type';

const PermissionGuard = (permission: Permission): Type<CanActivate> => {
  class PermissionGuardMixin extends JwtAuthenticationGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;

      return user?.permissions.includes(permission);
    }
  }

  return mixin(PermissionGuardMixin);
};

export default PermissionGuard;
