import type {Axios, AxiosError, AxiosResponse} from "axios";
import AuthenticationClient from "@/api/client/authentication.client";
import ApiClient from "@/api/client/api.client";
import type {ProblemDetails} from "./model/problemDetails";
import type {SendOtpDTO} from "./dto/sendOtpDTO";
import type {CheckOtpDTO} from "@/api/dto/checkOtpDTO";
import type {UserViewModel} from "./model/userViewModel";
import type {UserInfoViewModel} from "./model/userInfoViewModel";
import type {CreateUserInfoDTO} from "./dto/createUserInfoDTO";
import type {ResponseOkModel} from "@/api/model/responseOkModel";
import type { PaginationPageOptionsModel } from "./model/paginationPageOptionsModel";
import type { PaginationResponseModel } from "./model/paginationResponseModel";
import type { UserSystemViewModel } from "./model/userSystemViewModel";

export class AuthService {
    resource = 'auth'
    apiClient: Axios
    authenticationClient: Axios

    constructor() {
        this.apiClient = ApiClient.getInstance();
        this.authenticationClient = AuthenticationClient.getInstance();
    }

    public sendOtp(sendOtpDto: SendOtpDTO): Promise<ResponseOkModel<string> | AxiosError<ProblemDetails>> {
        return this.authenticationClient.post(`${this.resource}/sendOtp`, sendOtpDto)
    }

    public checkOtp(checkOtpDto: CheckOtpDTO): Promise<AxiosResponse<ResponseOkModel<string>> | AxiosError<ProblemDetails>> {
        return this.authenticationClient.post(`${this.resource}/checkOtp`, checkOtpDto)
    }

    public getOAthRequest(): Promise<ResponseOkModel<any> | AxiosError<ProblemDetails>> {
        return this.apiClient.get(`${this.resource}/oauth/request`)
    }

    public getGoogleCallback(): Promise<AxiosResponse<any> | AxiosError<ProblemDetails>> {
        return this.apiClient.get(`${this.resource}/google/callback`)
    }

    public getUser(): Promise<AxiosResponse<ResponseOkModel<UserViewModel>> | AxiosError<ProblemDetails>> {
        return this.apiClient.get(`${this.resource}/user`)
    }

    public createProfile(createProfileDto: CreateUserInfoDTO): Promise<AxiosResponse<UserInfoViewModel> | AxiosError<ProblemDetails>> {
        return this.apiClient.post(`${this.resource}/user/profile`, createProfileDto)
    }

    public updateProfile(updateProfileDto: CreateUserInfoDTO): Promise<AxiosResponse<UserInfoViewModel> | AxiosError<ProblemDetails>> {
        return this.apiClient.put(`${this.resource}/user/profile`, updateProfileDto)
    }

    public getUserSystem(paginationPage: PaginationPageOptionsModel):
        Promise<AxiosResponse<ResponseOkModel<PaginationResponseModel<UserSystemViewModel>>> | AxiosError<ProblemDetails>> {
        return this.apiClient.post(`${this.resource}/user/reports`, paginationPage)
    }
}