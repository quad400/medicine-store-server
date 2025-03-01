import { ApiDoc } from "../../../src/common/decorators/apidoc.decorator";
import { Controller } from "../../../src/common/decorators/controller.decorator";
import { Get } from "../../../src/common/decorators/http.decorator";
import { Request, Response } from "express";


@Controller("/api/v1/products")
class ProductController {
  /**
   * @swagger
   * /api/v1/products/:
   *   get:
   *     tags:
   *       - Products
   *     summary: Get all products
   *     description: Retrieves a list of all product
   *   
   *     responses:
   *       200:
   *        
   *         description: Successful response
   */
  @Get("/")
  getProduct(req: Request, res: Response) {
    return res.send("Hello how are you");
  }
}
