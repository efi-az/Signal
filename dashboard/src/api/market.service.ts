import type { Axios, AxiosError, AxiosResponse } from "axios";
import ApiClient from "./client/api.client";
import type { MarketViewModel } from "./model/marketViewModel";
import type { PaginationPageOptionsModel } from "./model/paginationPageOptionsModel";
import type { PaginationResponseModel } from "./model/paginationResponseModel";
import type { ProblemDetails } from "./model/problemDetails";
import type { ResponseOkModel } from "./model/responseOkModel";

export default class MarketService {
    protected resource = 'crypto/market';
    protected httpClient: Axios;

    constructor() {
        this.httpClient = ApiClient.getInstance()
    }

    public get(paginationPage: PaginationPageOptionsModel):
        Promise<AxiosResponse<ResponseOkModel<PaginationResponseModel<MarketViewModel>>> | AxiosError<ProblemDetails>> {
        return this.httpClient.post(`${this.resource}/pagination`, paginationPage)
    }

    public getSearch(text: string):
        Promise<AxiosResponse<ResponseOkModel<MarketViewModel>> | AxiosError<ProblemDetails>> {
        return this.httpClient.get(`${this.resource}/search/${text}`)
    }
}