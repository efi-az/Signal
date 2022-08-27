import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PermissionEntity } from "../entities/permission.entity";
import { FindOneOptions, In, Repository } from "typeorm";
import { CreatePermissionDto } from "../dto/create-permission.dto";
import { RoleService } from "./role.service";
import { RoleEntity } from "../entities/role.entity";
import { UserEntity } from "../entities/user.entity";
import { AssignPermissionToUserDto } from "../dto/assign-permission-to-user.dto";

@Injectable()
export class PermissionService {
  constructor(@InjectRepository(PermissionEntity) private permissionRepo:Repository<PermissionEntity>,
              private roleService:RoleService,
              @InjectRepository(UserEntity) private userRepo:Repository<UserEntity>
              )
  {}

  async createPermission(createPermission:CreatePermissionDto):Promise<PermissionEntity>
  {
    const findRoleQuery:FindOneOptions<RoleEntity>={where:{id:createPermission.roleId},relations:["obj_permissions"]}
    const findRole=await this.roleService.findRole(findRoleQuery)
    if (!findRole)
      throw new BadRequestException("Cannot create a permission without role")

    const permission=new PermissionEntity()
    permission.name=createPermission.name
    const save=await this.permissionRepo.save(await this.permissionRepo.create(permission))

    findRole.obj_permissions.push(save)
    const updateRole=await this.roleService.updateRole(findRole)

    return save
  }

  async assignPermissionToUser(assignPermissionToUser:AssignPermissionToUserDto):Promise<UserEntity>
  {
    const findUser=await this.userRepo.findOne({where:{id:assignPermissionToUser.userId},relations:["obj_permissions"]})
     const findPermissions=await this.permissionRepo.find({where:{id:In(assignPermissionToUser.permissionIds)}})

    findUser.obj_permissions.concat(findPermissions)
    const save=await this.userRepo.save(await this.userRepo.create(findUser))

    return save
  }
}