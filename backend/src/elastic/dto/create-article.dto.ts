export class CreateArticleDto {
  articleId:string
  slug:string
  title:string
  summary:string
  description:string
  readingTime:number
  metaKey:string
  metaDescription:string
  createAt:Date
  categoryId:string
}