import Airline from 'src/airline/airline.entity';
import Reservation from 'src/reservation/reservation.entity';
import User from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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
}

export default Flight;
