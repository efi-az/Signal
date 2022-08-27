import { Body, Controller, Post, Put } from "@nestjs/common";
import { PermissionService } from "../service/permission.service";
import { CreatePermissionDto } from "../dto/create-permission.dto";
import { PermissionEntity } from "../entities/permission.entity";
import { ApiTags } from "@nestjs/swagger";
import { AssignPermissionToUserDto } from "../dto/assign-permission-to-user.dto";
import { UserEntity } from "../entities/user.entity";

@ApiTags("[Permissions]")
@Controller("permission")
export class PermissionController {
  constructor(private permissionService:PermissionService)
  {}

  @Post("create")
  async createPermission(@Body() createPermission:CreatePermissionDto):Promise<PermissionEntity>
  {
    return this.permissionService.createPermission(createPermission)
  }

  @Put("assign/permission/user")
  async assignPermissionToUser(@Body() assignPermissionToUser:AssignPermissionToUserDto):Promise<UserEntity>
  {
    return this.permissionService.assignPermissionToUser(assignPermissionToUser)
  }
}