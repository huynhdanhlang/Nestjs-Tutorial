import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Product from './product.entity';
import CreateProductDto from './dto/createProduct.dto';

@Injectable()
export default class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  getAllProducts() {
    return this.productRepository.find();
  }

  async createProduct(product: CreateProductDto) {
    const newProduct = await this.productRepository.create(product);
    await this.productRepository.save(newProduct);
    return newProduct;
  }
}
