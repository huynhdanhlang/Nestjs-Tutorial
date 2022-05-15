import { ApiProperty } from '@nestjs/swagger';
import Flight from '../flight/flight.entity';
import Reservation from '../reservation/reservation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Role from './roles.enum';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @ApiProperty()
  @Column()
  public firstName: string;

  @ApiProperty()
  @Column()
  public lastName: string;

  @ApiProperty()
  @Column({ type: 'date' })
  public dayofbirth: string;

  @ApiProperty()
  @Column()
  public gender: string;

  @ApiProperty()
  @Column()
  public phoneNumber: string;

  @ApiProperty()
  @Column()
  public address: string;

  @ApiProperty()
  @Column()
  public email: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Passenger,
  })
  public role: Role;

  @ManyToMany(
    () => Reservation,
    (reservation: Reservation) => reservation.user,
    {
      // eager: true,
    },
  )
  public reservation?: Reservation[];

  @OneToMany(() => Flight, (flight) => flight.user)
  flights: Flight[];
}

export default User;
