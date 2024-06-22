export type EggData = {
  category: string;
  collection: "Eggs";
  configData: EggConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type EggConfigData = {
  disableGold?: boolean;
  disableModifiers?: boolean;
  disableRainbow?: boolean;
  egg: any;
  goldChance?: number;
  icon: string;
  name: string;
  pets: any[][];
  rainbowChance?: number;
  rarity?: EggRarity;
  shinyChance?: number;
  productIds?: EggProductIds;
  currency?: string;
  eggNumber?: number;
  goldenEgg: any;
  worldNumber?: number;
  giftCallback: any;
  isCustomEgg?: boolean;
  overrideCost?: number;
  bestEgg?: boolean;
};

export type EggRarity = {
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

export type EggProductIds = {
  "10 Exclusive Eggs": number;
  "100 Exclusive Eggs": number;
  "3 Exclusive Eggs": number;
  "Exclusive Egg": number;
};
