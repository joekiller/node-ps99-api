import { CollectionData } from "./collection-data";

export type XPPotionData = CollectionData<"XPPotions", XPPotionConfigData>;

export type XPPotionConfigData = {
  Rarity: XPPotionRarity;
  DisplayName: string;
  Amount: number;
  Desc: string;
  Recipe: unknown;
  Icon: string;
  ItemId: string;
};

export type XPPotionRarity = {
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
