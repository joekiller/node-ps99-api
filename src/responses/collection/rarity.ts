export type RarityData = {
  category: string;
  collection: "Rarity";
  configData: RarityConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type RarityConfigData = {
  Announce: boolean;
  Color: string;
  DisplayName: string;
  Gradient: any;
  ItemSlot: any;
  Lootbag: any;
  Message: any;
  RarityNumber: number;
};
