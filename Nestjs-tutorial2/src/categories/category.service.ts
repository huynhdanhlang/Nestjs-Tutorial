import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CategoriesNotFoundException from 'src/categories/exception/categoriesNotFound.exception';
import { Repository } from 'typeorm';
import Category from './category.entity';
import CreateCategoryDto from './dto/createCategory.dto';
import UpdateCategoryDto from './dto/updateCategory.dto';

@Injectable()
export class categoriesService {
  /**
   * @ignore
   *
   */
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  /**
   *
   * A method that fetches the categories from the database
   * @returns A promise with the list of categories
   */
  getAllCategories() {
    return this.categoriesRepository.find({ relations: ['posts'] });
  }

  /**
 * A method that fetches a category with a given id. Example:
 * @example
 * const category = await categoriesService.getCategoryById(1);
 */
  async getCategoryById(id: number) {
    const category = await this.categoriesRepository.findOne({
      where: { id: id },
      relations: ['posts'],
    });
    if (category) {
      return category;
    }
    throw new CategoriesNotFoundException(id);
  }

  /**
   * See the [definition of the UpdateCategoryDto file]{@link UpdateCategoryDto} to see a list of required properties
   * @param id 
   * @param category 
   * @returns
   */
  async updateCategory(id: number, category: UpdateCategoryDto) {
    await this.categoriesRepository.update(id, category);
    const updatedCategory = await this.categoriesRepository.findOne({
      where: { id: id },
      relations: ['posts'],
    });
    if (updatedCategory) {
      return updatedCategory;
    }
    throw new CategoriesNotFoundException(id);
  }

  async createCategory(category: CreateCategoryDto) {
    const newCategory = await this.categoriesRepository.create(category);
    await this.categoriesRepository.save(newCategory);
    return newCategory;
  }

  /**
   * @deprecated
   * @param id
   * @returns
   */
  async deleteCategoryById(id: number): Promise<void> {
    return this.deleteCategory(id);
  }

  /**
   * A method that deletes a category from the database
   * @param id An id of a category. A category with this id should exist in the database
   */

  async deleteCategory(id: number): Promise<void> {
    console.log(['id'], id);

    const deleteResponse = await this.categoriesRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new CategoriesNotFoundException(id);
    }
  }
}
