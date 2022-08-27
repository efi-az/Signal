import ApiFactory from "@/api/ApiFactory";
import type CountryService from "@/api/country.service";
import type { ArticleViewModel } from "@/api/model/articleViewModel";
import type { CountryViewModel } from "@/api/model/countryViewModel";
import type { PaginationMetaOptionModel } from "@/api/model/paginationMetaOptionModel";
import type { PaginationResponseModel } from "@/api/model/paginationResponseModel";
import type { ProblemDetails } from "@/api/model/problemDetails";
import type { ResponseOkModel } from "@/api/model/responseOkModel";
import type { AxiosError, AxiosResponse } from "axios";
import { ref } from "vue";

const countryService: CountryService = ApiFactory.get('country');

export const useGetCountry = () => {
    const isLoading = ref(false);
    const error = ref<AxiosError<ProblemDetails>>();
    const data = ref<ArticleViewModel[]>([]);
    const meta = ref<PaginationMetaOptionModel>();

    const fetch = async (): Promise<AxiosResponse<ResponseOkModel<CountryViewModel>> | undefined> => {

        isLoading.value = true;

        try {
            const { data: res } = (await countryService.get()) as AxiosResponse<ResponseOkModel<ArticleViewModel>>;
            data.value = res.result;
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