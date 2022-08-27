import type { Axios, AxiosError, AxiosResponse } from "axios";
import ApiClient from "@/api/client/api.client";
import type { ProblemDetails } from "./model/problemDetails";
import type { ResponseOkModel } from "./model/responseOkModel";
import type { ArticleCategoryViewModel } from "./model/articleCategoryViewModel";
import type { CreateArticleCategoryDTO } from "./dto/createArticleCategoryDTO";
import type { UpdateArticleCategoryDTO } from "./dto/updateArticleCategoryDTO";

export default class ArticleCategoryService {
    protected resource = 'article/category';
    protected httpClient: Axios;

    constructor() {
        this.httpClient = ApiClient.getInstance()
    }

    public getAll(): Promise<AxiosResponse<ResponseOkModel<ArticleCategoryViewModel>> | AxiosError<ProblemDetails>> {
        return this.httpClient.get(`${this.resource}/all`)
    }

    public create(body: CreateArticleCategoryDTO): Promise<AxiosResponse<ResponseOkModel<ArticleCategoryViewModel>> | AxiosError<ProblemDetails>> {
        return this.httpClient.post(this.resource, body)
    }

    public update(body: UpdateArticleCategoryDTO, id: string): Promise<AxiosResponse<ResponseOkModel<ArticleCategoryViewModel>> | AxiosError<ProblemDetails>> {
        return this.httpClient.put(this.resource, body)
    }

    public delete(id: string): Promise<any | AxiosError<ProblemDetails>> {
        return this.httpClient.delete(`${this.resource}/${id}`)
    }

}