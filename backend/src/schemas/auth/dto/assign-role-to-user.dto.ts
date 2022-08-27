import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AssignRoleToUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId:string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  roleId:string
}