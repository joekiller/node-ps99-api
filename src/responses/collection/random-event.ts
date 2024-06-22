export type RandomEventData = {
  category: string;
  collection: "RandomEvents";
  configData: RandomEventConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type RandomEventConfigData = {
  AllowInInstances: boolean;
  AllowInZones: boolean;
  AllowMultiple: boolean;
  AreaWhitelist: RandomEventAreaWhitelist;
  BreakingRequirement: number;
  Chance: number;
  Color: string;
  Duration: number;
  Icon: string;
  Name: string;
  PlaytimeRequirement: number;
  MinimumZone?: number;
};

export type RandomEventAreaWhitelist = {
  Main: boolean;
  Main_Ice: boolean;
  Main_Magma: boolean;
};
