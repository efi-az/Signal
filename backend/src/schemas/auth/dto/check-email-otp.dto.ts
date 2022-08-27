import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CheckEmailOtpDto {
  @ApiProperty()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  emailAddress:string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code:string

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  refCode:number
}