import { CollectionData } from "./collection-data";

export type SprinklerData = CollectionData<"Sprinklers", SprinklerConfigData>;

export type SprinklerConfigData = {
  Rarity: SprinklerRarity;
  Color: string;
  Duration: number;
  Desc: string;
  Name: string;
  Model: unknown;
  Icon: string;
};

export type SprinklerRarity = {
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
