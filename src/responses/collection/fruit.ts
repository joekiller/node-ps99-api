export type FruitData = {
  category: string;
  collection: "Fruits";
  configData: FruitConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type FruitConfigData = {
  Boost: FruitBoost[];
  Desc?: string;
  DisplayName: string;
  Duration: number;
  Icon: string;
  IgnoreFruitMachine?: boolean;
  Rarity: FruitRarity;
};

export type FruitBoost = {
  Amount: number;
  Type: string;
};

export type FruitRarity = {
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
