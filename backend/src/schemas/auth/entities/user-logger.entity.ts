import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({schema:"AUTH"})
export class UserLoggerEntity {
  @PrimaryGeneratedColumn("uuid")
  id:string

  @Column()
  userId:string

  @CreateDateColumn()
  createdAt:Date

  @Column()
  os:string

  @Column()
  osVersion:string

  @Column()
  browserVersion:string

  @Column()
  browser:string
}