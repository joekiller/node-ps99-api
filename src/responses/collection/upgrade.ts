import { CollectionData } from "./collection-data";

export type UpgradeData = CollectionData<"Upgrades", UpgradeConfigData>;

export type UpgradeConfigData = {
  RewardText: unknown;
  TierPowers: number[];
  Icon: string;
  TierCurrencies: UpgradeTierCurrency[];
  TierCosts: number[];
};

export type UpgradeTierCurrency = {
  Rarity: UpgradeRarity;
  Tradable: boolean;
  Tiers: UpgradeTier[];
  DisplayName: string;
  _script: unknown;
  _index: number;
  _id: string;
  MaxAmount: number;
  BagTiers: UpgradeBagTier[];
  Desc: string;
};

export type UpgradeBagTier = {
  value: number;
  image: string;
};

export type UpgradeRarity = {
  RarityNumber: number;
  Lootbag: unknown;
  _id: string;
  Color: unknown;
  DisplayName: string;
  Message: unknown;
  ItemSlot: unknown;
  Gradient: unknown;
  Announce: boolean;
  _script: unknown;
};

export type UpgradeTier = {
  orbImage: string;
  imageOutline: string;
  isBottom: boolean;
  Order: number;
  rainData: UpgradeRainData;
  value: number;
  tinyImage: string;
  tierName: string;
  textColor: unknown;
};

export type UpgradeRainData = {
  LightEmission: number;
};
