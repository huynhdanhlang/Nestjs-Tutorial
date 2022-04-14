import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Product from '../products/product.entity';

@Entity()
class ProductCategory {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @OneToMany(() => Product, (product: Product) => product.category)
  public products: Product[];
}

export default ProductCategory;
