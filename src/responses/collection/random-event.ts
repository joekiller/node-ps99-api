import { CollectionData } from "./collection-data";

export type RandomEventData = CollectionData<
  "RandomEvents",
  RandomEventConfigData
>;

export type RandomEventConfigData = {
  AllowInZones: boolean;
  Color: string;
  Duration: number;
  Icon: string;
  BreakingRequirement: number;
  PlaytimeRequirement: number;
  Name: string;
  AllowInInstances: boolean;
  Chance: number;
  AreaWhitelist: RandomEventAreaWhitelist;
  AllowMultiple: boolean;
  MinimumZone?: number;
};

export type RandomEventAreaWhitelist = {
  Main_Magma: boolean;
  Main: boolean;
  Main_Ice: boolean;
};
