import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

export default Reservation;