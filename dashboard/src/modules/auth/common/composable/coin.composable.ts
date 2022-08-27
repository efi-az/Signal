import ApiFactory from "@/api/ApiFactory";
import type CoinService from "@/api/coin.service";
import type { CoinViewModel } from "@/api/model/coinViewModel";
import type { PaginationMetaOptionModel } from "@/api/model/paginationMetaOptionModel";
import type { PaginationResponseModel } from "@/api/model/paginationResponseModel";
import type { ProblemDetails } from "@/api/model/problemDetails";
import type { ResponseOkModel } from "@/api/model/responseOkModel";
import type { AxiosError, AxiosResponse } from "axios";
import { ref } from "vue";
import { io } from "socket.io-client";

const coinService: CoinService = ApiFactory.get('coin');

export const useCoinSocket = () => {
    const socket = io('ws://192.168.92.193:4000')
    return {
        socket,
    }
};

export const useGetCoinList = () => {
    const isLoading = ref(false);
    const error = ref<AxiosError<ProblemDetails>>();
    const data = ref<CoinViewModel[]>([]);
    const meta = ref<PaginationMetaOptionModel>();

    const fetch = async (): Promise<AxiosResponse<ResponseOkModel<PaginationResponseModel<CoinViewModel>>> | undefined> => {

        isLoading.value = true;

        try {
            const { data: res } = (await coinService.get({ page: 1, take: 10, order: 'ASC' })) as AxiosResponse<ResponseOkModel<PaginationResponseModel<CoinViewModel>>>;
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