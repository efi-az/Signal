import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ArticleCategoryEntity } from "../entities/article-category.entity";
import { Repository } from "typeorm";
import { ArticleCategoryDto } from "../dto/article-category.dto";

@Injectable()
export class ArticleCategoryService {
  constructor( @InjectRepository(ArticleCategoryEntity) private articleCatRep: Repository<ArticleCategoryEntity>) {
  }

  async createCategory(articleCategoryDto: ArticleCategoryDto): Promise<ArticleCategoryEntity> {
    const findCategory = await this.articleCatRep.findOne({where: {name: articleCategoryDto.name}})
    if (findCategory) throw new BadRequestException('duplicated category for article')

    const category = new ArticleCategoryEntity()
    category.name = articleCategoryDto.name
    const savedCategory = await this.articleCatRep.save(await this.articleCatRep.create(category))

    return savedCategory
  }

  async updateCategory(articleCategoryDto: ArticleCategoryDto, categoryId: string): Promise<ArticleCategoryEntity> {
    const findCategory = await this.articleCatRep.findOne({where: {id: categoryId}})
    if (!findCategory) throw new BadRequestException('not found category for article')

    findCategory.name = articleCategoryDto.name
    const savedCategory = await this.articleCatRep.save(findCategory)

    return savedCategory
  }

  async deleteCategory(categoryId: string): Promise<any> {
    return await this.articleCatRep.delete({ id: categoryId });
  }

  async getAllCategory(): Promise<ArticleCategoryEntity[]> {
    return await this.articleCatRep.find()
  }
}