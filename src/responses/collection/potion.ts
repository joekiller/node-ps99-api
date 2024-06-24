import { CollectionData } from "./collection-data";

export type PotionData = CollectionData<"Potions", PotionConfigData>;

export type PotionConfigData = {
  Tiers: PotionTier[];
  PrimaryColor: string;
  MaxTier: number;
  SecondaryColor: string;
  BaseTier: number;
};

export type PotionTier = {
  Rarity: PotionRarity;
  Power: number;
  Desc: string;
  Time: number;
  Icon: string;
  DisplayName: string;
};

export type PotionRarity = {
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
