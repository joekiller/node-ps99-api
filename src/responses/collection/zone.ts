export type ZoneData = {
  category: string;
  collection: "Zones";
  configData: ZoneConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type ZoneConfigData = {
  Ambience?: ZoneAmbience;
  Breakables: ZoneBreakables;
  Currency: string;
  GateHealth?: number;
  MaximumAvailableEgg: number;
  Price?: number;
  WorldNumber: number;
  ZoneFolder: any;
  ZoneName: string;
  ZoneNumber: number;
  ExtraDropTable: any;
  Lighting?: ZoneLighting;
  Chests: any;
  RenderAdditionalZones?: number[];
  CannonGroupId?: number;
  QuestsRequired?: ZoneQuestsRequired[];
  LinkedOwnership?: string;
  TeleportToZoneOnFall?: boolean;
};

export type ZoneAmbience = {
  SoundId: string;
};

export type ZoneBreakables = {
  Easy?: ZoneEasy;
  Main?: ZoneMain;
  VIP?: ZoneVip;
  Main_Ice?: ZoneMainIce;
  Main_Magma?: ZoneMainMagma;
  HQ?: ZoneHq;
};

export type ZoneEasy = {
  Data: ZoneEasyDaum[];
  Settings: ZoneEasySettings;
};

export type ZoneEasyDaum = {
  Type: string;
  Weight: number;
  WorldNumber: number;
};

export type ZoneEasySettings = {
  Maximum: number;
  RandomDiamondBreakables: boolean;
  RespawnTime: number;
};

export type ZoneMain = {
  Data: ZoneMainDaum[];
  Settings: ZoneMainSettings;
};

export type ZoneMainDaum = {
  Type: string;
  Weight: number;
  WorldNumber?: number;
  ZoneNumber?: number;
};

export type ZoneMainSettings = {
  Maximum: number;
  RespawnTime: number;
  RandomDiamondBreakables?: boolean;
};

export type ZoneVip = {
  Data: ZoneVipDaum[];
  Settings: ZoneVipSettings;
};

export type ZoneVipDaum = {
  Type: string;
  Weight: number;
  WorldNumber?: number;
};

export type ZoneVipSettings = {
  DaycareIgnore: boolean;
  Maximum: number;
  RespawnTime: number;
};

export type ZoneMainIce = {
  Data: ZoneMainIceDaum[];
  Settings: ZoneMainIceSettings;
};

export type ZoneMainIceDaum = {
  Type: string;
  Weight: number;
  WorldNumber: number;
};

export type ZoneMainIceSettings = {
  Maximum: number;
  RespawnTime: number;
};

export type ZoneMainMagma = {
  Data: ZoneMainMagmaDaum[];
  Settings: ZoneMainMagmaSettings;
};

export type ZoneMainMagmaDaum = {
  Type: string;
  Weight: number;
  WorldNumber?: number;
};

export type ZoneMainMagmaSettings = {
  Maximum: number;
  RespawnTime: number;
};

export type ZoneHq = {
  Data: ZoneHqDaum[];
  Settings: ZoneHqSettings;
};

export type ZoneHqDaum = {
  Type: string;
  Weight: number;
};

export type ZoneHqSettings = {
  Maximum: number;
  Requirement: any;
  RespawnTime: number;
};

export type ZoneLighting = {
  Ambient: any;
  Atmosphere: ZoneAtmosphere;
  Bloom: ZoneBloom;
  Brightness: number;
  ClockTime: number;
  ColorCorrection: ZoneColorCorrection;
  ColorShift_Bottom: any;
  ColorShift_Top: any;
  EnvironmentDiffuseScale: number;
  EnvironmentSpecularScale: number;
  ExposureCompensation: number;
  FogColor: any;
  FogEnd: number;
  FogStart: number;
  GeographicLatitude: number;
  OutdoorAmbient: any;
  ShadowSoftness: number;
  Sky: ZoneSky;
};

export type ZoneAtmosphere = {
  Color: any;
  Decay: any;
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
  TintColor: any;
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
