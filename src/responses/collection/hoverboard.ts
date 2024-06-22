export type HoverboardData = {
  category: string;
  collection: "Hoverboards";
  configData: HoverboardConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type HoverboardConfigData = {
  CanBeShiny?: boolean;
  Desc: string;
  DisplayName: string;
  Icon: string;
  Rarity: HoverboardRarity;
  ShinyParticleScale?: number;
  Sounds: any;
  Tradable?: boolean;
  Callback: any;
  Animation?: number;
  BobRate?: number;
  HoverHeight?: number;
  ProductId?: number;
  RotationLimit?: number;
  DefaultJumpSpeedBoost?: number;
  MaxRoll?: number;
  PitchScale?: number;
  Animator: any;
  Setup: any;
  BlockcastScale?: number;
  IdlePitchScale?: number;
  IdleVolume?: number;
  IdleVolumeSpeedScale?: number;
  SkateMode?: boolean;
};

export type HoverboardRarity = {
  Announce: boolean;
  Color: any;
  DisplayName: string;
  Gradient: any;
  ItemSlot: any;
  Lootbag: any;
  Message: any;
  RarityNumber: number;
  _id: string;
  _script: any;
};
