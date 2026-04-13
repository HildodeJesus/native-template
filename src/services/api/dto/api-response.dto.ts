export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  error: {
    title: string;
    message: string;
    errors: string[];
  };
};

/* biome-ignore lint/suspicious/noExplicitAny: No uso real, não tem como ser any */
export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

export function isGoodApiResponse<T>(response: ApiResponse<T>): response is ApiSuccessResponse<T> {
  return response.success;
}

export function isBadApiResponse<T>(response: ApiResponse<T>): response is ApiErrorResponse {
  return !response.success;
}

export function isApiResponse(
  /* biome-ignore lint/suspicious/noExplicitAny: estamos validando o tipo */
  response: any,
): response is ApiErrorResponse {
  return (
    "success" in response &&
    ("data" in response ||
      ("error" in response &&
        "title" in response.error &&
        "message" in response.error &&
        "errors" in response.error &&
        Array.isArray(response.error.errors)))
  );
}
