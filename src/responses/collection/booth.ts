import { CollectionData } from "./collection-data";

export type BoothData = CollectionData<"Booths", BoothConfigData, "Booths">;

export type BoothConfigData = {
  DisplayName: string;
  Rarity: BoothRarity;
  Model: unknown;
  Icon: string;
  Desc: string;
  Hidden?: boolean;
  Tradable?: boolean;
  Callback: unknown;
  OffSale?: boolean;
  ProductId?: number;
  DiamondPrice?: number;
  Sittable?: boolean;
  RenderStepped: unknown;
};
export type BoothRarity = {
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
