import { AbstractRepository } from "src/common/abstracts/repository.abstract";
import { DataSource, Repository } from "typeorm";
import { Category } from "../entity/category.entity";
import { Service } from "typedi";


@Service()
export class CategoryRepository extends AbstractRepository<Category> {
  constructor(dataSource: DataSource) {
    super(dataSource, Category);
  }
}