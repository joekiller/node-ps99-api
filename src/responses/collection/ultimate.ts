import { CollectionData } from "./collection-data";

export type UltimateData = CollectionData<"Ultimates", UltimateConfigData>;

export type UltimateConfigData = {
  Rarity: UltimateRarity;
  TierToLevel: number[];
  DisplayName: string;
  LevelToTier: number[];
  Desc: string;
  Icon: string;
  MaxTier: number;
  Cooldown: unknown;
  FFlagName: string;
  Tradable?: boolean;
  ProductId?: number;
  NotAllowedInInstances?: boolean;
};

export type UltimateRarity = {
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
