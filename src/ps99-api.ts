import { ApiRequestParams, RequestClient } from "./request-client/common";
import { getAxiosRequest } from "./request-client/axios";
import { CollectionsResponseBody } from "./responses/collections";
import { Collection } from "./common";
import { CollectionResponseBody } from "./responses/collection";
import { ClanResponseBody } from "./responses/clan";
import { ClansResponseBody } from "./responses/clans";
import { ClansSort, GetClansParams, SortOrder } from "./params/clans";
import { ExistsResponseBody } from "./responses/exists";
import { RAPResponseBody } from "./responses/rap";
import { ActiveClanBattleResponseBody } from "./responses/activeClanBattle";

export type PetSimulator99APIOptions = {
  requestClient?: RequestClient;
};
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
    return this.request<CollectionsResponseBody>("/api/collections");
  }

  getCollection(collection: Collection) {
    return this.request<CollectionResponseBody>(
      `/api/collection/${collection}`,
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
    return this.request<ClansResponseBody>("/api/clans", { params });
  }

  getClan(name: string) {
    return this.request<ClanResponseBody>(`/api/clan/${name}`);
  }

  getExists() {
    return this.request<ExistsResponseBody>(`/api/exists`);
  }

  getRAP() {
    return this.request<RAPResponseBody>(`/api/rap`);
  }

  getActiveClanBattle() {
    return this.request<ActiveClanBattleResponseBody>(`/api/activeClanBattle`);
  }

  getImage(rbxassetid: string) {
    if (rbxassetid.startsWith("rbxassetid://")) {
      rbxassetid = rbxassetid.slice(13);
    }
    return this.request<Blob>(`/api/image/${rbxassetid}`, {
      responseType: "arraybuffer",
      responseEncoding: "BINARY",
    });
  }
}