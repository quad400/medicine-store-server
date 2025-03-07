import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class AddCartDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
