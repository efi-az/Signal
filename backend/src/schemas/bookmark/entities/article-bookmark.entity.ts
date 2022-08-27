import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookmarkStatusEnum } from "../enums/bookmark-status.enum";
import { UserEntity } from "../../auth/entities/user.entity";
import { ArticleEntity } from "../../article/entities/article.entity";

@Entity({ schema: "BOOKMARK" })
export class ArticleBookmarkEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "enum", enum: BookmarkStatusEnum, default: BookmarkStatusEnum.ACTIVE })
  status: BookmarkStatusEnum;

  @ManyToOne(()=>UserEntity,x=>x.obj_article_bookmarks)
  @JoinColumn()
  obj_user:UserEntity

  @ManyToOne(()=>ArticleEntity,x=>x.obj_article_bookmarks)
  @JoinColumn()
  obj_article:ArticleEntity
}