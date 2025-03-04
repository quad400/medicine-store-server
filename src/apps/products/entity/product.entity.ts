import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AbstractEntity } from "../../../common/abstracts/entity.abstract";
import { SizeEnum } from "../../../common/enum/size.enum";
import { Category } from "./category.entity";

@Entity()
export class Product extends AbstractEntity {
  @PrimaryGeneratedColumn()
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
