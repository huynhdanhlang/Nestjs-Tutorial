import { NotFoundException } from '@nestjs/common';

class CategoriesNotFoundException extends NotFoundException {
  constructor(categoriesId: number) {
    super(`Post with id ${categoriesId} not found`);
  }
}
export default CategoriesNotFoundException;