import { CollectionData } from "./collection-data";

export type RebirthData = CollectionData<"Rebirths", RebirthConfigData>;

export type RebirthConfigData = {
  BoostDesc: string;
  DisplayName: string;
  ItemRewards: unknown;
  RebirthNumber: number;
  RebirthUnlocks: RebirthUnlock[];
  StrengthPowerBoost: number;
  ZoneNumberRequired: number;
  RebirthCallback: unknown;
  ResetZone?: string;
};

export type RebirthUnlock = {
  Desc: string;
  Icon: string;
  Title: string;
  GuiTitle?: string;
};
