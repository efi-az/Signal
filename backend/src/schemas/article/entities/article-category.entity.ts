import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {ArticleEntity} from "./article.entity";

@Entity({schema: "ARTICLE"})
export class ArticleCategoryEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @CreateDateColumn()
    createdAt: Date
}