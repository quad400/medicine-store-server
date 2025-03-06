import {
  Body,
  Controller,
  Get,
  HttpError,
  JsonController,
  Post,
  QueryParam,
  QueryParams,
} from "routing-controllers";
import "reflect-metadata";
import { Response } from "src/common/utils/response";
import { ProductService } from "./product.service";
import Container, { Inject, Service } from "typedi";
import { CreateProductDto, ProductQueryDto } from "./dto/product.dto";
import {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
} from "src/common/utils/constants";

@Service()
@Controller("/products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("/")
  async getProducts() {
    const products = await this.productService.getProducts();
    return new Response(
      true,
      HTTP_STATUS_OK,
      "Product Fetched Successfully",
      products
    );
  }

  @Get("/category")
  async getProductByCategory(
    @QueryParams() { categoryId, limit, page }: ProductQueryDto
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
}
