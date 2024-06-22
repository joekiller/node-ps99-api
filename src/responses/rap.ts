export type RapData = {
  category: string;
  configData: RapConfigData;
  value: number;
};

export type RapConfigData = {
  id: string;
  pt?: number;
  sh?: boolean;
  tn?: number;
};

export type RAPResponseBody = {
  status: string;
  data: RapData[];
};
