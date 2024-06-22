export type FishingRodData = {
  category: string;
  collection: "FishingRods";
  configData: FishingRodConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type FishingRodConfigData = {
  AssociatedItemID: string;
  BarSize: number;
  DisplayName: string;
  FishingChance: number;
  FishingCurrencyMultiplier: number;
  FishingGameSpeedMultiplier: number;
  FishingOdds: [string, number][];
  Icon: string;
  LineColor: any;
  MinFishingTime: number;
  Model: any;
  MerchantSalePrice?: number;
};
