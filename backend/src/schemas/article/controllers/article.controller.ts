import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ArticleEntity } from "../entities/article.entity";
import { ArticleService } from "../services/article.service";
import { ArticleDto } from "../dto/article.dto";
import { UseJwtGuard } from "../../../guards/jwt.guard";
import { ApiTags } from "@nestjs/swagger";
import { UseBearerAuth } from "../../../configuration/swagger/use-bearer-auth.decorator";
import { JwtUserInfo } from "../../../decorators/jwt-user-info.decorator";
import { IJwtUserInfo } from "../../auth/interfaces/jwt-user-info.interface";
import { PageOptionsDto } from "../../../utils/pagination/dto/page-option.dto";
import { PageDto } from "../../../utils/pagination/dto/page.dto";
import { ThrottlerGuard } from "@nestjs/throttler";

@ApiTags("[Article]")
@Controller("article")
export class ArticleController {
  constructor(private articleService: ArticleService) {
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Post()
  async createArticle(@Body() articleDto: ArticleDto, @JwtUserInfo() userInfo: IJwtUserInfo): Promise<ArticleEntity> {
    return await this.articleService.createArticle(articleDto, userInfo);
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Put(":id")
  async updateArticle(@Body() articleDto: ArticleDto, @Param("id") articleId: string): Promise<ArticleEntity> {
    return await this.articleService.updateArticle(articleDto, articleId);
  }

  @Get(":id")
  async getOneArticle(@Param("id") articleId: string): Promise<ArticleEntity> {
    return await this.articleService.getOneArticle(articleId);
  }

  @Post("pagination")
  async getPaginationArticle(@Body() pageOptionsDto: PageOptionsDto): Promise<PageDto<ArticleEntity>> {
    return await this.articleService.getPaginationArticle(pageOptionsDto);
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Delete(":id")
  async deleteArticle(@Param("id") articleId: string): Promise<ArticleEntity> {
    return await this.articleService.deleteArticle(articleId);
  }

  @Get("pinned")
  async getPinnedArticle(): Promise<ArticleEntity[]> {
    return await this.articleService.getPinnedArticle();
  }
}