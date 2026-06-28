import { CollectionData } from "./collection-data";

export type CardItemData = CollectionData<"CardItems", CardItemConfigData>;

export interface CardItemConfigData {
  DisplayName: string;
  Desc: string;
  Icon: string;
  GoldIcon?: string;
  Rarity: CardItemRarity;
  AssociatedPetId: string;
  Tradable?: boolean;
  titanic?: boolean;
}

export interface CardItemRarity {
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
