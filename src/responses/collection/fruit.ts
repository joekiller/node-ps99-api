import { CollectionData } from "./collection-data";

export type FruitData = CollectionData<"Fruits", FruitConfigData>;

export type FruitConfigData = {
  Rarity: FruitRarity;
  Duration: number;
  DisplayName: string;
  IgnoreFruitMachine?: boolean;
  Desc?: string;
  Icon: string;
  Boost: FruitBoost[];
};

export type FruitBoost = {
  Amount: number;
  Type: string;
};

export type FruitRarity = {
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
