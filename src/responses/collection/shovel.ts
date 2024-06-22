export type ShovelData = {
  category: string;
  collection: "Shovels";
  configData: ShovelConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type ShovelConfigData = {
  AssociatedItemID: string;
  Desc: string;
  DisplayName: string;
  Icon: string;
  Model: any;
  MerchantSalePrice?: number;
};
