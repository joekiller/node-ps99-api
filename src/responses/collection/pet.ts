import { CollectionData } from "./collection-data";

export type PetData = CollectionData<"Pets", PetConfigData>;

export type PetConfigData = {
  goldenThumbnail: string;
  indexObtainable?: boolean;
  huge?: boolean;
  name: string;
  indexDesc?: string;
  thumbnail: string;
  fly?: boolean;
  animations?: PetAnimations;
  hideSerial?: boolean;
  tradable?: boolean;
  hideExists?: boolean;
  ugc?: boolean;
  evolved?: boolean;
  preventGolden?: boolean;
  titanic?: boolean;
  flyingTitanic?: boolean;
  fromWorldNumber?: number;
  fromZoneNumber?: number;
  cachedPower?: number[];
  fromEgg?: string;
  exclusiveLevel?: number;
  power?: number;
  overrideZoneNumber?: number;
  hidden?: boolean;
  secret?: boolean;
  balloon?: boolean;
  flyingTitanicAlwaysFly?: boolean;
  isFromLastZone?: boolean;
};

export type PetAnimations = {
  angelusSpin?: boolean;
  flyHeight?: number;
  flyHeightChange?: number;
  flySpeed?: number;
  swerve?: boolean;
  swerveMaxAngle?: number;
  swerveAggression?: number;
  ballBounceHeight?: number;
  spinZ?: boolean;
  ridingGravity?: number;
  ridingCameraOffset: unknown;
  balloon?: boolean;
  particlesSketch?: PetParticlesSketch;
  vertexColorAnim?: PetVertexColorAnim[];
  vertexColorAnimSpeed?: number;
  jelly?: boolean;
  replacementPool?: number[][];
  replacements?: PetReplacement[];
  boneFlyingAnimation?: string;
  fadeFrames?: PetFadeFrame[];
  idleActionAnimations?: [string, number][];
  customAnimations?: boolean;
  christmasLights?: boolean;
  hybridFly?: boolean;
  flipbookAnimationGold?: string[];
  flipbookAnimationSpeed?: number;
  flipbookAnimation?: string[];
  ridingJumpPower?: number;
  balloonSpeed?: number;
  balloonScale: unknown;
  ridingTransparency?: number;
  spin?: boolean;
  colorVariants?: PetColorVariant[];
};

export type PetParticlesSketch = {
  Farm: PetFarm;
  Idle: PetIdle;
};

export type PetFarm = {
  Left: unknown;
  Right: unknown;
};

export type PetIdle = {
  Left: unknown;
  Right: unknown;
};

export type PetVertexColorAnim = {
  Time: number;
  Value: unknown;
};

export type PetReplacement = {
  desc: string;
  dst: unknown;
  isUnique: boolean;
  title: string;
};

export type PetFadeFrame = {
  duration: number;
  iconThumbnail: string;
  instant: boolean;
  textureName: string;
};

export type PetColorVariant = {
  Chance: number;
  Color: unknown;
  Desc: string;
  Id: number;
  IsUnique: boolean;
  Magnitude: number;
  Name: string;
  Title: string;
};
