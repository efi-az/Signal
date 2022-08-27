import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreditEnum } from '../enums/credit.enum';
import { CurrencyEnum } from '../enums/currency.enum';
import { CreditEntity } from "./credit.entity";

@Entity({ schema: 'SIGNAL' })
export class CurrencyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  symbol: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'enum', enum: CurrencyEnum, default: CurrencyEnum.ENABLE })
  status: CurrencyEnum;

  @ManyToOne(()=>CreditEntity,x=>x.obj_currency)
  @JoinColumn()
  obj_credits:CreditEntity
}