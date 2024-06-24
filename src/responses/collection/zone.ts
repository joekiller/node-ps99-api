import { CollectionData } from "./collection-data";

export type ZoneData = CollectionData<"Zones", ZoneConfigData>;

export type ZoneConfigData = {
  ZoneName: string;
  Ambience?: ZoneAmbience;
  Price?: number;
  Currency: string;
  GateHealth?: number;
  ZoneNumber: number;
  Breakables: ZoneBreakables;
  MaximumAvailableEgg: number;
  WorldNumber: number;
  ZoneFolder: unknown;
  ExtraDropTable: unknown;
  Lighting?: ZoneLighting;
  Chests: unknown;
  RenderAdditionalZones?: number[];
  CannonGroupId?: number;
  QuestsRequired?: ZoneQuestsRequired[];
  LinkedOwnership?: string;
  TeleportToZoneOnFall?: boolean;
};

export type ZoneAmbience = {
  SoundId: string;
};

export type ZoneBreakables = { [key: string]: ZoneDataAndSettings };

export type ZoneDataAndSettings = {
  Data: ZoneTypeData[];
  Settings: ZoneSettings;
};

export type ZoneTypeData = {
  Type: string;
  Weight: number;
  WorldNumber?: number;
  ZoneNumber?: number;
};

export type ZoneSettings = {
  Maximum: number;
  RandomDiamondBreakables?: boolean;
  RespawnTime: number;
  DaycareIgnore?: boolean;
  Requirement?: unknown;
};

export type ZoneLighting = {
  Ambient: unknown;
  Atmosphere: ZoneAtmosphere;
  Bloom: ZoneBloom;
  Brightness: number;
  ClockTime: number;
  ColorCorrection: ZoneColorCorrection;
  ColorShift_Bottom: unknown;
  ColorShift_Top: unknown;
  EnvironmentDiffuseScale: number;
  EnvironmentSpecularScale: number;
  ExposureCompensation: number;
  FogColor: unknown;
  FogEnd: number;
  FogStart: number;
  GeographicLatitude: number;
  OutdoorAmbient: unknown;
  ShadowSoftness: number;
  Sky: ZoneSky;
};

export type ZoneAtmosphere = {
  Color: unknown;
  Decay: unknown;
  Density: number;
  Glare: number;
  Haze: number;
  Offset: number;
};

export type ZoneBloom = {
  Enabled: boolean;
  Intensity: number;
  Size: number;
  Threshold: number;
};

export type ZoneColorCorrection = {
  Brightness: number;
  Contrast: number;
  Enabled: boolean;
  Saturation: number;
  TintColor: unknown;
};

export type ZoneSky = {
  CelestialBodiesShown: boolean;
  MoonAngularSize: number;
  MoonTextureId: string;
  SkyboxBk: string;
  SkyboxDn: string;
  SkyboxFt: string;
  SkyboxLf: string;
  SkyboxRt: string;
  SkyboxUp: string;
  StarCount: number;
  SunAngularSize: number;
  SunTextureId: string;
};

export type ZoneQuestsRequired = {
  Amount: number;
  Type: number;
};
