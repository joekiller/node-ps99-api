import { CollectionData } from "./collection-data";

export type WateringCanData = CollectionData<
  "WateringCans",
  WateringCanConfigData
>;

export type WateringCanConfigData = {
  DisplayName: string;
  AssociatedItemID: string;
  Model: unknown;
  PlantTimeMultiplier: number;
  Icon: string;
  PlantTimeMultiplierDuration: number;
};
