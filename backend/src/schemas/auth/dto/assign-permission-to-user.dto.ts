import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class AssignPermissionToUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId:string

  @ApiProperty()
  @IsArray()
  permissionIds:string[]
}