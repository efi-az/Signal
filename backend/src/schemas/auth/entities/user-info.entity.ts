import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { GenderEnum } from "../enums/gender.enum";
import { UserImageEntity } from "./user-image.entity";

@Entity({schema:"AUTH"})
export class UserInfoEntity {
  @PrimaryGeneratedColumn("uuid")
  id:string

  @Column()
  firstName:string

  @Column()
  lastName:string

  @Column({type:"enum",enum:GenderEnum})
  gender:GenderEnum

  @CreateDateColumn()
  createdAt:Date

  @UpdateDateColumn()
  updatedAt:Date

  @OneToOne(()=>UserImageEntity)
  @JoinColumn()
  obj_userImage:UserImageEntity
}