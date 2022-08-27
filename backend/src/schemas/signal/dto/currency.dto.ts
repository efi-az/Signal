import { IsEnum, IsString } from "class-validator";
import { CurrencyEnum } from "../enums/currency.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CurrencyDto {
  @ApiProperty()
  @IsString()
  name: string

  @IsString()
  @ApiProperty()
  symbol: string

  @IsEnum(CurrencyEnum)
  @ApiProperty()
  status: CurrencyEnum
}