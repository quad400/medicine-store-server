import {
  IsEnum,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { SizeEnum } from "src/common/enum/size.enum";

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

  @IsNumber()
  @IsOptional()
  available_quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsEnum(SizeEnum, { message: "size must be one of: default, small, large, medium, xlarge" })
  size: SizeEnum;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}


export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsObject()
  @IsOptional()
  prescriptions: Record<string, any>;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsEnum(SizeEnum, { message: "size must be one of: default, small, large, medium, xlarge" })
  size: SizeEnum;

  @IsNumber()
  @IsOptional()
  available_quantity: number;

  @IsUUID()
  @IsOptional()
  categoryId: string;
}

export class QueryDto {
  page: number = 1;
  limit: number = 10;
}

export class ProductCategoryQueryDto {
  @IsNotEmpty()
  categoryId: string;
  page: number = 1;
  limit: number = 10;
}
