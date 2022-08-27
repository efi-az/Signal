import ApiFactory from "@/api/ApiFactory";
import type MarketService from "@/api/market.service";
import type { MarketViewModel } from "@/api/model/marketViewModel";
import type { PaginationMetaOptionModel } from "@/api/model/paginationMetaOptionModel";
import type { PaginationResponseModel } from "@/api/model/paginationResponseModel";
import type { ProblemDetails } from "@/api/model/problemDetails";
import type { ResponseOkModel } from "@/api/model/responseOkModel";
import type { AxiosError, AxiosResponse } from "axios";
import { ref } from "vue";

const marketService: MarketService = ApiFactory.get('market');

export const useGetMarketList = () => {
    const isLoading = ref(false);
    const error = ref<AxiosError<ProblemDetails>>();
    const data = ref<MarketViewModel[]>([]);
    const meta = ref<PaginationMetaOptionModel>();

    const fetch = async (): Promise<AxiosResponse<ResponseOkModel<PaginationResponseModel<MarketViewModel>>> | undefined> => {

        isLoading.value = true;

        try {
            const { data: res } = (await marketService.get({ page: 1, take: 10, order: 'ASC' })) as AxiosResponse<ResponseOkModel<PaginationResponseModel<MarketViewModel>>>;
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

export const useGetMarketSearchList = () => {
    const isLoading = ref(false);
    const error = ref<AxiosError<ProblemDetails>>();
    const data = ref<MarketViewModel[]>([]);

    const fetch = async (text: string): Promise<AxiosResponse<ResponseOkModel<MarketViewModel>> | undefined> => {

        isLoading.value = true;

        try {
            const { data: res } = (await marketService.getSearch(text)) as AxiosResponse<ResponseOkModel<MarketViewModel>>;
            data.value = res.result;
        } catch (err) {
            error.value = err as AxiosError<ProblemDetails>;
            return Promise.reject(err);
        } finally {
            isLoading.value = false;
        }
    };

    return {
        fetch,
        data,
        error,
        isLoading,
    };
}