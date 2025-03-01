import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "../../../common/abstracts/entity.abstract";
import { Prescription } from "./prescription.entity";
import { SizeEnum } from "../../../common/enum/size.enum";
import { Category } from "./category.entity";

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the product.
 *         name:
 *           type: string
 *           description: The name of the product.
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the product.
 *         category:
 *           $ref: '#/components/schemas/Category'
 *           description: The category to which the product belongs.
 */
@Entity()
export class Product extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @OneToMany(() => Prescription, (prescription) => prescription.product, {
    eager: true,
  })
  prescriptions: Prescription;

  @Column({ type: "bigint" })
  price: number;

  @Column({
    type: "simple-enum",
    enum: SizeEnum,
    default: SizeEnum.DEFAULT,
  })
  size: SizeEnum;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "CASCADE",
  })
  category: Category;
}
