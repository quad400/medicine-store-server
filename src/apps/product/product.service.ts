import { Service } from "typedi";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";
import { ProductRepository } from "./product.repository";
import { CategoryRepository } from "../category/category.repository";
import { ProductInterface } from "./product.interface";
import { Category } from "../category/category.entity";
import { PaginatedResponse } from "src/common/interfaces";

@Service()
export class ProductService implements ProductInterface<Category> {
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

  async getProducts(
    limit: number,
    page: number
  ): Promise<PaginatedResponse<Category>> {
    console.log(limit, page);
    const [products, total] = await this.productRepository
      .createQueryBuilder("product")
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

  async getProductByCategory(
    categoryId: string,
    page: number,
    limit: number
  ): Promise<PaginatedResponse<Category>> {
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

  async updateProduct(
    productId: string,
    body: UpdateProductDto
  ): Promise<string> {
    const product = await this.productRepository.findOneAndUpdate(
      productId,
      body
    );

    return product.id;
  }

  async getProduct(productId: string): Promise<Category> {
    const product = await this.productRepository.findOne({
      data: { id: productId },
    });
    return product;
  }
}
