import { PaginatedResponse } from "src/common/interfaces";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";

export interface ProductInterface<T>{
  createProduct(body: CreateProductDto): Promise<string>;
  updateProduct(productId: string, body: UpdateProductDto): Promise<string>;
  getProduct(productId: string):Promise<T>
  getProducts(limit:number, page:number):Promise<PaginatedResponse<T>>
  getProductByCategory(categoryId:string, limit:number, page:number):Promise<PaginatedResponse<T>>
}
