import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import Reservation from "./reservation.entity";


@Injectable()
export class ReservationService extends TypeOrmCrudService<Reservation>{
    constructor(@InjectRepository(Reservation) repo){
        super(repo)
    }
}