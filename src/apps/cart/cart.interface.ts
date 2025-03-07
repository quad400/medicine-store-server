import { PaginatedResponse } from "src/common/interfaces";
import { AddCartDto } from "./dto/createcart.dto";

export interface CartInterface<T> {
  addToCart(body: AddCartDto): Promise<string>;
  removeFromCart(cartId: string): Promise<string>;
  getCarts(limit: number, page: number): Promise<PaginatedResponse<T>>;
}
