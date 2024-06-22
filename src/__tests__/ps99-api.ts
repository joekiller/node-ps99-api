import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import axios from "axios";
import { PetSimulator99API } from "../ps99-api";
import { getAxiosRequest } from "../request-client/axios";

jest.mock("axios");

let api: PetSimulator99API;

const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  mockedAxios.mockClear();
  mockedAxios.mockReturnValue(Promise.resolve({ data: {} }));
  api = new PetSimulator99API({ requestClient: getAxiosRequest(mockedAxios) });
});

describe("Pet Simulator Public API Tests", () => {
  test("get Collections", async () => {
    await api.getCollections();
    expect(axios).toBeCalledWith({
      method: "GET",
      params: {},
      responseEncoding: "utf8",
      responseType: "json",
      url: "https://biggamesapi.io/api/collections",
    });
  });

  test("get Collection Achievements", async () => {
    await api.getCollection("Achievements");
    expect(axios).toBeCalledWith({
      method: "GET",
      params: {},
      responseEncoding: "utf8",
      responseType: "json",
      url: "https://biggamesapi.io/api/collection/Achievements",
    });
  });

  describe("get Clans", () => {
    test("defaults", async () => {
      await api.getClans();
      expect(axios).toBeCalledWith({
        method: "GET",
        params: {
          page: 1,
          pageSize: 10,
          sort: "Points",
          sortOrder: "desc",
        },
        responseEncoding: "utf8",
        responseType: "json",
        url: "https://biggamesapi.io/api/clans",
      });
    });

    test("different options", async () => {
      await api.getClans({
        page: 1,
        pageSize: 10,
        sort: "Created",
        sortOrder: "desc",
      });
      expect(axios).toBeCalledWith({
        method: "GET",
        params: {
          page: 1,
          pageSize: 10,
          sort: "Created",
          sortOrder: "desc",
        },
        responseEncoding: "utf8",
        responseType: "json",
        url: "https://biggamesapi.io/api/clans",
      });

      await api.getClans({
        page: 2,
        sortOrder: "desc",
      });
      expect(axios).toBeCalledWith({
        method: "GET",
        params: {
          page: 2,
          pageSize: 10,
          sort: "Points",
          sortOrder: "desc",
        },
        responseEncoding: "utf8",
        responseType: "json",
        url: "https://biggamesapi.io/api/clans",
      });
    });
  });

  test("get Clan", async () => {
    await api.getClan("CAT");
    expect(axios).toBeCalledWith({
      method: "GET",
      params: {},
      responseEncoding: "utf8",
      responseType: "json",
      url: "https://biggamesapi.io/api/clan/CAT",
    });
  });

  test("get Exists", async () => {
    await api.getExists();
    expect(axios).toBeCalledWith({
      method: "GET",
      params: {},
      responseEncoding: "utf8",
      responseType: "json",
      url: "https://biggamesapi.io/api/exists",
    });
  });

  test("get RAP", async () => {
    await api.getRAP();
    expect(axios).toBeCalledWith({
      method: "GET",
      params: {},
      responseEncoding: "utf8",
      responseType: "json",
      url: "https://biggamesapi.io/api/rap",
    });
  });

  test("get ActiveClanBattle", async () => {
    await api.getActiveClanBattle();
    expect(axios).toBeCalledWith({
      method: "GET",
      params: {},
      responseEncoding: "utf8",
      responseType: "json",
      url: "https://biggamesapi.io/api/activeClanBattle",
    });
  });

  test("get Image", async () => {
    await api.getImage("14615650278");
    expect(axios).toBeCalledWith({
      method: "GET",
      params: {},
      responseEncoding: "BINARY",
      responseType: "arraybuffer",
      url: "https://biggamesapi.io/image/14615650278",
    });
    await api.getImage("rbxassetid://14976576332");
    expect(axios).toBeCalledWith({
      method: "GET",
      params: {},
      responseEncoding: "BINARY",
      responseType: "arraybuffer",
      url: "https://biggamesapi.io/image/14976576332",
    });
  });
});
