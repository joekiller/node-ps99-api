export type BoothData = {
  category: "Booths";
  collection: "Booths";
  configData: BoothConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};
export type BoothConfigData = {
  Desc: string;
  DisplayName: string;
  Icon: string;
  Model: any;
  Rarity: BoothRarity;
  Hidden?: boolean;
  Tradable?: boolean;
  Callback: any;
  OffSale?: boolean;
  ProductId?: number;
  DiamondPrice?: number;
  Sittable?: boolean;
  RenderStepped: any;
};
export type BoothRarity = {
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
