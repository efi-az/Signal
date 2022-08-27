import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ImageEnum } from "../enums/image.enum";

@Entity({schema:"AUTH"})
export class UserImageEntity {
  @PrimaryGeneratedColumn("uuid")
  id:string

  @Column()
  fileName:string

  @CreateDateColumn()
  createdAt:Date

  @Column({type:"enum",enum:ImageEnum,default:ImageEnum.ACTIVE})
  status:ImageEnum
}