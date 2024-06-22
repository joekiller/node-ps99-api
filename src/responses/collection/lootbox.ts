export type LootboxData = {
  category: string;
  collection: "Lootboxes";
  configData: LootboxConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type LootboxConfigData = {
  Desc: string;
  DisplayName: string;
  Icon: string;
  Rarity: LootboxRarity;
};

export type LootboxRarity = {
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
