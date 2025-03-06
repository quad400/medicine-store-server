import {
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsJSON()
  @IsOptional()
  prescriptions: Record<string, any>;

  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}

export class ProductQueryDto {
  @IsNotEmpty()
  categoryId: string;
  page: number = 1;
  limit: number = 10;
}
