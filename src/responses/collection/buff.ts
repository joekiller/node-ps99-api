import { CollectionData } from "./collection-data";

export type BuffData = CollectionData<"Buffs", BuffConfigData, "BuffData">;

export type BuffConfigData = {
  AssociatedItemClass: string;
  AssociatedItemID: string;
  DisplayName: string;
  Length: number;
  IgnoreInstancePause?: boolean;
};
