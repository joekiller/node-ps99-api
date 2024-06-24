import { CollectionData } from "./collection-data";

export type ZoneFlagData = CollectionData<"ZoneFlags", ZoneFlagConfigData>;

export type ZoneFlagConfigData = {
  Rarity: ZoneFlagRarity;
  Color: string;
  Duration: number;
  Desc: string;
  Name: string;
  Model: unknown;
  Icon: string;
};

export type ZoneFlagRarity = {
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
