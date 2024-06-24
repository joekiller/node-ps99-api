import { CollectionData } from "./collection-data";

export type CharmData = CollectionData<"Charms", CharmConfigData, "Charms">;

export type CharmConfigData = {
  BaseTier: number;
  Tiers: CharmTier[];
  MaxTier: number;
  Icon: string;
  DiminishPowerThreshold?: number;
  Unique?: boolean;
};

export type CharmTier = {
  Desc: string;
  DisplayName: string;
  Rarity: CharmRarity;
  Power: number;
};

export type CharmRarity = {
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
