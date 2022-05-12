import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Airline {
  @PrimaryGeneratedColumn()
  public id: number;
}

export default Airline;
