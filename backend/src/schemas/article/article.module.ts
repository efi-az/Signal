import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleEntity } from "./entities/article.entity";
import { ArticleCategoryEntity } from "./entities/article-category.entity";
import { ArticleImageEntity } from "./entities/article-image.entity";
import { ArticleTagEntity } from "./entities/article-tag.entity";
import { ArticleService } from "./services/article.service";
import { ArticleController } from "./controllers/article.controller";
import { UserEntity } from "../auth/entities/user.entity";
import { ArticleCategoryService } from "./services/article-category.service";
import { ArticleTagService } from "./services/article-tag.service";
import { ArticleCategoryController } from "./controllers/article-category.controller";
import { ArticleTagController } from "./controllers/article-tag.controller";
import { MulterModule } from "@nestjs/platform-express";
import { MulterConfigurations } from "../../configuration/multer/multer-config";
import { ArticleImageService } from "./services/article-image.service";
import { ArticleImageController } from "./controllers/article-image.controller";
import { ElasticService } from "../../elastic/services/elastic.service";

@Module({
  imports: [MulterModule.registerAsync({ useClass: MulterConfigurations }),TypeOrmModule.forFeature([ArticleEntity, ArticleCategoryEntity, ArticleImageEntity, ArticleTagEntity, UserEntity])],
  providers: [ArticleService, ArticleCategoryService, ArticleTagService, ArticleImageService,ElasticService],
  controllers: [ArticleController, ArticleCategoryController, ArticleTagController, ArticleImageController]
})
export class ArticleModule {
}