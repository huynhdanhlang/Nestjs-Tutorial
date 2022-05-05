import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CategoryModule } from './categories/category.module';
import { FileModule } from './files/files.module';
import { PrivateFilesModule } from './privateFiles/privateFiles.module';
import { SearchModule } from './search/search.module';
import { ProductCategoriesModule } from './productCategories/productCategories.module';
import { ProductsModule } from './products/products.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailSchedulingModule } from './emaillScheduling/emailScheduling.module';
import { ChatModule } from './chat/chat.module';
import { BullModule } from '@nestjs/bull';
import { OptimizeModule } from './optimize/optimize.module';
import { StripeModule } from './stripe/stripe.module';
import { ChargeModule } from './charge/charge.module';
import { CreditCardsModule } from './credit-cards/creditCards.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { StripeWebhookModule } from './stripeWebhook/stripeWebhook.module';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    PostsModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.string().required(),
        EMAIL_SERVICE: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
        STRIPE_SECRET_KEY: Joi.string(),
        STRIPE_CURRENCY: Joi.string(),
        FRONTEND_URL: Joi.string(),
        MONTHLY_SUBSCRIPTION_PRICE_ID: Joi.string(),
        STRIPE_WEBHOOK_SECRET: Joi.string(),
      }),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: Number(configService.get('REDIS_PORT')),
        },
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    UserModule,
    AuthenticationModule,
    CategoryModule,
    FileModule,
    PrivateFilesModule,
    SearchModule,
    ProductCategoriesModule,
    ProductsModule,
    EmailSchedulingModule,
    ChatModule,
    OptimizeModule,
    StripeModule,
    ChargeModule,
    CreditCardsModule,
    SubscriptionsModule,
    StripeWebhookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
