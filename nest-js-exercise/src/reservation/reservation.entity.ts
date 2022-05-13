import Flight from 'src/flight/flight.entity';
import User from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Reservation {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'date' })
  public reservation_date: string;

  @Column()
  public total_amount: number;

  @Column()
  class: string;

  @OneToMany(() => Flight, (flight: Flight) => flight.reservation)
  public flight: Flight[];

  @ManyToMany(() => User, (user: User) => user.reservation, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  public user: User[];
}

export default Reservation;
