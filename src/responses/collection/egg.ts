import { CollectionData } from "./collection-data";

export type EggData = CollectionData<"Eggs", EggConfigData>;

export type EggConfigData = {
  disableGold?: boolean;
  rarity?: EggRarity;
  rainbowChance?: number;
  shinyChance?: number;
  disableRainbow?: boolean;
  name: string;
  egg: unknown;
  pets: any[][];
  goldChance?: number;
  icon: string;
  disableModifiers?: boolean;
  productIds?: EggProductIds;
  goldenEgg: unknown;
  eggNumber?: number;
  currency?: string;
  worldNumber?: number;
  giftCallback: unknown;
  overrideCost?: number;
  isCustomEgg?: boolean;
  bestEgg?: boolean;
  disableShiny?: boolean;
};

export type EggRarity = {
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

export type EggProductIds = {
  "Exclusive Egg": number;
  "3 Exclusive Eggs": number;
  "100 Exclusive Eggs": number;
  "10 Exclusive Eggs": number;
};
