import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AbstractEntity } from "../../common/abstracts/entity.abstract";
import { SizeEnum } from "../../common/enum/size.enum";
import { Category } from "../category/category.entity";
import { Cart } from "../cart/cart.entity";

@Entity()
export class Product extends AbstractEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  image: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: "json", nullable: true })
  prescriptions: Record<string, any>;

  @Column({ type: "bigint" })
  price: number;

  @Column({
    type: "enum",
    enum: SizeEnum,
    default: SizeEnum.DEFAULT,
  })
  size: SizeEnum

  @Column({
    type: "numeric",
    nullable: false,
    default: 0,
  })
  available_quatity: number;

  @ManyToOne(() => Category, (category) => category.products, {
    eager: true,
    onDelete: "CASCADE",
  })
  category: Category;

  @OneToMany(() => Cart, (cart) => cart.product)
  carts: Cart[];
}
