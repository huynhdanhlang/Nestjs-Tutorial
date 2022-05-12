import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Role from './roles.enum';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({ type: 'date' })
  public dayofbirth: string;

  @Column()
  public gender: string;

  @Column()
  public phoneNumber: string;

  @Column()
  public email: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Passenger,
  })
  public role: Role;
}

export default User;
