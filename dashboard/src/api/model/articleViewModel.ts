import type {ArticleStatusEnum} from "@/api/enum/articleStatusEnum";
import type { ArticleCategoryViewModel } from "./articleCategoryViewModel";
import type { ArticleImageViewModel } from "./articleImageViewModel";
import type { ArticleTagViewModel } from "./articleTagViewModel";

export interface ArticleViewModel {
    id: string
    slug: string
    title: string
    summary: string
    description: string
    readingTime: number
    metaKey: string
    metaDescription: string
    pin_status: boolean
    createdAt: Date
    updatedAt: Date
    status: ArticleStatusEnum
    categoriesId: string[]
    imageId: string
    tagsId: string[],
    obj_article_image: ArticleImageViewModel,
    obj_article_tags: ArticleTagViewModel[],
    obj_categories: ArticleCategoryViewModel[]
}