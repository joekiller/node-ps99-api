export type PotionData = {
  category: string;
  collection: "Potions";
  configData: PotionConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type PotionConfigData = {
  BaseTier: number;
  MaxTier: number;
  PrimaryColor: string;
  SecondaryColor: string;
  Tiers: PotionTier[];
};

export type PotionTier = {
  Desc: string;
  DisplayName: string;
  Icon: string;
  Power: number;
  Rarity: PotionRarity;
  Time: number;
};

export type PotionRarity = {
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
