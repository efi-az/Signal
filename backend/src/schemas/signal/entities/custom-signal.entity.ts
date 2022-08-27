import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { TargetPointsJson } from "../classes/target-points.json";
import { UserEntity } from "../../auth/entities/user.entity";

@Entity({schema:"SIGNAL"})
export class CustomizedSignalEntity {
  @PrimaryGeneratedColumn("uuid")
  id:string

  @Column()
  entryPrice:number

  @Column({type:"jsonb"})
  targetPoints:TargetPointsJson[]

  @Column()
  description:string

  @CreateDateColumn()
  createdAt:Date

  @UpdateDateColumn()
  updatedAt:Date

  @ManyToOne(()=>UserEntity,x=>x.obj_custom_signals)
  @JoinColumn()
  obj_user:UserEntity
}
