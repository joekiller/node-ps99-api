export type CharmData = {
  category: "Charms";
  collection: "Charms";
  configData: CharmConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type CharmConfigData = {
  BaseTier: number;
  Icon: string;
  MaxTier: number;
  Tiers: CharmTier[];
  DiminishPowerThreshold?: number;
  Unique?: boolean;
};

export type CharmTier = {
  Desc: string;
  DisplayName: string;
  Power: number;
  Rarity: CharmRarity;
};

export type CharmRarity = {
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
