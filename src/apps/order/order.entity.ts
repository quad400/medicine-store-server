import { AbstractEntity } from "../../common/abstracts/entity.abstract";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "../cart/cart.entity";

@Entity()
export class Order extends AbstractEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => Cart, (cart) => cart.product)
  carts: Cart[];

  @Column({type: "numeric"})
  amount: number;
}
