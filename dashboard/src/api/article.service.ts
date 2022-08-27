import type { Axios, AxiosError, AxiosResponse } from "axios";
import ApiClient from "@/api/client/api.client";
import type { PaginationPageOptionsModel } from "./model/paginationPageOptionsModel";
import type { PaginationResponseModel } from "./model/paginationResponseModel";
import type { ArticleViewModel } from "./model/articleViewModel";
import type { ProblemDetails } from "./model/problemDetails";
import type { CreateArticleDTO } from "./dto/createArticleDTO";
import type { UpdateArticleDTO } from "./dto/updateArticleDTO";
import type { ResponseOkModel } from "./model/responseOkModel";

export default class ArticleService {
    protected resource = 'article';
    protected httpClient: Axios;

    constructor() {
        this.httpClient = ApiClient.getInstance()
    }

    public get(paginationPage: PaginationPageOptionsModel):
        Promise<AxiosResponse<ResponseOkModel<PaginationResponseModel<ArticleViewModel>>> | AxiosError<ProblemDetails>> {
        return this.httpClient.post(`${this.resource}/pagination`, paginationPage)
    }

    public getById(id: string): Promise<AxiosResponse<ResponseOkModel<ArticleViewModel>> | AxiosError<ProblemDetails>> {
        return this.httpClient.get(`${this.resource}/${id}`)
    }

    public getPinned(id: string): Promise<AxiosResponse<ResponseOkModel<ArticleViewModel>> | AxiosError<ProblemDetails>> {
        return this.httpClient.get(`${this.resource}/pinned`)
    }

    public create(body: CreateArticleDTO): Promise<AxiosResponse<ResponseOkModel<ArticleViewModel>> | AxiosError<ProblemDetails>> {
        return this.httpClient.post(this.resource, body)
    }

    public update(body: UpdateArticleDTO, slug: string): Promise<AxiosResponse<ResponseOkModel<ArticleViewModel>> | AxiosError<ProblemDetails>> {
        return this.httpClient.put(`${this.resource}/${slug}`, body)
    }

    public delete(id: string): Promise<any | AxiosError<ProblemDetails>> {
        return this.httpClient.delete(`${this.resource}/${id}`)
    }

}