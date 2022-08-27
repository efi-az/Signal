import { RequestParamsEnum } from "./request-params.enum";
import { ApiProperty } from "@nestjs/swagger";

export class RequestParamsDto {
  @ApiProperty()
  vs_currency?:string

  @ApiProperty()
  order?:RequestParamsEnum

  @ApiProperty()
  perPage?:number

  @ApiProperty()
  page?:number
}