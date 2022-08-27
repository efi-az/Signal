import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne, OneToMany, OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { CreditEnum } from "../enums/credit.enum";
import { UserEntity } from "../../auth/entities/user.entity";
import { SignalEntity } from "./signal.entity";
import { CurrencyEntity } from "./currency.entity";

@Entity({schema:"SIGNAL"})
export class CreditEntity {
  @PrimaryGeneratedColumn("uuid")
  id:string

  @Column()
  name:string

  @Column()
  expireTime:Date

  @Column()
  price:number

  @Column()
  pinned:boolean

  @Column("simple-array")
  description:string[]

  @CreateDateColumn()
  createdAt:Date

  @Column({type:"enum",enum:CreditEnum,default:CreditEnum.ACTIVE})
  status:CreditEnum

  @ManyToOne(()=>UserEntity,x=>x.obj_credits)
  @JoinColumn()
  obj_user:UserEntity

  @OneToMany(()=>CurrencyEntity,x=>x.obj_credits)
  obj_currency:CurrencyEntity[]
}