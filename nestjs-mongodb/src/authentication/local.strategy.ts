import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticationServices } from './authentication.service';
import { UserDocument } from 'src/users/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationServices) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<UserDocument> {

    return this.authenticationService.getAuthenticatedUser(email, password);
  }
}
