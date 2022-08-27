import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({schema:"SIGNAL"})
export class CoinsEntity {
  @PrimaryGeneratedColumn("uuid")
  id:string

  @Column()
  coinId:string

  @Column()
  symbol:string

  @Column()
  name:string

  @Column()
  image:string

  @Column({nullable:true})
  maxSupply:string

  @Column({nullable:true})
  totalSupply:string

  @Column()
  circulatingSupply:string

  @CreateDateColumn()
  createdAt:Date

  @UpdateDateColumn()
  updatedAt:Date
}