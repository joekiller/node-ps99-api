export type ExistsData = {
  category: string;
  configData: ExistsConfigData;
  value: number;
};

export type ExistsConfigData = {
  id: string;
  /** for pets pt=1 is golden, p2=2 is rainbow */
  pt?: number;
  /** for pets sh is shiny */
  sh?: boolean;
};

export type ExistsResponseBody = {
  status: string;
  data: ExistsData[];
};
