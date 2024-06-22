export type ZoneFlagData = {
  category: string;
  collection: "ZoneFlags";
  configData: ZoneFlagConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type ZoneFlagConfigData = {
  Color: string;
  Desc: string;
  Duration: number;
  Icon: string;
  Model: any;
  Name: string;
  Rarity: ZoneFlagRarity;
};

export type ZoneFlagRarity = {
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
