import { RequestMethod } from "@nestjs/common";
import { RouteCategoryEnum } from "../enums/route.enum";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRouteDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address:string

  @IsEnum(RequestMethod)
  @ApiProperty({enum:RequestMethod})
  @IsNotEmpty()
  method:RequestMethod

  @ApiProperty({enum:RouteCategoryEnum})
  @IsNotEmpty()
  @IsEnum(RouteCategoryEnum)
  category:RouteCategoryEnum

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description:string
}