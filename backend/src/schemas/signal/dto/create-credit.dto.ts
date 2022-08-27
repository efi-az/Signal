import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { CreditEnum } from "../enums/credit.enum";
import {Transform} from "class-transformer"

export class CreateCreditDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDate()
  @Transform((expireTime)=>new Date(expireTime.value))
  expireTime: Date;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty({isArray:true})
  @IsArray()
  description: string[]

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  pinned:boolean

  @ApiProperty()
  @IsString()
  currencyId: string;

  @ApiProperty()
  @IsEnum(CreditEnum)
  status:CreditEnum
}