import { CollectionData } from "./collection-data";

export type FishingRodData = CollectionData<
  "FishingRods",
  FishingRodConfigData
>;

export type FishingRodConfigData = {
  FishingChance: number;
  FishingOdds: [string, number][];
  FishingCurrencyMultiplier: number;
  DisplayName: string;
  LineColor: unknown;
  AssociatedItemID: string;
  Model: unknown;
  MinFishingTime: number;
  FishingGameSpeedMultiplier: number;
  Icon: string;
  BarSize: number;
  MerchantSalePrice?: number;
};
