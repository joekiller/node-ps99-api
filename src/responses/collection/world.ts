import { CollectionData } from "./collection-data";

export type WorldData = CollectionData<"Worlds", WorldConfigData>;

export type WorldConfigData = {
  SpawnId: string;
  FallbackSpawnLocation: unknown;
  Lighting: unknown;
  PlaceId: number;
  MapName: string;
  WorldCurrency: string;
  WorldNumber: number;
  AdditionalMusic?: string[];
};
