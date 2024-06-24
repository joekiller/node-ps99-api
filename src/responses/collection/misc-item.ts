import { CollectionData } from "./collection-data";

export type MiscItemData = CollectionData<"MiscItems", MiscItemConfigData>;

export interface MiscItemConfigData {
  Rarity: MiscItemRarity;
  DisplayName: string;
  Category: string;
  Icon: string;
  Desc: string;
  Tradable?: boolean;
  AltIcon?: string;
}

export interface MiscItemRarity {
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
}
