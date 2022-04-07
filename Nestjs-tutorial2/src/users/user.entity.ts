import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Address from './address.entity';
import Post from '../posts/post.entity';
@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  public password?: string; // Loại bỏ password ra khỏi trước khi phản hồi

  @OneToOne(() => Address, {
    eager: true, // bao gồm cả địa chỉ khi truy vấn
    cascade: true, // Thay vì tạo địa chỉ riêng, ta có thể tạo địa chỉ thông qua request người dùng
  })
  @JoinColumn()
  public address: Address;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts: Post[];
}

export default User;
