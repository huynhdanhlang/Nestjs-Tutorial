import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CategoriesController from './category.controller';
import Category from './category.entity';
import { categoriesService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [categoriesService],
})
export class CategoryModule {}
