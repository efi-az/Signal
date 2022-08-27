import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AssignPermissionToRoleDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  roleId:string

  @IsArray()
  @ApiProperty()
  permissionIds:string[]
}