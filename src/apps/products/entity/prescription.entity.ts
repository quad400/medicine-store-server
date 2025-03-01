import { AbstractEntity } from "../../../common/abstracts/entity.abstract";
import { PrescriptionEnum } from "../../../common/enum/prescription.enum";
import { Column, Entity, ManyToOne } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Prescription extends AbstractEntity {
  @Column({
    type: "enum",
    enum: PrescriptionEnum,
    default: PrescriptionEnum.ADULT,
  })
  type: PrescriptionEnum;

  @ManyToOne(() => Product, (product) => product.prescriptions)
  product: Product;
}
