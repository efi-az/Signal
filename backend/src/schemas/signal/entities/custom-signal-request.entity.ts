import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { MarketEnum } from "../enums/market.enum";
import { BarginEnum } from "../enums/bargin.enum";
import { TimeFrameEnum } from "../enums/time-frame.enum";
import { CustomSignalEnum } from "../enums/custom-signal.enum";
import { UserEntity } from "../../auth/entities/user.entity";
import { CustomizedSignalEntity } from "./custom-signal.entity";
import { MarketEntity } from "./market.entity";

@Entity({schema:"SIGNAL"})
export class CustomSignalRequestEntity {
  @PrimaryGeneratedColumn("uuid")
  id:string

  @Column({type:"enum",enum:MarketEnum})
  marketType:MarketEnum

  @Column({type:"enum",enum:BarginEnum})
  barginType:BarginEnum

  @CreateDateColumn()
  createdAt:Date

  @UpdateDateColumn()
  updatedAt:Date

  @Column({type:"enum",enum:TimeFrameEnum})
  timeFrame:TimeFrameEnum

  @Column({type:"enum",enum:CustomSignalEnum})
  status:CustomSignalEnum

  @ManyToOne(()=>UserEntity,x=>x.obj_custom_signals_request)
  @JoinColumn()
  obj_user:UserEntity

  @OneToOne(()=>CustomizedSignalEntity)
  @JoinColumn()
  obj_customized_signal:CustomizedSignalEntity

  @OneToMany(()=>MarketEntity,x=>x.obj_custom_signal_requests)
  @JoinColumn()
  obj_market:MarketEntity
}