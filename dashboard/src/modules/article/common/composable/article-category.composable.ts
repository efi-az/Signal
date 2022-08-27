import type { UpdateArticleCategoryDTO } from '@/api/dto/updateArticleCategoryDTO';
import ApiFactory from "@/api/ApiFactory";
import type ArticleCategoryService from "@/api/articleCategory.service";
import type { ArticleCategoryViewModel } from "@/api/model/articleCategoryViewModel";
import type { ProblemDetails } from '@/api/model/problemDetails';
import type { ResponseOkModel } from "@/api/model/responseOkModel";
import type { AxiosError, AxiosResponse } from "axios";
import { ref } from "vue";

const articleCategoryService: ArticleCategoryService = ApiFactory.get('articleCategory');

export const useGetArticleCategoryAll = () => {
  const isLoading = ref(false);
  const error = ref<AxiosError<ProblemDetails>>();
  const data = ref<ArticleCategoryViewModel[]>([]);

  const fetch = async (): Promise<ArticleCategoryViewModel[] | undefined> => {

    isLoading.value = true;

    try {
      const { data: res } = (await articleCategoryService.getAll()) as AxiosResponse<ResponseOkModel<ArticleCategoryViewModel[]>>;
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
    data,
    isLoading,
  };
};

export const useDeleteArticleCategory = () => {
  const isLoading = ref(false);
  const error = ref<AxiosError<ProblemDetails>>();

  const fetch = async (id: string): Promise<any> => {

      isLoading.value = true;

      try {
          const { data } = (await articleCategoryService.delete(id)) as AxiosResponse<any>;
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

export const useCreateArticleCategory = () => {
  const isLoading = ref(false);
  const error = ref<AxiosError<ProblemDetails>>();

  const fetch = async (body: UpdateArticleCategoryDTO): Promise<any> => {

      isLoading.value = true;

      try {
          const { data } = (await articleCategoryService.create(body)) as AxiosResponse<any>;
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