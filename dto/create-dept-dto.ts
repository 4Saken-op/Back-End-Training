import { IsEmail, IsNotEmpty, IsNumber, isString, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateDeptDto {
  @IsNotEmpty()
  @IsString()
  // @IsEmail()
  name: string;
}