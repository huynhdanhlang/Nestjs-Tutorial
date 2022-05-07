import {
  ClassSerializerInterceptor,
  PlainLiteralObject,
  Type,
} from '@nestjs/common';
import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { Document } from 'mongoose';

function MongooseClassSerializerInterceptor(
  classToIntercept: Type,
): typeof ClassSerializerInterceptor {
  return class InterCeptor extends ClassSerializerInterceptor {
    private changePlainObjectToClass(document: PlainLiteralObject) {
      if (!(document instanceof Document)) {
        return document;
      }
      return plainToInstance(classToIntercept, document.toJSON());
    }

    private prepareReponse(reponse: PlainLiteralObject | PlainLiteralObject[]) {
      if (Array.isArray(reponse)) {
        return reponse.map(this.changePlainObjectToClass);
      }

      return this.changePlainObjectToClass(reponse);
    }

    serialize(
      response: PlainLiteralObject | PlainLiteralObject[],
      options: ClassTransformOptions,
    ) {
      return super.serialize(this.prepareReponse(response), options);
    }
  };
}

export default MongooseClassSerializerInterceptor;
