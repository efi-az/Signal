import ApiFactory from "@/api/ApiFactory";
import type { CreateSignalDTO, CreateSignalParamDTO } from "@/api/dto/createSignalDTO";
import type { ProblemDetails } from "@/api/model/problemDetails";
import type SignalService from "@/api/signal.service";
import type { AxiosError, AxiosResponse } from "axios";
import { ref } from "vue";

const signalService: SignalService = ApiFactory.get('signal');

export const useCreateSignal = () => {
    const isLoading = ref(false);
    const error = ref<AxiosError<ProblemDetails>>();

    const fetch = async (body: CreateSignalDTO, params: CreateSignalParamDTO): Promise<any> => {

        isLoading.value = true;

        try {
            const { data } = (await signalService.create(body, params)) as AxiosResponse<any>;
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