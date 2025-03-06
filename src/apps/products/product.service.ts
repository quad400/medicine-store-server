import Container, { Inject, Service } from "typedi";
import { CreateProductDto } from "./dto/product.dto";
import { ProductRepository } from "./repository/product.repository";
import { CategoryRepository } from "../category/repository/category.repository";
import { ProductInterface } from "./product.interface";

@Service()
export class ProductService implements ProductInterface {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository
  ) {}

  async createProduct(body: CreateProductDto) {
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
    const products = await this.productRepository.find({
      options: {},
    });
    return products;
  }

  async getProductByCategory(categoryId: string, page: number, limit: number) {
    const [products, total] = await this.productRepository
      .createQueryBuilder("product")
      .where("product.categoryId = :categoryId", { categoryId })
      .leftJoinAndSelect("product.category", "category")
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: products,
    };
  }
}
