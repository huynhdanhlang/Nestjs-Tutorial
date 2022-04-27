import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthentication extends AuthGuard('local') {} //Gọi tới local Strategy
