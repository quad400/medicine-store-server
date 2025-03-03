import Container, { Inject, Service } from "typedi";
import { CreateProduct } from "./dto/product.dto";
import { ProductRepository } from "./repository/product.repository";
import { CategoryRepository } from "./repository/category.repository";

@Service()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository
  ) {}

  async createProduct(body: CreateProduct) {
    const category = await this.categoryRepository.findOne({
      data: {
        id: body.categoryId,
      },
    });

    await this.productRepository.checkUnique(body, "name");
    const data = await this.productRepository.create({
      ...body,
      category: category,
    });
    return data.id;
  }

  async getProducts() {
    const products = await this.productRepository.findAll({
      options: {},
    });
    return products;
  }
}
