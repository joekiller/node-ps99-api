import { CollectionData } from "./collection-data";

export type EnchantmentData = CollectionData<"Enchants", EnchantmentConfigData>;

export type EnchantmentConfigData = {
  PageIcon?: string;
  DiminishPowerThreshold?: number;
  Tiers: EnchantmentTier[];
  BaseTier: number;
  MaxTier: number;
  MaxPage: number;
  EmpoweredBoost?: number;
  ProductId?: number;
};

export type EnchantmentTier = {
  Rarity: EnchantmentRarity;
  Power: number;
  Desc: string;
  Icon: string;
  DisplayName: string;
};

export type EnchantmentRarity = {
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
