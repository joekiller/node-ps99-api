import { CollectionData } from "./collection-data";

export type HoverboardData = CollectionData<
  "Hoverboards",
  HoverboardConfigData
>;

export type HoverboardConfigData = {
  Rarity: HoverboardRarity;
  Tradable?: boolean;
  DisplayName: string;
  Sounds: unknown;
  ShinyParticleScale?: number;
  Desc: string;
  CanBeShiny?: boolean;
  Icon: string;
  Callback: unknown;
  HoverHeight?: number;
  RotationLimit?: number;
  ProductId?: number;
  Animation?: number;
  BobRate?: number;
  PitchScale?: number;
  MaxRoll?: number;
  DefaultJumpSpeedBoost?: number;
  Animator: unknown;
  Setup: unknown;
  IdleVolumeSpeedScale?: number;
  IdlePitchScale?: number;
  BlockcastScale?: number;
  SkateMode?: boolean;
  IdleVolume?: number;
};

export type HoverboardRarity = {
  RarityNumber: number;
  Lootbag: unknown;
  _id: string;
  Color: unknown;
  DisplayName: string;
  Message: unknown;
  ItemSlot: unknown;
  Gradient: unknown;
  Announce: boolean;
  _script: unknown;
};
