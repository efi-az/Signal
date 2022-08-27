import type { Axios, AxiosError, AxiosResponse } from "axios";
import ApiClient from "./client/api.client";
import type { CreateSignalDTO, CreateSignalParamDTO } from "./dto/createSignalDTO";
import type { PaginationPageOptionsModel } from "./model/paginationPageOptionsModel";
import type { PaginationResponseModel } from "./model/paginationResponseModel";
import type { ProblemDetails } from "./model/problemDetails";
import type { ResponseOkModel } from "./model/responseOkModel";
import type { SignalViewModel } from "./model/signalViewModel";

export default class SignalService {
    protected resource = 'signal';
    protected httpClient: Axios;

    constructor() {
        this.httpClient = ApiClient.getInstance()
    }

    public create(body: CreateSignalDTO, params: CreateSignalParamDTO): Promise<AxiosResponse<ResponseOkModel<SignalViewModel>> | AxiosError<ProblemDetails>> {
        return this.httpClient.post(this.resource, body, { params })
    }

    public get(paginationPage: PaginationPageOptionsModel):
        Promise<AxiosResponse<ResponseOkModel<PaginationResponseModel<SignalViewModel>>> | AxiosError<ProblemDetails>> {
        return this.httpClient.post(`${this.resource}/pagination`, paginationPage)
    }
}