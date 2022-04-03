import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class Postentity {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public title: string;
 
  @Column()
  public content: string;
}
 
export default Postentity;