import Airline from '../airline/airline.entity';
import Reservation from '../reservation/reservation.entity';
import User from '../users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Flight {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'date', unique: true })
  public flight_deptr_date: string;

  @Column()
  public departure_country: string;

  @Column()
  destination_country: string;

  @Column({ type: 'time' })
  deptr_time: string;

  @Column({ type: 'time' })
  arrival_time: string;

  @ManyToOne(
    () => Reservation,
    (reservation: Reservation) => reservation.flight,
    {
      eager: true,
      cascade: true,
    },
  )
  public reservation: Reservation;

  @ManyToOne(() => Airline, (airline: Airline) => airline.flight, {
    eager: true,
    cascade: true,
  })
  public airline: Airline;

  @ManyToOne(() => User, (user) => user.flights, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  public user: User;
}

export default Flight;
