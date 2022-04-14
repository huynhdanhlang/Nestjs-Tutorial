import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import ObjectWithDto from 'src/utils/types/objectWithId.dto';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @Type(() => ObjectWithDto)
  category: ObjectWithDto;
}

export default CreateProductDto;
