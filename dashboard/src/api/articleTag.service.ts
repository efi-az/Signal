import type { UpdateArticleTagDTO } from './dto/updateArticleTagDTO';
import type { CreateArticleTagDTO } from './dto/createArticleTagDTO';
import type { Axios, AxiosError, AxiosResponse } from "axios";
import ApiClient from "@/api/client/api.client";
import type { ProblemDetails } from "./model/problemDetails";
import type { ResponseOkModel } from "./model/responseOkModel";
import type { ArticleTagViewModel } from "./model/articleTagViewModel";

export default class ArticleTagService {
    protected resource = 'article/tag';
    protected httpClient: Axios;

    constructor() {
        this.httpClient = ApiClient.getInstance()
    }

    public getAll(): Promise<AxiosResponse<ResponseOkModel<ArticleTagViewModel>> | AxiosError<ProblemDetails>> {
        return this.httpClient.get(`${this.resource}/all`)
    }

    public create(body: CreateArticleTagDTO): Promise<AxiosResponse<ResponseOkModel<ArticleTagViewModel>> | AxiosError<ProblemDetails>> {
        return this.httpClient.post(this.resource, body)
    }

    public update(body: UpdateArticleTagDTO, id: string): Promise<AxiosResponse<ResponseOkModel<ArticleTagViewModel>> | AxiosError<ProblemDetails>> {
        return this.httpClient.put(this.resource, body)
    }

    public delete(id: string): Promise<any | AxiosError<ProblemDetails>> {
        return this.httpClient.delete(`${this.resource}/${id}`)
    }

}