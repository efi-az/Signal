import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ArticleTagEntity } from "../entities/article-tag.entity";
import { Repository } from "typeorm";
import { ArticleTagDto } from "../dto/article-tag.dto";

@Injectable()
export class ArticleTagService {
  constructor(@InjectRepository(ArticleTagEntity) private articleTagRep: Repository<ArticleTagEntity>) {
  }

  async createTag(articleTagDto: ArticleTagDto): Promise<ArticleTagEntity> {
    const findTag = await this.articleTagRep.findOne({ where: { name: articleTagDto.name } });
    if (findTag) throw new BadRequestException("duplicated tag for article");

    const tag = new ArticleTagEntity();
    tag.name = articleTagDto.name;
    const savedTag = await this.articleTagRep.save(await this.articleTagRep.create(tag));

    return savedTag;
  }

  async updateTag(articleTagDto: ArticleTagDto, tagId: string): Promise<ArticleTagEntity> {
    const findTag = await this.articleTagRep.findOne({ where: { id: tagId } });
    if (!findTag) throw new BadRequestException("not found tag for article");

    findTag.name = articleTagDto.name;
    const savedTag = await this.articleTagRep.save(findTag);

    return savedTag;
  }

  async deleteTag(tagId: string): Promise<any> {
    return await this.articleTagRep.delete({ id: tagId });
  }

  async getAllTag(): Promise<ArticleTagEntity[]> {
    return await this.articleTagRep.find();
  }
}