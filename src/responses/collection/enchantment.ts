export type EnchantmentData = {
  category: string;
  collection: "Enchants";
  configData: EnchantmentConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type EnchantmentConfigData = {
  BaseTier: number;
  DiminishPowerThreshold?: number;
  EmpoweredBoost?: number;
  MaxPage: number;
  MaxTier: number;
  PageIcon?: string;
  Tiers: EnchantmentTier[];
  ProductId?: number;
};

export type EnchantmentTier = {
  Desc: string;
  DisplayName: string;
  Icon: string;
  Power: number;
  Rarity: EnchantmentRarity;
};

export type EnchantmentRarity = {
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
