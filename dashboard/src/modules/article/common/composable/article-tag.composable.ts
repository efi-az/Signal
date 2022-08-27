import ApiFactory from "@/api/ApiFactory";
import type { ArticleTagViewModel } from "@/api/model/articleTagViewModel";
import type ArticleTagService from "@/api/articleTag.service";
import type { ProblemDetails } from '@/api/model/problemDetails';
import type { ResponseOkModel } from "@/api/model/responseOkModel";
import type { AxiosError, AxiosResponse } from "axios";
import { ref } from "vue";
import type { UpdateArticleTagDTO } from "@/api/dto/updateArticleTagDTO";
import type { CreateArticleTagDTO } from "@/api/dto/createArticleTagDTO";

const articleTagService: ArticleTagService = ApiFactory.get('articleTag');

export const useGetAllArticleTag = () => {
  const isLoading = ref(false);
  const error = ref<AxiosError<ProblemDetails>>();
  const data = ref<ArticleTagViewModel[]>([]);

  const fetch = async (): Promise<ArticleTagViewModel[] | undefined> => {

    isLoading.value = true;

    try {
      const { data: res } = (await articleTagService.getAll()) as AxiosResponse<ResponseOkModel<ArticleTagViewModel[]>>;
      data.value = res.result as ArticleTagViewModel[]
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
    data,
    isLoading,
  };
};

export const useDeleteArticleTag = () => {
  const isLoading = ref(false);
  const error = ref<AxiosError<ProblemDetails>>();

  const fetch = async (id: string): Promise<any> => {

      isLoading.value = true;

      try {
          const { data } = (await articleTagService.delete(id)) as AxiosResponse<any>;
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

export const useCreateArticleTag = () => {
  const isLoading = ref(false);
  const error = ref<AxiosError<ProblemDetails>>();

  const fetch = async (body: CreateArticleTagDTO): Promise<any> => {

      isLoading.value = true;

      try {
          const { data } = (await articleTagService.create(body)) as AxiosResponse<ResponseOkModel<ArticleTagViewModel>>;
          return data.result as AxiosResponse<ResponseOkModel<ArticleTagViewModel>>;
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