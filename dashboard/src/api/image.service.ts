import type { Axios, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import ApiClient from "./client/api.client";
import type { ImageViewModel } from "./model/imageViewModel";
import type { ProblemDetails } from "./model/problemDetails";
import type { ResponseOkModel } from "./model/responseOkModel";

export default class ImageService {
    protected httpClient: Axios

    constructor(private resource: string) {
        this.httpClient = ApiClient.getInstance()
    }

    public create(body: FormData): Promise<AxiosResponse<ResponseOkModel<ImageViewModel>> | AxiosError<ProblemDetails>> {
        return this.httpClient.post(this.resource, body)
    }

    public delete(id: string): Promise<AxiosResponse<ResponseOkModel<any>> | AxiosError<ProblemDetails>> {
        return this.httpClient.put(`${this.resource}/${id}`)
    }

    public get(id: string): Promise<AxiosResponse<ResponseOkModel<any>> | AxiosError<ProblemDetails>> {
        return this.httpClient.get(`${this.resource}/${id}`)
    }
}