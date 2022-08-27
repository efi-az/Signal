import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class BookmarkArticleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  articleId:string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId:string
}