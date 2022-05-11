import Category from '../categories/category.entity';
import User from '../users/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';

@Entity()
class PostEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  // @Column()
  // public content: string;
  @Column('text', {
    array: true,
  })
  public paragraphs: string[];

  // @Column({ nullable: true })
  // public category?: string;

  @Index('post_authorId_index')
  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;

  @ManyToMany(() => Category, (category: Category) => category.posts, {
    cascade: true,
  })
  @JoinTable()
  public categories: Category[];
}

export default PostEntity;
