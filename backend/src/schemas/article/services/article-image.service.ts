import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ArticleImageEntity } from "../entities/article-image.entity";
import { Repository } from "typeorm";
import { ImageEnum } from "../../auth/enums/image.enum";

@Injectable()
export class ArticleImageService {
  constructor(@InjectRepository(ArticleImageEntity) private articleImageRep: Repository<ArticleImageEntity>) {
  }

  async createImage(file: Express.Multer.File): Promise<ArticleImageEntity> {

    const image = new ArticleImageEntity();
    image.fileName = file.originalname;
    image.filePath = file.path;

    return await this.articleImageRep.save(image);;
  }

  async deleteImage(imageId: string): Promise<ArticleImageEntity> {
    const findImage = await this.articleImageRep.findOne({ where: { id: imageId } });
    if (!findImage) throw new BadRequestException('image not found')

    findImage.status = ImageEnum.DESABLED
    return await this.articleImageRep.save(findImage)
  }

  async getImage(id: string): Promise<ArticleImageEntity> {
    return await this.articleImageRep.findOne({ where: { id } })
  }
}