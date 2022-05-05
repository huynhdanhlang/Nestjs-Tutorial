import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Post from '../posts/post.entity';
import User from '../users/user.entity';
import Address from '../users/address.entity';
import Category from '../categories/category.entity';
import PublicFile from '../files/publicFile.entity';
import PrivateFIle from '../privateFiles/privateFile.entity';
import Product from 'src/products/product.entity';
import ProductCategory from 'src/productCategories/productCategories.entity';
import Message from 'src/chat/message.entity';
import StripeEvent from 'src/stripeWebhook/stripeEvent.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
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
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
