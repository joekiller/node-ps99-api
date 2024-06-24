import { CollectionData } from "./collection-data";

export type BoxData = CollectionData<"Boxes", BoxConfigData, "Boxes">;

export type BoxConfigData = {
  Rarity: BoxRarity;
  Capacity: number;
  DisplayName: string;
  Icons: BoxIcon[];
  Desc: string;
};
export type BoxIcon = {
  Color: unknown;
  Name: string;
  Icon: string;
};
export type BoxRarity = {
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
