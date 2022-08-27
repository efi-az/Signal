import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ImageEnum } from "../../auth/enums/image.enum";

@Entity({ schema: "ARTICLE" })
export class ArticleImageEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  fileName: string;

  @Column()
  filePath: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: "enum", enum: ImageEnum, default: ImageEnum.ACTIVE })
  status: ImageEnum;
}