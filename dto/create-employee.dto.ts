import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, MinDate, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateAddressDto } from "./create-address-dto";
import { EmployeeRole } from "../entities/employee.entity";
import { CreateDeptDto } from "./create-dept-dto";
import Dept from "../entities/dept.entity";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;

  @IsNotEmpty()
  @IsString()
  role: EmployeeRole;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  // @ValidateNested()
  // @Type(() => CreateDeptDto)
  @IsNotEmpty()
  @IsNumber()
  deptID: number;

  @IsNotEmpty()
  @IsString()
  employeeID: string;


}