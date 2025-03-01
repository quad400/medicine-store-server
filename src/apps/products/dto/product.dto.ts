import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProduct{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
    
}