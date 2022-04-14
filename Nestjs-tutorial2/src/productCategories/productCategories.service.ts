import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ProductCategory from './productCategories.entity';
import { CreateProductCategoryDto } from './dto/createProductCategory.dto';

@Injectable()
export default class productCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoriesRepository: Repository<ProductCategory>,
  ) {}

  getAllProductCategories(){
      return this.productCategoriesRepository.find();
  }

  async createProductCategory(category:CreateProductCategoryDto){
      const newProductCategory = await this.productCategoriesRepository.create(category);
      await this.productCategoriesRepository.save(newProductCategory);
      return newProductCategory;
  }
}
