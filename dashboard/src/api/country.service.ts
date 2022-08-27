import type { Axios, AxiosError, AxiosResponse } from "axios";
import ApiClient from "./client/api.client";
import type { CountryViewModel } from "./model/countryViewModel";
import type { ProblemDetails } from "./model/problemDetails";
import type { ResponseOkModel } from "./model/responseOkModel";

export default class CountryService {
    protected resource = 'country';
    protected httpClient: Axios;

    constructor() {
        this.httpClient = ApiClient.getInstance()

    }
    public get(): Promise<AxiosResponse<ResponseOkModel<CountryViewModel>> | AxiosError<ProblemDetails>> {
        return this.httpClient.get(this.resource)
    }

}