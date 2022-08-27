import type { Axios, AxiosError, AxiosResponse } from "axios";
import ApiClient from "@/api/client/api.client";
import type { ProblemDetails } from "./model/problemDetails";
import type { ResponseOkModel } from "./model/responseOkModel";
import type { PaginationPageOptionsModel } from './model/paginationPageOptionsModel';
import type { PaginationResponseModel } from './model/paginationResponseModel';
import type { CoinViewModel } from './model/coinViewModel';


export default class CoinService {
    protected resource = 'crypto/get/coins/pagination';
    protected httpClient: Axios;

    constructor() {
        this.httpClient = ApiClient.getInstance()
    }

    public create() { }

    public get(paginationPage: PaginationPageOptionsModel):
        Promise<AxiosResponse<ResponseOkModel<PaginationResponseModel<CoinViewModel>>> | AxiosError<ProblemDetails>> {
        return this.httpClient.post(this.resource, paginationPage)
    }

}