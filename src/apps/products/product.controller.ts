import {
  Body,
  Controller,
  Get,
  HttpError,
  JsonController,
  Post,
  QueryParam,
} from "routing-controllers";
import "reflect-metadata";
import { Response } from "src/common/utils/response";
import { ProductService } from "./product.service";
import Container, { Inject, Service } from "typedi";
import { CreateProduct } from "./dto/product.dto";
import {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
} from "src/common/utils/constants";

@Service()
@JsonController("/products")
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

  @Post("/")
  async createProduct(@Body() body: CreateProduct) {
    // const product = await this.productService.createProduct(body);
    // return new Response(
    //   HTTP_STATUS_CREATED,
    //   "Product Created Successful",
    //   product
    // );
  }
}
