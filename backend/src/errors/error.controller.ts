import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ErrorService } from './error.service';
import { AddLanguageArrayDto, LanguageNameDto } from './error.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('[Errors]')
@Controller('error')
export class ErrorController {
  constructor(private errorService: ErrorService) {
  }

  // create file by language name and response error-en
  @Post('create-file')
  async createFileByLanguageName(@Body() languageNameDto: LanguageNameDto) {
    return this.errorService.createFileByLanguageName(languageNameDto)
  }

  @Post('add-language')
  async addLanguage(@Body() addLanguageDto: AddLanguageArrayDto) {
    return this.errorService.addLanguage(addLanguageDto)
  }

  @Get('get-file')
  async getFileFromFolder() {
    return this.errorService.getFileFromFolder()
  }

  @Delete('delete-file/:filename')
  async deleteByFilename(@Param('filename') filename: string) {
    return this.errorService.deleteByFilename(filename)
  }


}