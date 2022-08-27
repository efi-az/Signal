import {IsArray, IsBoolean, IsEnum, IsNumber, IsString} from "class-validator";
import {ArticleEnum} from "../enums/article.enum";
import {ApiProperty} from "@nestjs/swagger";

export class ArticleDto {
    @ApiProperty()
    @IsString()
    slug: string

    @ApiProperty()
    @IsString()
    title: string

    @ApiProperty()
    @IsString()
    summary: string

    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    @IsNumber()
    readingTime: number

    @ApiProperty()
    @IsString()
    metaKey: string

    @ApiProperty()
    @IsString()
    metaDescription: string

    @ApiProperty()
    @IsBoolean()
    pin_status: boolean

    @ApiProperty({enum: ArticleEnum})
    @IsEnum(ArticleEnum)
    status: ArticleEnum

    @ApiProperty()
    @IsArray()
    categoriesId: string[]

    @ApiProperty()
    // @IsString()
    imageId: string

    @ApiProperty()
    @IsArray()
    tagsId: string[]
}