import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../product/product.entity";
import { AbstractEntity } from "../../common/abstracts/entity.abstract";
import { Order } from "../order/order.entity";

@Entity()
export class Cart extends AbstractEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Product, (product) => product.carts, { eager: true })
  product: Product;

  @Column({ type: "numeric" })
  quantity: number;

  @Column({ type: "bigint" })
  amount: number;

  @ManyToOne(() => Order, (order) => order.carts, { eager: true })
  order: Order;
}
