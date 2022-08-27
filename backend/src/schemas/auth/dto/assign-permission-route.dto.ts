import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class AssignPermissionRouteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  routeId:string

  @ApiProperty()
  @IsArray()
  permissionIds:string[]
}