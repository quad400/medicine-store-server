import { AbstractRepository } from "src/common/abstracts/repository.abstract";
import { Product } from "../entity/product.entity";
import { Repository } from "typeorm";

export class ProductRepository extends AbstractRepository<Product> {
  constructor(productRepository: Repository<Product>) {
    super(productRepository, "Product");
  }
}
