import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ArticleTagService } from "../services/article-tag.service";
import { ArticleTagEntity } from "../entities/article-tag.entity";
import { ArticleTagDto } from "../dto/article-tag.dto";
import { UseBearerAuth } from "../../../configuration/swagger/use-bearer-auth.decorator";
import { UseJwtGuard } from "../../../guards/jwt.guard";

@ApiTags("[Article Tag]")
@Controller('article/tag')
export class ArticleTagController {
  constructor(private articleTagService: ArticleTagService) {
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Post()
  async createTag(@Body() articleTagDto: ArticleTagDto): Promise<ArticleTagEntity> {
    return await this.articleTagService.createTag(articleTagDto);
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Put(":id")
  async updateTag(@Body() articleTagDto: ArticleTagDto, @Param("id") tagId: string): Promise<ArticleTagEntity> {
    return await this.articleTagService.updateTag(articleTagDto, tagId);
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Delete(":id")
  async deleteTag(@Param("id") tagId: string): Promise<any> {
    return await this.articleTagService.deleteTag(tagId);
  }

  @Get("all")
  async getAllTag(): Promise<ArticleTagEntity[]> {
    return await this.articleTagService.getAllTag();
  }
}