import axios, { AxiosInstance, AxiosError } from "axios";
import { ApiRequestParams, RequestClient } from "./common";

export function getAxiosRequest(instance?: AxiosInstance): RequestClient {
  return {
    async send<T>(options: ApiRequestParams) {
      try {
        const { data } = await (instance ? instance(options) : axios(options));
        console.log(`[ps99-api] Axios response for ${options.url}:`, data, "Type:", typeof data, "IsArrayBuffer:", data instanceof ArrayBuffer);
        return data as T;
      } catch (e: unknown) {
        if (isAxiosError<{ message?: string }>(e)) {
          const message: string = e?.response?.data?.message || e.message;
          const newError = new Error(`${options.method} ${options.url}: ${message}`);
          // Attach original response/status for consumers
          (newError as any).response = e.response;
          (newError as any).status = e.response?.status;
          throw newError;
        }

        throw e;
      }
    },
  };
}

function isAxiosError<TResponse>(
  err: unknown | AxiosError<TResponse>,
): err is AxiosError<TResponse> {
  return Object.prototype.hasOwnProperty.call(err, "isAxiosError");
}
