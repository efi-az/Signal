import { RoleEntity } from "../entities/role.entity";

export interface IJwtUserInfo {
  userId:string
  userRole:RoleEntity[]
  iat:number
  exp:number
}