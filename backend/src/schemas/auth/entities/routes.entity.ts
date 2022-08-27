import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { RequestMethod } from "@nestjs/common";
import { RouteCategoryEnum } from "../enums/route.enum";
import { PermissionEntity } from "./permission.entity";

@Entity({schema:"AUTH"})
export class RoutesEntity {
@PrimaryGeneratedColumn("uuid")
  id:string

  @Column()
  address:string

  @Column({type:"enum",enum:RequestMethod})
  method:RequestMethod

  @Column()
  category:RouteCategoryEnum

  @Column()
  description:string

  @ManyToMany(()=>PermissionEntity)
  @JoinTable()
  obj_permission:PermissionEntity[]
}