import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsUUID()
  @IsOptional()
  parentId: string;
}
