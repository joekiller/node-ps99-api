export type BoxData = {
  category: "Boxes";
  collection: "Boxes";
  configData: BoxConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};
export type BoxConfigData = {
  Capacity: number;
  Desc: string;
  DisplayName: string;
  Icons: BoxIcon[];
  Rarity: BoxRarity;
};
export type BoxIcon = {
  Color: any;
  Icon: string;
  Name: string;
};
export type BoxRarity = {
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
