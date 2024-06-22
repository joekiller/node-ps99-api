export type UltimateData = {
  category: string;
  collection: "Ultimates";
  configData: UltimateConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type UltimateConfigData = {
  Cooldown: any;
  Desc: string;
  DisplayName: string;
  FFlagName: string;
  Icon: string;
  LevelToTier: number[];
  MaxTier: number;
  Rarity: UltimateRarity;
  TierToLevel: number[];
  Tradable?: boolean;
  ProductId?: number;
};

export type UltimateRarity = {
  Announce: boolean;
  Color: any;
  DisplayName: string;
  Gradient: any;
  ItemSlot: any;
  Lootbag: any;
  Message: any;
  RarityNumber: number;
  _id: string;
  _script: any;
};
