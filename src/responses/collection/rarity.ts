import { CollectionData } from "./collection-data";

export type RarityData = CollectionData<"Rarity", RarityConfigData>;

export type RarityConfigData = {
  Announce: boolean;
  Color: string;
  DisplayName: string;
  Gradient: unknown;
  ItemSlot: unknown;
  Lootbag: unknown;
  Message: unknown;
  RarityNumber: number;
};
