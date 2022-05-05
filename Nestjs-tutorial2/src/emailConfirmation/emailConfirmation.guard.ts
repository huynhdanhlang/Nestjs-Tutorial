import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import RequestWithUser from 'src/authentication/requestWithUser.interface';

@Injectable()
export class emailConfirmationGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request: RequestWithUser = context.switchToHttp().getRequest();
    if (!request.user?.isEmailConfirmed) {
      throw new UnauthorizedException('Confirm your email first');
    }
    return true;
  }
}

export default emailConfirmationGuard;