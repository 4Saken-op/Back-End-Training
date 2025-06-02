import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateAddressDto {
  // @IsEmail()
  line1: string;

  @IsString()
  pincode: string;

  @IsString()
  line2: string;

  @IsString()
  houseNo: string;
}
