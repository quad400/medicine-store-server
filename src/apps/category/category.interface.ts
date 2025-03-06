import { CreateCategoryDto } from "./category.dto";
import { Category } from "./category.entity";

export interface CategoryInterface {
  createCategory(body: CreateCategoryDto): Promise<string>;
  getCategories(parentId?: string): Promise<Category[]>;
  removeCategory(categoryId: string): void;
}
