import { CreateProduct } from "./dto/product.dto";

export interface ProductInterface{
  createProduct(body: CreateProduct): Promise<string>;
}
