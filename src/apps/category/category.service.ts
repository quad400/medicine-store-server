import Container, { Inject, Service } from "typedi";
import { CreateCategoryDto } from "./category.dto";
import { CategoryInterface } from "./catrgory.interface";
import { CategoryRepository } from "./repository/category.repository";
import log from "src/common/utils/logger";
import { Category } from "./entity/category.entity";
import { TreeRepository } from "typeorm";

@Service()
export class CategoryService implements CategoryInterface {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly treeCategoryRepository: TreeRepository<Category>
  ) {}
  async createCategory(body: CreateCategoryDto): Promise<string> {
    let category: Category;
    console.log(body);

    await this.categoryRepository.checkUnique(body, "name");
    if (body.parentId) {
      const parent = await this.categoryRepository.findOne({
        data: { id: body.parentId },
      });
      category = await this.categoryRepository.create({
        name: body.name,
        parent,
      });
    }

    category = await this.categoryRepository.create({ name: body.name });
    return category.id;
  }

  async getCategories(): Promise<Category[]> {
    const categories = await this.treeCategoryRepository.findTrees();

    return categories;
  }

  async getCategoryDescendants(parentId: string): Promise<Category[]> {
    const parent = await this.categoryRepository.findOne({
      data: { id: parentId },
    });
    const categories = await this.treeCategoryRepository.findDescendants(
      parent
    );

    return categories;
  }

  async removeCategory(categoryId: string): Promise<void> {
    await this.categoryRepository.findOneAndDelete({ id: categoryId });
  }

  async getCategoriesById(categoryId: string) {
    return await this.categoryRepository.findOne({
      data: {
        id: categoryId,
      },
    });
  }
}
