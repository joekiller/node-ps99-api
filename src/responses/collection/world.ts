export type WorldData = {
  category: string;
  collection: "Worlds";
  configData: WorldConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type WorldConfigData = {
  FallbackSpawnLocation: any;
  Lighting: any;
  MapName: string;
  PlaceId: number;
  SpawnId: string;
  WorldCurrency: string;
  WorldNumber: number;
  AdditionalMusic?: string[];
};
