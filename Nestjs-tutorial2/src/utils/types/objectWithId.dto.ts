import { IsNumber } from 'class-validator';

class ObjectWithDto {
  @IsNumber()
  id: number;
}

export default ObjectWithDto;
