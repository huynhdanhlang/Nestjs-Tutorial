import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Post from '../posts/post.entity';
import User from '../users/user.entity';
import Address from '../users/address.entity';
import Category from '../categories/category.entity';
import PublicFile from '../files/publicFile.entity';
import PrivateFIle from '../privateFiles/privateFile.entity';
import Product from '../products/product.entity';
import ProductCategory from '../productCategories/productCategories.entity';
import Message from '../chat/message.entity';
import StripeEvent from '../stripeWebhook/stripeEvent.entity';
import DatabaseLogger from './databaseLogger';
import Log from '../logger/log.entity';
import DatabaseFile from '../databaseFiles/databaseFiles.entity';
import LocalFile from '../localFiles/localFiles.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        logger: new DatabaseLogger(),
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [
          Post,
          User,
          Address,
          Category,
          PublicFile,
          PrivateFIle,
          Product,
          ProductCategory,
          Message,
          StripeEvent,
          Log,
          DatabaseFile,
          LocalFile,
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
