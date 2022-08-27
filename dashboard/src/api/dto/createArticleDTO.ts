import type {ArticleStatusEnum} from "@/api/enum/articleStatusEnum";

export interface CreateArticleDTO {
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