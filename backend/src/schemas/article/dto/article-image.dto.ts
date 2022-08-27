import { ApiProperty } from "@nestjs/swagger";

export class ArticleImageDto {
  @ApiProperty({ type: "string", format: "binary" })
  file: Express.Multer.File;
}