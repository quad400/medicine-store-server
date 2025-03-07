import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  QueryParams,
} from "routing-controllers";
import "reflect-metadata";
import { Response } from "src/common/utils/response";
import { ProductService } from "./product.service";
import { Service } from "typedi";
import {
  CreateProductDto,
  ProductCategoryQueryDto,
  QueryDto,
  UpdateProductDto,
} from "./dto/product.dto";
import {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
} from "src/common/utils/constants";

@Service()
@Controller("/products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("/")
  async getProducts(@QueryParams() { limit, page }: QueryDto) {
    const products = await this.productService.getProducts(
      Number(limit),
      Number(page)
    );
    return new Response(
      true,
      HTTP_STATUS_OK,
      "Product Fetched Successfully",
      products
    );
  }

  @Get("/category")
  async getProductByCategory(
    @QueryParams() { categoryId, limit, page }: ProductCategoryQueryDto
  ) {
    const products = await this.productService.getProductByCategory(
      categoryId,
      Number(page),
      Number(limit)
    );
    return new Response(
      true,
      HTTP_STATUS_OK,
      "Product Fetched Successfully",
      products
    );
  }

  @Post("/")
  async createProduct(@Body() body: CreateProductDto) {
    const product = await this.productService.createProduct(body);
    return new Response(
      true,
      HTTP_STATUS_CREATED,
      "Product Created Successful",
      product
    );
  }

  @Put("/:productId")
  async updateProduct(
    @Param("productId") productId: string,
    @Body() body: UpdateProductDto
  ) {
    return new Response(
      true,
      HTTP_STATUS_OK,
      "Product Updated Successful",
      await this.productService.updateProduct(productId, body)
    );
  }

  @Get("/:productId")
  async getProduct(@Param("productId") productId: string) {
    return new Response(
      true,
      HTTP_STATUS_OK,
      "Product Updated Successful",
      await this.productService.getProduct(productId)
    );
  }
}
