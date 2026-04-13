import { useCallback, useEffect, useRef, useState } from "react";
import {
  type ApiErrorResponse,
  type ApiResponse,
  createSimpleApiError,
  isBadApiResponse,
  isGoodApiResponse,
} from "@/services/api/dto/api-response.dto";

interface ApiState<T> {
  data: T | null;
  error: ApiErrorResponse | null;
  loading: boolean;
}

interface UseApiReturn<T, Args extends any[]> extends ApiState<T> {
  revalidateOrExecute: (...args: Args) => Promise<ApiResponse<T>>;
}

interface UseApiConfig<Args extends any[]> {
  mode?: "write" | "read";
  initialArgs?: Args;
}

export function useApi<T, Args extends any[]>(
  apiFunc: (...args: Args) => Promise<ApiResponse<T>>,
  config: UseApiConfig<Args> = {},
): UseApiReturn<T, Args> {
  const { mode = "read", initialArgs } = config;

  const stringifiedInitialArgs = useRef<string>("");

  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const execute = useCallback(
    async (...args: Args): Promise<ApiResponse<T>> => {
      setState((prev) => ({
        data: mode === "read" ? prev.data : null,
        error: null,
        loading: true,
      }));

      try {
        const response = await apiFunc(...args);

        if (isGoodApiResponse(response)) {
          setState({ data: response.data, error: null, loading: false });
          return response;
        }

        if (isBadApiResponse(response)) {
          setState({ data: null, error: response, loading: false });
          return response;
        }

        throw new Error("Formato de resposta não reconhecido");
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Erro desconhecido");
        const apiError = createSimpleApiError(error.name, error.message);

        setState({
          data: null,
          error: apiError,
          loading: false,
        });

        return apiError;
      }
    },
    [apiFunc, mode],
  );

  /* biome-ignore lint/correctness/useExhaustiveDependencies: Aqui */
  useEffect(() => {
    const stringifiedCurrentInitialArgs = JSON.stringify(initialArgs);

    if (mode === "read" || stringifiedInitialArgs.current === stringifiedCurrentInitialArgs) {
      // Se tivermos initialArgs, espalhamos eles, senão chamamos sem nada (se Args permitir)
      const args = initialArgs || ([] as unknown as Args);
      execute(...args);

      stringifiedInitialArgs.current = stringifiedCurrentInitialArgs;
    }
    // Omitimos initialArgs da lista de dependências direta para evitar loops
    // se o usuário passar um array literal [1, 2, 3] no componente.
    // Usamos o apiFunc como gatilho principal.
  }, [mode, apiFunc, execute, stringifiedInitialArgs]);

  return { ...state, revalidateOrExecute: execute };
}
