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
import PublicFile from '../files/publicFile.entity';
import PrivateFile from '../privateFiles/privateFile.entity';
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
  public posts?: Post[];

  @JoinColumn()
  @OneToOne(() => PublicFile, {
    eager: true,
    cascade: true,
  })
  public avatar?: PublicFile;

  @OneToMany(() => PrivateFile, (file: PrivateFile) => file.owner)
  public files?: PrivateFile[];

  @Column({
    nullable: true,
  })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @Column({ nullable: true })
  public twoFactorAuthenticationSecret?: string;

  @Column({ default: false })
  public isTwoFactorAuthenticationEnabled: boolean;

  @Column({ nullable: true })
  public stripeCustomerId: string;

  @Column({ nullable: true })
  public monthlySubscriptionStatus?: string;
}

export default User;
