import { AbstractEntity } from "../../common/abstracts/entity.abstract";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from "typeorm";
import { Product } from "../product/product.entity";

@Entity()
@Tree("closure-table")
export class Category extends AbstractEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name?: string;

  @TreeChildren({ cascade: true })
  children?: Category[];

  @TreeParent()
  parent?: Category;

  @OneToMany(() => Product, (product) => product.category)
  products?: Product[];
}
