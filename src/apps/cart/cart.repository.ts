import { AbstractRepository } from "src/common/abstracts/repository.abstract";
import { Cart } from "./cart.entity";
import { DataSource } from "typeorm";
import { Service } from "typedi";

@Service()
export class CartRepository extends AbstractRepository<Cart> {
  constructor(dataSource: DataSource) {
    super(dataSource, Cart);
  }
}
