import { CollectionData } from "./collection-data";

export type ShovelData = CollectionData<"Shovels", ShovelConfigData>;

export type ShovelConfigData = {
  AssociatedItemID: string;
  DisplayName: string;
  Model: unknown;
  Icon: string;
  Desc: string;
  MerchantSalePrice?: number;
};
