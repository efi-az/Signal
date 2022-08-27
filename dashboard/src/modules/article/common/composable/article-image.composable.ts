import ImageService from "@/api/image.service";
import type { ImageViewModel } from "@/api/model/imageViewModel";
import type { ProblemDetails } from "@/api/model/problemDetails";
import type { ResponseOkModel } from "@/api/model/responseOkModel";
import type { AxiosError, AxiosResponse } from "axios";
import { ref } from "vue";

export const useCreateArticleImage = (url: string) => {
    const isLoading = ref(false);
    const error = ref<AxiosError<ProblemDetails>>();

    const imageService = new ImageService(url);

    const fetch = async (body: FormData): Promise<any> => {

        isLoading.value = true;

        try {
            const { data } = (await imageService.create(body)) as AxiosResponse<ResponseOkModel<ImageViewModel>>;
            return data.result as AxiosResponse<ResponseOkModel<ImageViewModel>>;
        } catch (err) {
            error.value = err as AxiosError<ProblemDetails>;
            return Promise.reject(err);
        } finally {
            isLoading.value = false;
        }
    };

    return {
        fetch,
        error,
        isLoading,
    };
}

export const useDeleteArticleImage = (url: string) => {
    const isLoading = ref(false);
    const error = ref<AxiosError<ProblemDetails>>();

    const imageService = new ImageService(url);

    const fetch = async (id: string): Promise<any> => {

        isLoading.value = true;

        try {
            const { data } = (await imageService.delete(id)) as AxiosResponse<ResponseOkModel<any>>;
            return data.result as AxiosResponse<ResponseOkModel<any>>;
        } catch (err) {
            error.value = err as AxiosError<ProblemDetails>;
            return Promise.reject(err);
        } finally {
            isLoading.value = false;
        }
    };

    return {
        fetch,
        error,
        isLoading,
    };
}

export const useGetArticleImage = (url: string) => {
    const isLoading = ref(false);
    const error = ref<AxiosError<ProblemDetails>>();

    const imageService = new ImageService(url);

    const fetch = async (id: string): Promise<any> => {

        isLoading.value = true;

        try {
            const { data: res } = (await imageService.get(id)) as AxiosResponse<ResponseOkModel<any>>;
            return res.result as AxiosResponse<ResponseOkModel<any>>;
        } catch (err) {
            error.value = err as AxiosError<ProblemDetails>;
            return Promise.reject(err);
        } finally {
            isLoading.value = false;
        }
    };

    return {
        fetch,
        error,
        isLoading,
    };
}