import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Flight {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn({ type: 'date', unique: true })
  public flight_deptr_date: string;

  @Column()
  public departure_country: string;

  @Column()
  destination_country: string;

  @Column({ type: 'time' })
  deptr_time: string;

  @Column({ type: 'time' })
  arrival_time: string;
}

export default Flight;
