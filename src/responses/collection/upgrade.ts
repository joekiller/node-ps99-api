export type UpgradeData = {
  category: string;
  collection: "Upgrades";
  configData: UpgradeConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type UpgradeConfigData = {
  Icon: string;
  RewardText: any;
  TierCosts: number[];
  TierCurrencies: UpgradeTierCurrency[];
  TierPowers: number[];
};

export type UpgradeTierCurrency = {
  BagTiers: UpgradeBagTier[];
  Desc: string;
  DisplayName: string;
  MaxAmount: number;
  Rarity: UpgradeRarity;
  Tiers: UpgradeTier[];
  Tradable: boolean;
  _id: string;
  _index: number;
  _script: any;
};

export type UpgradeBagTier = {
  image: string;
  value: number;
};

export type UpgradeRarity = {
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

export type UpgradeTier = {
  Order: number;
  imageOutline: string;
  isBottom: boolean;
  orbImage: string;
  rainData: UpgradeRainData;
  textColor: any;
  tierName: string;
  tinyImage: string;
  value: number;
};

export type UpgradeRainData = {
  LightEmission: number;
};
