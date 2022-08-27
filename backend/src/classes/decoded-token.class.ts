import { RoleEntity } from "../schemas/auth/entities/role.entity";

export class DecodedToken {
  userId:string
  userRole:RoleEntity[]
  iat:number
  exp:number
}