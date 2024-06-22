export type BuffData = {
  category: "Buffs";
  collection: "Buffs";
  configData: BuffConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};
export type BuffConfigData = {
  AssociatedItemClass: string;
  AssociatedItemID: string;
  DisplayName: string;
  Length: number;
  IgnoreInstancePause?: boolean;
};
