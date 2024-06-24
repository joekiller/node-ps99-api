import { CollectionData } from "./collection-data";

export type MerchantData = CollectionData<"Merchants", MerchantConfigData>;

export type MerchantConfigData = {
  PriceMult: number;
  GetOffers: unknown;
  DisplayName: string;
  StockRangeByRespectLevel?: number[][];
  MachineName: string;
  SlotRespectLevels?: number[];
  RefreshRate: number;
  HideNotification?: boolean;
  HideRespect?: boolean;
  IsStatic?: boolean;
};
