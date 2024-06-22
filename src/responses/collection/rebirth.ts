export type RebirthData = {
  category: string;
  collection: "Rebirths";
  configData: RebirthConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type RebirthConfigData = {
  BoostDesc: string;
  DisplayName: string;
  ItemRewards: any;
  RebirthNumber: number;
  RebirthUnlocks: RebirthUnlock[];
  StrengthPowerBoost: number;
  ZoneNumberRequired: number;
  RebirthCallback: any;
  ResetZone?: string;
};

export type RebirthUnlock = {
  Desc: string;
  Icon: string;
  Title: string;
  GuiTitle?: string;
};
