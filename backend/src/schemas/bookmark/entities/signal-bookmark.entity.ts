import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEnum } from "../../auth/enums/user.enum";
import { BookmarkStatusEnum } from "../enums/bookmark-status.enum";
import { UserEntity } from "../../auth/entities/user.entity";
import { SignalEntity } from "../../signal/entities/signal.entity";

@Entity({ schema: "BOOKMARK" })
export class SignalBookmarkEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "enum", enum: BookmarkStatusEnum, default: BookmarkStatusEnum.ACTIVE })
  status: BookmarkStatusEnum;

  @ManyToOne(()=>UserEntity,x=>x.obj_signal_bookmarks)
  @JoinColumn()
  obj_user:UserEntity

  @ManyToOne(()=>SignalEntity,x=>x.obj_signal_bookmarks)
  @JoinColumn()
  obj_signal:SignalEntity
}