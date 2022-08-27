import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { PermissionEntity } from "./permission.entity";

@Entity({schema:"AUTH"})
export class RoleEntity {
  @PrimaryGeneratedColumn("uuid")
  id:string

  @Column()
  name:string

  @CreateDateColumn()
  createdAt:Date

  @ManyToMany(()=>PermissionEntity)
  @JoinTable()
  obj_permissions:PermissionEntity[]
}