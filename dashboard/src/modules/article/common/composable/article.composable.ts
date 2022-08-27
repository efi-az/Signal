import type { PaginationMetaOptionModel } from '@/api/model/paginationMetaOptionModel';
import ApiFactory from "@/api/ApiFactory";
import type ArticleService from "@/api/article.service";
import type { UpdateArticleDTO } from "@/api/dto/updateArticleDTO";
import type { ArticleViewModel } from "@/api/model/articleViewModel";
import type { PaginationResponseModel } from "@/api/model/paginationResponseModel";
import type { ProblemDetails } from "@/api/model/problemDetails";
import type { ResponseOkModel } from "@/api/model/responseOkModel";
import type { AxiosError, AxiosResponse } from "axios";
import { ref } from "vue";

const articleService: ArticleService = ApiFactory.get('article');

export const useGetArticleList = () => {
    const isLoading = ref(false);
    const error = ref<AxiosError<ProblemDetails>>();
    const data = ref<ArticleViewModel[]>([]);
    const meta = ref<PaginationMetaOptionModel>();

    const fetch = async (): Promise<AxiosResponse<ResponseOkModel<PaginationResponseModel<ArticleViewModel>>> | undefined> => {

        isLoading.value = true;

        try {
            const { data: res } = (await articleService.get({ page: 1, take: 10, order: 'ASC' })) as AxiosResponse<ResponseOkModel<PaginationResponseModel<ArticleViewModel>>>;
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

export const useGetByIdArticle = () => {
    const isLoading = ref(false);
    const error = ref<AxiosError<ProblemDetails>>();
    const data = ref<ArticleViewModel>([]);

    const fetch = async (id: string): Promise<AxiosResponse<ResponseOkModel<ArticleViewModel>> | undefined> => {

        isLoading.value = true;

        try {
            const { data: res } = (await articleService.getById(id)) as AxiosResponse<ResponseOkModel<ArticleViewModel>>;
            data.value = res.result as ArticleViewModel;
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

export const useCreateArticle = () => {
    const isLoading = ref(false);
    const error = ref<AxiosError<ProblemDetails>>();

    const fetch = async (body: UpdateArticleDTO): Promise<any> => {

        isLoading.value = true;

        try {
            const { data } = (await articleService.create(body)) as AxiosResponse<any>;
            return data as AxiosResponse<any>;
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

export const useDeleteArticle = () => {
    const isLoading = ref(false);
    const error = ref<AxiosError<ProblemDetails>>();

    const fetch = async (id: string): Promise<any> => {

        isLoading.value = true;

        try {
            const { data } = (await articleService.delete(id)) as AxiosResponse<any>;
            return data as AxiosResponse<any>;
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

export const useUpdateArticle = () => {
    const isLoading = ref(false);
    const error = ref<AxiosError<ProblemDetails>>();

    const fetch = async (body: UpdateArticleDTO, slug: string): Promise<any> => {

        isLoading.value = true;

        try {
            const { data } = (await articleService.update(body, slug)) as AxiosResponse<any>;
            return data as AxiosResponse<any>;
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