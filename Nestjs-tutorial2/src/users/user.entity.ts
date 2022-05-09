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
import DatabaseFile from 'src/databaseFiles/databaseFiles.entity';
@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column({ nullable: true })
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
  @OneToOne(() => DatabaseFile, { //PublicFile
    eager: true,
    cascade: true,
    nullable: true,
  })
  public avatar?: DatabaseFile; //PublicFile

  @Column({ nullable: true })
  public avatarId?: number;

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

  @Column({ default: false })
  public isEmailConfirmed: boolean;

  @Column({ nullable: true })
  public phoneNumber: string;

  @Column({ default: false })
  public isPhoneNumberConfirmed: boolean;

  @Column({ default: false })
  public isRegisterWithGoogle: boolean;
}

export default User;
