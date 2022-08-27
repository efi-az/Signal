import { InjectRepository } from "@nestjs/typeorm";
import { ArticleEntity } from "../entities/article.entity";
import { In, Repository } from "typeorm";
import { ArticleDto } from "../dto/article.dto";
import { UserEntity } from "../../auth/entities/user.entity";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ArticleCategoryEntity } from "../entities/article-category.entity";
import { ArticleImageEntity } from "../entities/article-image.entity";
import { ArticleTagEntity } from "../entities/article-tag.entity";
import { IJwtUserInfo } from "../../auth/interfaces/jwt-user-info.interface";
import { PageOptionsDto } from "../../../utils/pagination/dto/page-option.dto";
import { PageDto } from "../../../utils/pagination/dto/page.dto";
import { PageMetaDto } from "../../../utils/pagination/dto/page-meta.dto";
import { ElasticService } from "../../../elastic/services/elastic.service";

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(ArticleEntity) private articleRep: Repository<ArticleEntity>,
              @InjectRepository(ArticleCategoryEntity) private articleCatRep: Repository<ArticleCategoryEntity>,
              @InjectRepository(ArticleImageEntity) private articleImageRep: Repository<ArticleImageEntity>,
              @InjectRepository(ArticleTagEntity) private articleTagRep: Repository<ArticleTagEntity>,
              @InjectRepository(UserEntity) private userRep: Repository<UserEntity>,
              private elasticService:ElasticService) {
  }

  async createArticle(articleDto: ArticleDto, userInfo: IJwtUserInfo): Promise<ArticleEntity> {
    const findArticle = await this.articleRep.findOne({ where: [{ title: articleDto.title }, { slug: articleDto.slug }] });
    if (findArticle) throw new BadRequestException("article duplicate");

    const findUser = await this.userRep.findOne({ where: { id: userInfo.userId }, relations: ["obj_articles"] });

    const article = new ArticleEntity();
    article.slug = articleDto.slug;
    article.title = articleDto.title;
    article.summary = articleDto.summary;
    article.description = articleDto.description;
    article.readingTime = articleDto.readingTime;
    article.metaKey = articleDto.metaKey;
    article.metaDescription = articleDto.metaDescription;
    article.pin_status = articleDto.pin_status;
    article.status = articleDto.status;
    article.obj_categories = await this.articleCatRep.find({where:{id:In(articleDto.categoriesId)}})
    article.obj_article_image = await this.articleImageRep.findOne({ where: { id: articleDto.imageId } });
    article.obj_article_tags = await this.articleTagRep.find({where:{id:In(articleDto.tagsId)}})
    article.obj_user = findUser;
    const savedArticle = await this.articleRep.save(await this.articleRep.create(article));
    // await this.elasticService.createArticles(savedArticle)
    findUser.obj_articles.push(savedArticle);
    await this.userRep.save(findUser);

    return savedArticle;
  }

  async updateArticle(articleDto: ArticleDto, articleId: string): Promise<ArticleEntity> {
    const findArticle = await this.getOneArticleById(articleId);

    findArticle.slug = articleDto.slug;
    findArticle.title = articleDto.title;
    findArticle.summary = articleDto.summary;
    findArticle.description = articleDto.description;
    findArticle.readingTime = articleDto.readingTime;
    findArticle.metaKey = articleDto.metaKey;
    findArticle.metaDescription = articleDto.metaDescription;
    findArticle.pin_status = articleDto.pin_status;
    findArticle.status = articleDto.status;
    findArticle.obj_categories = await this.articleCatRep.find({where:{id:In(articleDto.categoriesId)}})
    findArticle.obj_article_image = await this.articleImageRep.findOne({ where: { id: articleDto.imageId } });
    findArticle.obj_article_tags = await this.articleTagRep.find({where:{id:In(articleDto.tagsId)}})
    const saveArticleUpdates= await this.articleRep.save(await this.articleRep.create(findArticle));
    // await this.elasticService.updateArticle(saveArticleUpdates)
    return saveArticleUpdates

  }

  async getOneArticle(articleId: string): Promise<ArticleEntity> {
    return this.getOneArticleById(articleId);
  }

  async deleteArticle(articleId: string): Promise<any> {
    return await this.articleRep.delete({ id: articleId });
  }

  private async getOneArticleById(articleId: string): Promise<ArticleEntity> {
    const findArticle = await this.articleRep.findOne({ where: { id: articleId }, relations: ['obj_article_image', 'obj_article_tags', 'obj_categories'] });
    if (!findArticle) throw new BadRequestException("article not found");
    return findArticle;
  }

  async getPinnedArticle(): Promise<ArticleEntity[]> {
    const query=await this.articleRep.createQueryBuilder("article")
      .where("article.pinned : =status",{status:true})
      .getMany()

    return query
  }

  async getPaginationArticle(pageOptionsDto: PageOptionsDto): Promise<PageDto<ArticleEntity>> {
    const queryBuilder = this.articleRep.createQueryBuilder("article");

    queryBuilder
      .leftJoinAndSelect("article.obj_article_image", "article_image")
      .leftJoinAndSelect("article.obj_categories", "article_category")
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ pageOptionsDto,itemCount });

    return new PageDto(entities, pageMetaDto);
  }

}