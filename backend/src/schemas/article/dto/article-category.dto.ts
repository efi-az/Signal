import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ArticleCategoryDto {
  @ApiProperty()
  @IsString()
  name: string
}