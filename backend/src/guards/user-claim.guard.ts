import { CanActivate, ExecutionContext, Inject, UseGuards } from "@nestjs/common";
import { Observable } from "rxjs";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../schemas/auth/entities/user.entity";
import { In, Repository } from "typeorm";
import { PermissionEntity } from "../schemas/auth/entities/permission.entity";
import { RoleEntity } from "../schemas/auth/entities/role.entity";
import { RoutesEntity } from "../schemas/auth/entities/routes.entity";
import { JwtUserInfo } from "../decorators/jwt-user-info.decorator";
import { IJwtUserInfo } from "../schemas/auth/interfaces/jwt-user-info.interface";

export function useUserClaimGuard() {
  return UseGuards(UserClaimGuard);
}

export class UserClaimGuard implements CanActivate {
              @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>
              @InjectRepository(PermissionEntity) private permissionRepo: Repository<PermissionEntity>
              @InjectRepository(RoleEntity) private roleRepo: Repository<RoleEntity>
              @InjectRepository(RoutesEntity) private routeRepo: Repository<RoutesEntity>

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rolesPermissions: PermissionEntity[] = [];

    const request = context.switchToHttp().getRequest();
    const user: IJwtUserInfo = request.user;
    const findUserPermissions = await this.userRepo.findOne({
      where: { id: user.userId },
      relations: ["obj_permissions"]
    });
    const userPermissions = findUserPermissions.obj_permissions;

    const findUserRolesPermissions = await this.roleRepo.find({
      where: { id: In(user.userRole) },
      relations: ["obj_permissions"]
    });

    for (let findUserRolesPermission of findUserRolesPermissions) {
      rolesPermissions.push(findUserRolesPermission);
    }

    const userAllPermissions = userPermissions.concat(rolesPermissions);

    const findRoute = await this.routeRepo.findOne({
      where: { address: request.originalUrl },
      relations: ["obj_permission"]
    });
    const apiPermissions = findRoute.obj_permission;

    if (apiPermissions.length <= 0)
      return false;


    for (let apiPermission of apiPermissions) {
      const checkClaims = userAllPermissions.find(x => x.id == apiPermission.id);
      if (checkClaims) {
        return true;

      }
      return false;

    }

  }

}