import { GenderEnum } from "../enums/gender.enum";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserProfileDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  firstName:string

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  lastName:string

  @ApiProperty({enum:GenderEnum})
  @IsEnum(GenderEnum)
  gender:GenderEnum
}