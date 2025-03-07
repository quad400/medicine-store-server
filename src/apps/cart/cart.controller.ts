import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  QueryParams,
} from "routing-controllers";
import { AddCartDto } from "./dto/createcart.dto";
import { Response } from "src/common/utils/response";
import {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
} from "src/common/utils/constants";
import { CartService } from "./cart.service";
import { Service } from "typedi";
import { QueryDto } from "../product/dto/product.dto";

@Service()
@Controller("/carts")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(@Body() body: AddCartDto) {
    return new Response(
      true,
      HTTP_STATUS_CREATED,
      "Cart updated",
      await this.cartService.addToCart(body)
    );
  }

  @Post("/:cartId")
  async removeFromCart(@Param("cartId") cartId: string) {
    return new Response(
      true,
      HTTP_STATUS_OK,
      "Cart updated",
      await this.cartService.removeFromCart(cartId)
    );
  }

  @Get()
  async getCarts(@QueryParams() { limit, page }: QueryDto) {
    return new Response(
      true,
      HTTP_STATUS_OK,
      "Cart Fetched Successfully",
      await this.cartService.getCarts(limit, page)
    );
  }
}
