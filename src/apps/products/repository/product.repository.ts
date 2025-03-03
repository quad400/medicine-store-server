import { AbstractRepository } from "src/common/abstracts/repository.abstract";
import { Product } from "../entity/product.entity";
import { DataSource, Repository } from "typeorm";
import { Service } from "typedi";

@Service()
export class ProductRepository extends AbstractRepository<Product> {
  constructor(dataSource: DataSource) {
    super(dataSource, Product);
  }
}
