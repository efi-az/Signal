import {
  Column,
  CreateDateColumn,
  Entity, Index,
  JoinColumn, JoinTable, ManyToMany,
  ManyToOne, OneToMany, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArticleEnum } from "../enums/article.enum";
import { UserEntity } from "../../auth/entities/user.entity";
import { ArticleCategoryEntity } from "./article-category.entity";
import { ArticleImageEntity } from "./article-image.entity";
import { ArticleTagEntity } from "./article-tag.entity";
import { ArticleBookmarkEntity } from "../../bookmark/entities/article-bookmark.entity";

@Entity({ schema: "ARTICLE" })
export class ArticleEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  @Index()
  slug: string;

  @Column()
  title: string;

  @Column()
  summary: string;

  @Column()
  description: string;

  @Column()
  readingTime: number;

  @Column()
  metaKey: string;

  @Column()
  metaDescription: string;

  @Column({ default: false })
  pin_status:boolean

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "enum", enum: ArticleEnum, default: ArticleEnum.ACTIVE })
  status: ArticleEnum;

  @ManyToOne(() => UserEntity, x => x.obj_articles)
  @JoinColumn()
  obj_user: UserEntity;

  @ManyToMany(()=>ArticleCategoryEntity,{cascade:true})
  @JoinTable()
  obj_categories:ArticleCategoryEntity[]

  @OneToOne(() => ArticleImageEntity,{cascade:true})
  @JoinColumn()
  obj_article_image: ArticleImageEntity;

  @ManyToMany(() => ArticleTagEntity,{cascade:true})
  @JoinTable()
  obj_article_tags: ArticleTagEntity[];

  @OneToMany(()=>ArticleBookmarkEntity,x=>x.obj_article,{cascade:true})
  obj_article_bookmarks:ArticleBookmarkEntity[]
}