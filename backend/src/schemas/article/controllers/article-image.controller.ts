import { Controller, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ArticleImageService } from "../services/article-image.service";
import { ArticleImageEntity } from "../entities/article-image.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { ArticleImageDto } from "../dto/article-image.dto";
import { Response } from "express";

@ApiTags("[Article Image]")
@Controller("article/image")
export class ArticleImageController {
  constructor(private articleImageService: ArticleImageService) {
  }

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes('multipart/form-data')
  @ApiBody({type: ArticleImageDto })
  async createImage(@UploadedFile("file") file: Express.Multer.File): Promise<ArticleImageEntity> {
    return await this.articleImageService.createImage(file);
  }

  @Put(":id")
  async deleteImage(@Param("id") imageId: string): Promise<ArticleImageEntity> {
    return await this.articleImageService.deleteImage(imageId)
  }

  @Get('files/:id')
  async sendFile(@Param('id') idFile: string, @Res() res: Response) {
    res.sendFile(idFile, {root: "assets"})
  }
  
  @Get(':id')
  async getImage(@Param('id') id: string): Promise<ArticleImageEntity> {
    return this.articleImageService.getImage(id)
  }
}