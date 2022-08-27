import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class BookmarkSignalDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  signalId:string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId:string
}