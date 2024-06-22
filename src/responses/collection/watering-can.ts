export type WateringCanData = {
  category: string;
  collection: "WateringCans";
  configData: WateringCanConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type WateringCanConfigData = {
  AssociatedItemID: string;
  DisplayName: string;
  Icon: string;
  Model: any;
  PlantTimeMultiplier: number;
  PlantTimeMultiplierDuration: number;
};
