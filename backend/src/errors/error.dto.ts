import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LanguageNameDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  language: string;
}

export class AddLanguageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  key: string;
}

export class AddLanguageArrayDto {
  @ApiProperty({isArray: true, type: AddLanguageDto})
  @IsArray()
  languageValue: AddLanguageDto[]

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  filename: string
}