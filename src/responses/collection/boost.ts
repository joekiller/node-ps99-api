import { CollectionData } from "./collection-data";

export type BoostData = CollectionData<
  "Boosts",
  BoostConfigData,
  "Boosts",
  "Boost | Friends"
>;

export type BoostConfigData = {
  DisplayName: string;
  Icon: string;
  MaximumPercent: number;
};
