import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "../entities/role.entity";
import { FindOneOptions, In, Repository } from "typeorm";
import { AssignPermissionToRoleDto } from "../dto/assign-permission-to-role.dto";
import { PermissionEntity } from "../entities/permission.entity";
import { UserEntity } from "../entities/user.entity";
import { AssignRoleToUserDto } from "../dto/assign-role-to-user.dto";
import { addAbortSignal } from "stream";

@Injectable()
export class RoleService {
  constructor(@InjectRepository(RoleEntity) private roleRepo:Repository<RoleEntity>,
              @InjectRepository(PermissionEntity) private permissionRepo:Repository<PermissionEntity>,
              @InjectRepository(UserEntity) private userRepo:Repository<UserEntity>)
  {}

  async createRole(name:string):Promise<RoleEntity>
  {
    const role=new RoleEntity()
    role.name=name
    const save=await this.roleRepo.save(await this.roleRepo.create(role))
    return save
  }

  async findRole(query:FindOneOptions):Promise<RoleEntity>
  {
    const findRole=await this.roleRepo.findOne(query)
    return findRole
  }

  async updateRole(roleEntity:RoleEntity):Promise<RoleEntity>
  {
    const updateRole=await this.roleRepo.save(await this.roleRepo.create(roleEntity))
    return updateRole
  }

  async assignPermissionToRole(assignPermissionToRoleDto:AssignPermissionToRoleDto):Promise<RoleEntity>
  {
    const findRole=await this.roleRepo.findOne({where:{id:assignPermissionToRoleDto.roleId},relations:["obj_permissions"]})
      const findPermissions=await this.permissionRepo.find({where:{id:In(assignPermissionToRoleDto.permissionIds)}})

    findRole.obj_permissions.concat(findPermissions)
    const saveRole=await this.roleRepo.save(await this.roleRepo.create(findRole))

    return saveRole
  }

  async assignRoleToUser(assignRoleToUserDto:AssignRoleToUserDto):Promise<UserEntity>
  {
    const findUser=await this.userRepo.findOne({where:{id:assignRoleToUserDto.userId},relations:["obj_roles"]})
    const findRole=await this.roleRepo.findOne({where:{id:assignRoleToUserDto.roleId}})
      findUser.obj_roles.push(findRole)
    const save=await this.userRepo.save(await this.userRepo.create(findUser))

    return save
  }
}