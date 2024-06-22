export type MiscItemData = {
  category: string;
  collection: "MiscItems";
  configData: MiscItemConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type MiscItemConfigData = {
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
