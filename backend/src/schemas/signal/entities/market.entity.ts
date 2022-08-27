import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { MarketStatusEnum } from "../enums/market-status.enum";
import { CustomSignalRequestEntity } from "./custom-signal-request.entity";
import { SignalEntity } from "./signal.entity";

@Entity({schema:"SIGNAL"})
export class MarketEntity {
  @PrimaryGeneratedColumn("uuid")
  id:string

  @Column({nullable:true})
  crypto:string

  @Column({nullable:true})
  base:string

  @Column({nullable:true})
  image:string

  @Column({type:"enum",enum:MarketStatusEnum,default:MarketStatusEnum.ENABLE})
  status:MarketStatusEnum

  @CreateDateColumn()
  createdAt:Date

  @UpdateDateColumn()
  updatedAt:Date

  @ManyToOne(()=>CustomSignalRequestEntity,x=>x.obj_market)
  obj_custom_signal_requests:CustomSignalRequestEntity[]

  @OneToMany(()=>SignalEntity,x=>x.obj_market)
  obj_signals:SignalEntity[]
}