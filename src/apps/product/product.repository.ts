import { AbstractRepository } from "src/common/abstracts/repository.abstract";
import { Product } from "./product.entity";
import { DataSource } from "typeorm";
import { Service } from "typedi";

@Service()
export class ProductRepository extends AbstractRepository<Product> {
  constructor(dataSource: DataSource) {
    super(dataSource, Product);
  }
}
