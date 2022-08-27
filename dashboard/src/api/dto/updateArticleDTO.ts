import type {ArticleStatusEnum} from "../enum/articleStatusEnum";

export interface UpdateArticleDTO {
    slug: string
    title: string
    summary: string
    description: string
    readingTime: number
    metaKey: string
    metaDescription: string
    pin_status: boolean
    status: ArticleStatusEnum
    categoriesId: string[]
    imageId: string
    tagsId: string[]
}