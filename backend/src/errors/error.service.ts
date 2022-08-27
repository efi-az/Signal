import { BadRequestException, Injectable } from '@nestjs/common';
import { AddLanguageArrayDto, LanguageNameDto } from './error.dto';
import { checkIfFileOrDirectoryExists, createFile, deleteFile, getFile, writeJsonFile } from './helper';
import * as errorsData from './json/error-en.json';

@Injectable()
export class ErrorService {
  path = process.cwd() + `/src/errors/json`;

  async createFileByLanguageName(languageNameDto: LanguageNameDto) {
    const filename = `error-${languageNameDto.language}.json`;
    if (checkIfFileOrDirectoryExists(this.path + '/' + filename)) {
      throw new BadRequestException('file exists');
    }

    await createFile(this.path, filename, errorsData);
    return errorsData;
  }

  async addLanguage(addLanguageDto: AddLanguageArrayDto) {
    const filename = `error-${addLanguageDto.filename}.json`;
    if (!checkIfFileOrDirectoryExists(this.path + '/' + filename)) {
      throw new BadRequestException('file not exists');
    }

    await writeJsonFile(this.path, filename, addLanguageDto.languageValue);
  }

  async getFileFromFolder() {
    return getFile(this.path);
  }

  async deleteByFilename(filename: string) {
    const filenames = `error-${filename}.json`;
    if (!checkIfFileOrDirectoryExists(this.path + '/' + filenames)) {
      throw new BadRequestException('file not exists');
    }
    await deleteFile(this.path + '/' + filenames);
  }
}