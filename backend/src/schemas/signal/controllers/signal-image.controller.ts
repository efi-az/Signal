import { Controller, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { SignalImageService } from "../services/signal-image.service";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { SignalImageEntity } from "../entities/signal-image.entity";
import { SignalImageDto } from '../dto/signal-image.dto';

@ApiTags("[Signal Image]")
@Controller("signal/image")
export class SignalImageController {
  constructor(private signalImageService: SignalImageService) {
  }

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: SignalImageDto })
  async createImage(@UploadedFile("file") file: Express.Multer.File): Promise<SignalImageEntity> {
    return await this.signalImageService.createImage(file);
  }

  @Put(":id")
  async deleteImage(@Param("id") imageId: string): Promise<SignalImageEntity> {
    return await this.signalImageService.deleteImage(imageId);
  }
}