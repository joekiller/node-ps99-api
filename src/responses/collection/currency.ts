export type CurrencyData = {
  category: "Currency";
  collection: "Currency";
  configData: CurrencyConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type CurrencyConfigData = {
  BagTiers?: CurrencyBagTier[];
  Desc: string;
  DisplayName: string;
  IsWorldCurrency?: boolean;
  MaxAmount: number;
  Rarity: CurrencyRarity;
  Tiers: CurrencyTier[];
  Tradable: boolean;
  _index: number;
  PermitAutoLootScaling?: boolean;
};

export type CurrencyBagTier = {
  image: string;
  value: number;
};

export type CurrencyRarity = {
  Announce: boolean;
  Color: any;
  DisplayName: string;
  Gradient: any;
  ItemSlot: any;
  Lootbag: any;
  Message: any;
  RarityNumber: number;
  _id: string;
  _script: any;
};

export type CurrencyTier = {
  Order: number;
  imageOutline: string;
  isBottom?: boolean;
  orbImage: string;
  rainData?: CurrencyRainData;
  textColor: any;
  tierName: string;
  tinyImage: string;
  value: number;
};

export type CurrencyRainData = {
  LightEmission: number;
};
