import { Service } from "typedi";
import { CartRepository } from "./cart.repository";
import { Cart } from "./cart.entity";
import { CartInterface } from "./cart.interface";
import { AddCartDto } from "./dto/createcart.dto";
import { ProductRepository } from "../product/product.repository";
import { BadRequestError } from "routing-controllers";
import { PaginatedResponse } from "src/common/interfaces";

@Service()
export class CartService implements CartInterface<Cart> {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly cartRepository: CartRepository
  ) {}

  async addToCart({ productId, quantity }: AddCartDto): Promise<string> {
    const product = await this.productRepository.findOne({
      data: { id: productId },
    });

    if (product.available_quatity < quantity) {
      throw new BadRequestError("Product not instock, try again later.");
    }

    let cart = await this.cartRepository.findOneWithoutCheck({
      data: {
        product_id: product.id,
      },
    });

    if (!cart) {
      cart = await this.cartRepository.create({
        product,
        quantity,
        amount: product.price * quantity,
      });
      await this.productRepository.decrement(
        {
          id: cart.product_id,
        },
        "available_quatity",
        1
      );
    } else {
      cart = await this.cartRepository.findOneAndUpdate(cart.id, {
        quantity: Number(cart.quantity) + quantity,
        amount: product.price * quantity,
      });

      await this.productRepository.decrement(
        {
          id: cart.product_id,
        },
        "available_quatity",
        1
      );
    }
    return cart.id;
  }

  async removeFromCart(cartId: string): Promise<string> {
    const cart = await this.cartRepository.findOne({
      data: {
        id: cartId,
      },
    });
    if (cart.quantity > 1) {
      await this.cartRepository.findOneAndUpdate(cart.id, {
        quantity: Number(cart.quantity) - 1,
        amount: Number(cart.amount) - Number(cart.product.price),
      });

      await this.productRepository.increment(
        {
          id: cart.product_id,
        },
        "available_quatity",
        1
      );
    } else {
      await this.cartRepository.findOneAndDelete({
        id: cartId,
      });
      await this.productRepository.increment(
        {
          id: cart.product_id,
        },
        "available_quatity",
        1
      );
    }

    return cart.id;
  }

  async getCarts(
    limit: number,
    page: number
  ): Promise<PaginatedResponse<Cart>> {
    const [carts, total] = await this.cartRepository
      .createQueryBuilder("cart")
      .leftJoinAndSelect("cart.product", "product")
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: carts,
    };
  }
}
