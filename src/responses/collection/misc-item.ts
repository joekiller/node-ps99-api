export type MiscItemData = {
  category: string;
  collection: "MiscItems";
  configData: MiscItemConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export interface MiscItemConfigData {
  Rarity: MiscItem;
  DisplayName: string;
  Category: string;
  Icon: string;
  Desc: string;
  Tradable?: boolean;
  AltIcon?: string;
}

export interface MiscItem {
  RarityNumber: number;
  Lootbag: any;
  _id: string;
  Color: any;
  DisplayName: string;
  Message: any;
  ItemSlot: any;
  Gradient: any;
  Announce: boolean;
  _script: any;
}
