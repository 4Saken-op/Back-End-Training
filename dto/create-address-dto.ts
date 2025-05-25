import { IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateAddressDto {
  @IsNotEmpty()
  // @IsEmail()
  line1: string;

  @IsNotEmpty()
  @IsString()
  pincode: string;

}