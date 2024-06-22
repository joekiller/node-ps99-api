export type SecretRoomData = {
  category: string;
  collection: "SecretRooms";
  configData: SecretRoomConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type SecretRoomConfigData = {
  CloseDoor: any;
  DisplayName: string;
  InstanceId: string;
  RequiredZone: string;
  UnlockAnimation: any;
};

export type SeedData = {
  category: string;
  collection: "Seeds";
  configData: SeedConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type SeedConfigData = {
  Desc: string;
  DisplayName: string;
  GrowTime: number;
  Icon: string;
  LootTable: any;
  Rarity: SeedRarity;
  Stages: any[];
};

export type SeedRarity = {
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
