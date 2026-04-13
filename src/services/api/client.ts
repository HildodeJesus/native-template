import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { appConfig } from "@/lib/config";
import { logger } from "@/lib/logger";
import {
  type ApiErrorResponse,
  isApiResponse,
  isBadApiResponse,
} from "@/services/api/dto/api-response.dto";

export class ApiClient {
  protected api: AxiosInstance = axios.create({
    baseURL: appConfig.baseApiUrl,
    withCredentials: false,
    timeout: 30000,
  });

  constructor() {
    this.api.interceptors.request.use(this.requestInterceptor);
    this.api.interceptors.response.use(this.responseInterceptor, this.errorInterceptor);
  }

  private requestInterceptor = async (config: InternalAxiosRequestConfig<any>) => {
    return config;
  };

  private responseInterceptor = (response: AxiosResponse<any, any>) => {
    return response;
  };

  private errorInterceptor = async (error: AxiosError): Promise<ApiErrorResponse> => {
    let handledError: ApiErrorResponse;
    let isLogged = true;

    if (
      error.response?.data &&
      isApiResponse(error.response.data) &&
      isBadApiResponse(error.response.data)
    )
      handledError = error.response.data;
    else if (error.status === 403 || error.status === 401) {
      isLogged = false;

      handledError = {
        success: false,
        error: {
          message: "Acesso negado. Por favor, faça login novamente.",
          title: "Acesso Negado",
          errors: [],
        },
      };
    } else if (error.response?.data instanceof Error) {
      handledError = {
        success: false,
        error: {
          message: error.message,
          title: error.name,
          errors: [],
        },
      };
    } else {
      handledError = {
        success: false,
        error: {
          message: "Erro desconhecido na chamada a api",
          title: "Erro desconhecido",
          errors: [],
        },
      };
    }

    if (isLogged)
      logger.error("api-client:interceptor", handledError, {
        ...(error.config?.baseURL && { baseURL: error.config?.baseURL }),
        ...(error.config?.url && { url: error.config?.url }),
        ...(error.config?.params && { params: error.config?.params }),
      });

    return handledError;
  };
}
