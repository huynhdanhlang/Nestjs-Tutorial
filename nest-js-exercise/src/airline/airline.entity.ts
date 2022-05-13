import Flight from 'src/flight/flight.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Airline {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToMany(() => Flight, (flight: Flight) => flight.reservation)
  public flight: Flight[];
}

export default Airline;
