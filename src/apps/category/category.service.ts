import { Service } from "typedi";
import { CreateCategoryDto } from "./category.dto";
import { CategoryInterface } from "./category.interface";
import { CategoryRepository } from "./category.repository";
import { Category } from "./category.entity";

@Service()
export class CategoryService implements CategoryInterface {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async createCategory(body: CreateCategoryDto): Promise<string> {
    let category: Category;

    await this.categoryRepository.checkUnique(body, "name");
    if (body.parentId) {
      const parent = await this.categoryRepository.findOne({
        data: { id: body.parentId },
      });
      category = await this.categoryRepository.create({
        name: body.name,
        parent,
      });
    } else {
      category = await this.categoryRepository.create({ name: body.name });
    }

    return category.id;
  }

  async getCategories(): Promise<Category[]> {
    const categories: Category[] = await this.categoryRepository
      .createQueryBuilder("category")
      .where("category.parent IS NULL")
      .getMany();

    return categories;
  }

  async getCategoryByParentId(parentId: string): Promise<Category[]> {
    const categories = await this.categoryRepository
      .createQueryBuilder("category")
      .where("category.parentId = :parentId", { parentId })
      .getMany();

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
