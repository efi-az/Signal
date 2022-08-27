import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignalImageEntity } from '../entities/signal-image.entity';
import { Repository } from 'typeorm';
import { ImageEnum } from '../../auth/enums/image.enum';

@Injectable()
export class SignalImageService {
  constructor(@InjectRepository(SignalImageEntity) private signalImageRep: Repository<SignalImageEntity>) {
  }

  async createImage(file: Express.Multer.File): Promise<any> {

    const image = new SignalImageEntity();
    image.fileName = file.originalname;
    image.filePath = file.path;
    return await this.signalImageRep.save(image);
  }

  async deleteImage(imageId: string): Promise<SignalImageEntity> {
    const findImage = await this.signalImageRep.findOne({ where: { id: imageId } });
    if (!findImage) throw new BadRequestException('image not found');

    findImage.status = ImageEnum.DESABLED;
    return await this.signalImageRep.save(findImage);
  }
}