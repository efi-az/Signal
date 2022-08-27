import type { UserViewModel } from '@/api/model/userViewModel';
import { ref } from 'vue';
import type { Ref } from 'vue'
import type { AxiosResponse, AxiosError } from 'axios';
import { AuthService } from "@/api/auth.service";
import type { SendOtpDTO } from "@/api/dto/sendOtpDTO";
import type { ProblemDetails } from "@/api/model/problemDetails";
import type { CheckOtpDTO } from "@/api/dto/checkOtpDTO";
import type { ResponseOkModel } from "@/api/model/responseOkModel";
import { useUserStore } from '@/stores/user.store';
import type { PaginationMetaOptionModel } from '@/api/model/paginationMetaOptionModel';
import type { PaginationResponseModel } from '@/api/model/paginationResponseModel';
import type { UserSystemViewModel } from '@/api/model/userSystemViewModel';

export function useLoginSendOtp() {
    const isLoading: Ref<boolean> = ref(false);
    const error: Ref<AxiosError | null> = ref(null);

    const userService = new AuthService();

    function loginSendOtp(loginSendOtp: SendOtpDTO): Promise<ResponseOkModel<string> | AxiosError> {

        isLoading.value = true;

        return new Promise((resolve, reject) => {
            userService
                .sendOtp(loginSendOtp)
                .then((response:
                    | ResponseOkModel<string>
                    | AxiosError<ProblemDetails>
                ) => {
                    resolve(response);
                })
                .catch((err: AxiosError) => {
                    error.value = err;
                    reject(err);
                })
                .finally(() => {
                    isLoading.value = false;
                });
        });
    }

    return {
        isLoading,
        error,
        loginSendOtp
    };
}

export function useLoginCheckOtp() {
    const isLoading: Ref<boolean> = ref(false);
    const error: Ref<AxiosError | null> = ref(null);
    const token: Ref<string | null> = ref(null);

    const userService = new AuthService();

    function loginCheckOtp(loginCheckOtp: CheckOtpDTO): Promise<AxiosResponse<ResponseOkModel<string>> | AxiosError> {

        isLoading.value = true;

        return new Promise((resolve, reject) => {
            userService
                .checkOtp(loginCheckOtp)
                .then((response:
                    | AxiosResponse<ResponseOkModel<string>>
                    | AxiosError<ProblemDetails>
                ) => {
                    if ('data' in response) {
                        token.value = response.data.result;
                        resolve(response.data.result);
                    }
                })
                .catch((err: AxiosError) => {
                    error.value = err;
                    reject(err);
                })
                .finally(() => {
                    isLoading.value = false;
                });
        });
    }

    return {
        isLoading,
        error,
        token,
        loginCheckOtp
    };
}

export function useOAuthRequest() {
    const isLoading: Ref<boolean> = ref(false);
    const error: Ref<AxiosError | null> = ref(null);

    const userService = new AuthService();

    function oAuthRequest(): Promise<ResponseOkModel<any> | AxiosError> {

        isLoading.value = true;

        return new Promise((resolve, reject) => {
            userService
                .getOAthRequest()
                .then((response:
                    | ResponseOkModel<any>
                    | AxiosError<ProblemDetails>
                ) => {
                    resolve(response);
                }
                )
                .catch((err: AxiosError) => {
                    error.value = err;
                    reject(err);
                })
                .finally(() => {
                    isLoading.value = false;
                });
        });
    }

    return {
        isLoading,
        error,
        oAuthRequest
    };
}

export function useGetUser() {
    const isLoading: Ref<boolean> = ref(false);
    const error: Ref<AxiosError | null> = ref(null);
    const userModel: Ref<UserViewModel | null> = ref(null)

    const userService = new AuthService();

    function getUser(): Promise<AxiosResponse<ResponseOkModel<UserViewModel>> | AxiosError> {

        isLoading.value = true;

        return new Promise((resolve, reject) => {
            userService
                .getUser()
                .then((response:
                    | AxiosResponse<ResponseOkModel<UserViewModel>>
                    | AxiosError<ProblemDetails>
                ) => {
                    if ('data' in response) {
                        userModel.value = response.data.result;
                        const userStore = useUserStore()
                        userStore.setIsLoggedIn(true)
                        resolve(response.data.result);
                    }
                })
                .catch((err: AxiosError) => {
                    error.value = err;
                    reject(err);
                })
                .finally(() => {
                    isLoading.value = false;
                });
        });
    }

    return {
        isLoading,
        error,
        getUser,
        userModel
    };
}

export const useGetUserSystemList = () => {
    const isLoading = ref(false);
    const error = ref<AxiosError<ProblemDetails>>();
    const data = ref<UserSystemViewModel[]>([]);
    const meta = ref<PaginationMetaOptionModel>();

    const userService = new AuthService();

    const fetch = async (): Promise<AxiosResponse<ResponseOkModel<PaginationResponseModel<UserSystemViewModel>>> | undefined> => {

        isLoading.value = true;

        try {
            const { data: res } = (await userService.getUserSystem({ page: 1, take: 10, order: 'DESC' })) as AxiosResponse<ResponseOkModel<PaginationResponseModel<UserSystemViewModel>>>;
            data.value = res.result.data;
            meta.value = res.result.meta;
        } catch (err) {
            error.value = err as AxiosError<ProblemDetails>;
            return Promise.reject(err);
        } finally {
            isLoading.value = false;
        }
    };

    try {
        fetch();
    } catch (err: any) {
        console.log(err);
    }



    return {
        fetch,
        meta,
        data,
        error,
        isLoading,
    };
}