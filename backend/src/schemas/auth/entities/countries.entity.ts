import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({schema:"AUTH",name:"countries"})
export class CountriesEntity {
  @PrimaryGeneratedColumn("uuid")
  id:string

  @Column()
  name:string

  @Column("text",{array:true})
  callingCode:string[]

  @Column({nullable:true})
  capital:string

  @Column()
  region:string

  @Column()
  flagImage:string
}