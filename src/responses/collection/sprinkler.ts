export type SprinklerData = {
  category: string;
  collection: "Sprinklers";
  configData: SprinklerConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type SprinklerConfigData = {
  Color: string;
  Desc: string;
  Duration: number;
  Icon: string;
  Model: any;
  Name: string;
  Rarity: SprinklerRarity;
};

export type SprinklerRarity = {
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
