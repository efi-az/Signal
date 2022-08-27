import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ArticleTagDto {
  @ApiProperty()
  @IsString()
  name: string
}