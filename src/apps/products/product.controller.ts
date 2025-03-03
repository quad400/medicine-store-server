import { AppResponse } from "src/common/utils/response";
import { Request, Response } from "express";
import { Body } from "src/common/decorators/params.decorator";
import { CreateProduct } from "./dto/product.dto";
import { Post } from "src/common/decorators/route.decorator";
import { Controller } from "src/common/decorators/controller.decorator";

@Controller("/api/v1/products")
class ProductController {
  @Post("/")
  getProduct(@Body() body: CreateProduct, req: Request, res: Response) {
    AppResponse.success({
      res,
      status_code: 200,
      message: "Hello how are you",
      data:body
    });
  }
}
