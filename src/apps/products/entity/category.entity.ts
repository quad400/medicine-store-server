import { AbstractEntity } from "../../../common/abstracts/entity.abstract";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from "typeorm";
import { Product } from "./product.entity";

@Entity()
@Tree("closure-table")
export class Category extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name?: string;

  @TreeChildren()
  children?: Category[];

  @TreeParent()
  parent?: Category;

  @OneToMany(() => Product, (product) => product.category)
  products?: Product[];
}
