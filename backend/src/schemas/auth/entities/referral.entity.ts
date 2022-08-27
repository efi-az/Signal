import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({schema:"AUTH"})
@Tree("closure-table", {
  closureTableName: "referral_closure",
  ancestorColumnName: (column) => "ancestor_" + column.propertyName,
  descendantColumnName: (column) => "descendant_" + column.propertyName,
})
export class ReferralEntity {
  @PrimaryGeneratedColumn("uuid")
  id:string

  @TreeChildren()
  Childrens:ReferralEntity[]

  @TreeParent()
  parent:ReferralEntity

  @OneToOne(()=>UserEntity)
  @JoinColumn()
  obj_user:UserEntity
}