import { CollectionData } from "./collection-data";

export type LootboxData = CollectionData<"Lootboxes", LootboxConfigData>;

export type LootboxConfigData = {
  Rarity: LootboxRarity;
  DisplayName: string;
  Icon: string;
  Desc: string;
};

export type LootboxRarity = {
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
