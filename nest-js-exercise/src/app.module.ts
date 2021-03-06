import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AirlineModule } from './airline/airline.module';
import { AuthGuard } from './auth.guard';
import { DatabaseModule } from './database/database.module';
import { FlightModule } from './flight/flight.module';
import { PaypalModule } from './paypal/paypal.module';
import { ReservationModule } from './reservation/reservation.module';
import { UsersModule } from './users/users.modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        PAYPAL_ENVIRONMENT: Joi.string().required(),
        PAYPAL_CLIENT_ID: Joi.string().required(),
        PAYPAL_CLIENT_SECRET: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    AirlineModule,
    FlightModule,
    ReservationModule,
    UsersModule,
    PaypalModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
