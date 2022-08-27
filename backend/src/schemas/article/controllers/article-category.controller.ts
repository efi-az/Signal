import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ArticleCategoryService } from "../services/article-category.service";
import { ArticleCategoryEntity } from "../entities/article-category.entity";
import { ArticleCategoryDto } from "../dto/article-category.dto";
import { UseBearerAuth } from "../../../configuration/swagger/use-bearer-auth.decorator";
import { UseJwtGuard } from "../../../guards/jwt.guard";

@ApiTags("[Article Category]")
@Controller("article/category")
export class ArticleCategoryController {
  constructor(private articleCategoryService: ArticleCategoryService) {
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Post()
  async createCategory(@Body() articleCategoryDto: ArticleCategoryDto): Promise<ArticleCategoryEntity> {
    return await this.articleCategoryService.createCategory(articleCategoryDto);
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Put(":id")
  async updateCategory(@Body() articleCategoryDto: ArticleCategoryDto, @Param("id") categoryId: string): Promise<ArticleCategoryEntity> {
    return await this.articleCategoryService.updateCategory(articleCategoryDto, categoryId);
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Delete(":id")
  async deleteCategory(@Param("id") categoryId: string): Promise<any> {
    return await this.articleCategoryService.deleteCategory(categoryId);
  }

  @Get("all")
  async getAllCategory(): Promise<ArticleCategoryEntity[]> {
    return await this.articleCategoryService.getAllCategory();
  }
}