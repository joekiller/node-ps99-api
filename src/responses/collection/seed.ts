import { CollectionData } from "./collection-data";

export type SeedData = CollectionData<"Seeds", SeedConfigData>;

export type SeedConfigData = {
  Rarity: SeedRarity;
  DisplayName: string;
  Stages: any[];
  LootTable: LootTableRoot[] | LootTableRoot;
  Desc: string;
  GrowTime: number;
  Icon: string;
};

export type SeedRarity = {
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

export type LootTableRoot = {
  _caches: any[];
  entries: LootTableEntry[];
};

export interface LootTableEntry {
  Value: LootTableValue;
  Amount?: number;
  Weight: number;
}

export interface LootTableValue {
  _caches?: any[];
  entries?: LootTableValue[];
  _data?: LootTableData;
  _stackKey?: RawStackKey;
  _exactStackKey?: RawStackKey;
  _maxAmount?: number;
}

/** use {@link JSON.parse} to parse into object of type {@link LootTableData} */
export type RawStackKey = string;

export interface LootTableData {
  id: string;
  tn?: number;
  _am?: number;
}
