import { AbstractEntity } from "../../../common/abstracts/entity.abstract";
import { Column, Entity, OneToMany, Tree, TreeChildren, TreeParent } from "typeorm";
import { Product } from "./product.entity";

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the category.
 *         name:
 *           type: string
 *           description: The name of the category.
 *         parent:
 *           type: object
 *           description: Parent category (if exists).
 *         children:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 *           description: Subcategories.
 */
@Entity()
@Tree("closure-table")
export class Category extends AbstractEntity {
  @Column()
  name: string;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
