import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class EmailSendOtpDto {
  @ApiProperty()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  emailAddress:string
}