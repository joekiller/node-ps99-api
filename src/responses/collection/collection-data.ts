export type CollectionData<
  Collection,
  ConfigData,
  Category = string,
  ConfigName = string,
> = {
  category: Category;
  collection: Collection;
  configData: ConfigData;
  configName: ConfigName;
  dateCreated: unknown;
  dateModified: unknown;
  hash: unknown;
};
