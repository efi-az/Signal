import axios, { Axios } from "axios";
import { convertFaNumberToEnNumberInterceptor } from "@/api/client/interceptors/request.interseptor";
import { errorInterceptor } from "@/api/client/interceptors/response.interceptor";
import { useUserStore } from "@/stores/user.store";

const BASE_URL = import.meta.env.VITE_API

const userStore = useUserStore();
const token = userStore.getToken;

class ApiClient {
    static httpClient: Axios;

    static getInstance() {
        if (!this.httpClient) {
            this.httpClient = axios.create({
                baseURL: BASE_URL,
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            // this.httpClient.interceptors.request.use(convertFaNumberToEnNumberInterceptor)
            this.httpClient.interceptors.response.use((response) => response, errorInterceptor)
        }

        return this.httpClient
    }
}

export default ApiClient;