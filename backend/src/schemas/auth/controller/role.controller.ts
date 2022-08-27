import { Body, Controller, Post, Put, Query } from "@nestjs/common";
import { RoleService } from "../service/role.service";
import { RoleEntity } from "../entities/role.entity";
import { ApiTags } from "@nestjs/swagger";
import { AssignPermissionToRoleDto } from "../dto/assign-permission-to-role.dto";
import { UseBearerAuth } from "../../../configuration/swagger/use-bearer-auth.decorator";
import { AssignRoleToUserDto } from "../dto/assign-role-to-user.dto";
import { UserEntity } from "../entities/user.entity";

@ApiTags("[Roles]")
@Controller("role")
export class RoleController {
  constructor(private roleService:RoleService)
  {}

  @Post("create")
  async createRole(@Query("roleName") name:string):Promise<any>
  {
    return this.roleService.createRole(name)
  }

  @UseBearerAuth()
  @Put("assign/permission/role")
  async assignPermissionToRole(@Body() assignPermissionToRoleDto:AssignPermissionToRoleDto):Promise<RoleEntity>
  {
    return this.roleService.assignPermissionToRole(assignPermissionToRoleDto)
  }

  @UseBearerAuth()
  @Put("assign/role/user")
  async assignRoleToUser(@Body() assignRoleToUserDto:AssignRoleToUserDto):Promise<UserEntity>
  {
    return this.roleService.assignRoleToUser(assignRoleToUserDto)
  }
}