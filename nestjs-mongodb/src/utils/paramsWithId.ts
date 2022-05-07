import { IsMongoId } from 'class-validator';

class ParamWithId {
  @IsMongoId()
  id: string;
}

export default ParamWithId;
