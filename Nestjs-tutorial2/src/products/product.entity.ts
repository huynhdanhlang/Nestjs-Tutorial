import ProductCategory from 'src/productCategories/productCategories.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BookProperties } from './types/bookProperties.interface';
import { CarProperties } from './types/carProperties.interface';

@Entity()
class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToOne(
    () => ProductCategory,
    (category: ProductCategory) => category.products,
    {
      eager: true,
      cascade: true,
    },
  )
  public category: ProductCategory;

  @Column({
    type: 'jsonb',
  })
  public properties: CarProperties | BookProperties;
}

export default Product;
