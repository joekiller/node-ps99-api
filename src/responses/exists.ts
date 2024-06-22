export type ExistsData = {
  category: string;
  configData: ExistsConfigData;
  value: number;
};

export type ExistsConfigData = {
  id: string;
  pt?: number;
  sh?: boolean;
};

export type ExistsResponseBody = {
  status: string;
  data: ExistsData[];
};
