import { CollectionData } from "./collection-data";

export type CurrencyData = CollectionData<
  "Currency",
  CurrencyConfigData,
  "Currency"
>;

export type CurrencyConfigData = {
  Rarity: CurrencyRarity;
  Tradable: boolean;
  Tiers: CurrencyTier[];
  DisplayName: string;
  _index: number;
  IsWorldCurrency?: boolean;
  Desc: string;
  BagTiers?: CurrencyBagTier[];
  MaxAmount: number;
  PermitAutoLootScaling?: boolean;
};

export type CurrencyBagTier = {
  value: number;
  image: string;
};

export type CurrencyRarity = {
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

export type CurrencyTier = {
  orbImage: string;
  imageOutline: string;
  isBottom?: boolean;
  Order: number;
  rainData?: CurrencyRainData;
  value: number;
  tinyImage: string;
  tierName: string;
  textColor: unknown;
};

export type CurrencyRainData = {
  LightEmission: number;
};
