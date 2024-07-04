import { ApiRequestParams, RequestClient } from "./request-client/common";
import { getAxiosRequest } from "./request-client/axios";
import { Collection, CollectionName } from "./responses/collection";
import { ClanResponseBody } from "./responses/clan";
import { ClansResponseBody } from "./responses/clans";
import { ClansSort, GetClansParams, SortOrder } from "./params/clans";
import { ExistsResponseBody } from "./responses/exists";
import { RAPResponseBody } from "./responses/rap";
import { ActiveClanBattleResponseBody } from "./responses/activeClanBattle";

export type PetSimulator99APIOptions = {
  requestClient?: RequestClient;
};

export type ApiResponseBody<T> =
  | { status: "ok"; data: T }
  | { status: "error"; error: { message: string; ignore: boolean } };

export class PetSimulator99API {
  public requestClient: RequestClient;

  constructor(params?: PetSimulator99APIOptions) {
    this.requestClient =
      params && params.requestClient ? params.requestClient : getAxiosRequest();
  }

  private request<T>(
    path: string,
    {
      params,
      responseType,
      responseEncoding,
    }: {
      params?: Record<string, unknown>;
      responseType?: ApiRequestParams["responseType"];
      responseEncoding?: ApiRequestParams["responseEncoding"];
    } = {
      params: {},
      responseType: "json",
      responseEncoding: "utf8",
    },
  ) {
    params = params || {};
    responseType = responseType || "json";
    responseEncoding = responseEncoding || "utf8";
    return this.requestClient.send<T>({
      method: "GET",
      url: `https://biggamesapi.io${path}`,
      params,
      responseType,
      responseEncoding,
    });
  }

  getCollections() {
    return this.request<ApiResponseBody<CollectionName[]>>("/api/collections");
  }

  getCollection<C extends CollectionName>(collectionName: C) {
    return this.request<ApiResponseBody<Collection<C>[]>>(
      `/api/collection/${collectionName}`,
    );
  }

  getClans(params?: GetClansParams) {
    let page: number | undefined;
    let pageSize: number | undefined;
    let sort: ClansSort | undefined;
    let sortOrder: SortOrder | undefined;
    if (params) {
      ({ page, pageSize, sort, sortOrder } = params);
    }
    params = {
      page: page || 1,
      pageSize: pageSize || 10,
      sort: sort || "Points",
      sortOrder: sortOrder || "desc",
    };
    return this.request<ApiResponseBody<ClansResponseBody>>("/api/clans", {
      params,
    });
  }

  getClan(name: string) {
    return this.request<ApiResponseBody<ClanResponseBody>>(`/api/clan/${name}`);
  }

  getExists() {
    return this.request<ApiResponseBody<ExistsResponseBody>>(`/api/exists`);
  }

  getRAP() {
    return this.request<RAPResponseBody>(`/api/rap`);
  }

  getActiveClanBattle() {
    return this.request<ApiResponseBody<ActiveClanBattleResponseBody>>(
      `/api/activeClanBattle`,
    );
  }

  /** resolve rbxassetid:// references to image/png */
  getImage(rbxassetid: string): Promise<Blob> {
    if (rbxassetid.startsWith("rbxassetid://")) {
      rbxassetid = rbxassetid.slice(13);
    }
    return this.request<Blob>(`/image/${rbxassetid}`, {
      responseType: "arraybuffer",
      responseEncoding: "BINARY",
    });
  }
}
