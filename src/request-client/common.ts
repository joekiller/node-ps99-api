export type ApiRequestParams = {
  method: "GET" | "POST" | "DELETE" | "PATCH";
  url: string;
  params?: { [key: string]: any };
  data?: { [key: string]: any };
  headers?: { [key: string]: any };
  responseType?: "json" | "arraybuffer";
  responseEncoding?: "utf8" | "BINARY";
};

export type RequestClient = {
  send<T>(options: ApiRequestParams): Promise<T>;
};
