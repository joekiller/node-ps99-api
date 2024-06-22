export type MerchantData = {
  category: string;
  collection: "Merchants";
  configData: MerchantConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type MerchantConfigData = {
  DisplayName: string;
  GetOffers: any;
  MachineName: string;
  PriceMult: number;
  RefreshRate: number;
  SlotRespectLevels?: number[];
  StockRangeByRespectLevel?: number[][];
  HideNotification?: boolean;
  HideRespect?: boolean;
  IsStatic?: boolean;
};
