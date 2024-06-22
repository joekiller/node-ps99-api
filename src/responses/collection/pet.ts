export type PetData = {
  category: string;
  collection: "Pets";
  configData: PetConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type PetConfigData = {
  goldenThumbnail: string;
  huge?: boolean;
  indexDesc?: string;
  indexObtainable?: boolean;
  name: string;
  thumbnail: string;
  fly?: boolean;
  animations?: PetAnimations;
  hideSerial?: boolean;
  hideExists?: boolean;
  tradable?: boolean;
  ugc?: boolean;
  evolved?: boolean;
  preventGolden?: boolean;
  titanic?: boolean;
  flyingTitanic?: boolean;
  cachedPower?: number[];
  fromEgg?: string;
  fromWorldNumber?: number;
  fromZoneNumber?: number;
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
  flyHeight?: number;
  flyHeightChange?: number;
  flySpeed?: number;
  swerve?: boolean;
  swerveAggression?: number;
  swerveMaxAngle?: number;
  ballBounceHeight?: number;
  spinZ?: boolean;
  ridingCameraOffset: any;
  ridingGravity?: number;
  balloon?: boolean;
  particlesSketch?: PetParticlesSketch;
  vertexColorAnim?: PetVertexColorAnim[];
  vertexColorAnimSpeed?: number;
  jelly?: boolean;
  replacementPool?: number[][];
  replacements?: PetReplacement[];
  boneFlyingAnimation?: string;
  customAnimations?: boolean;
  fadeFrames?: PetFadeFrame[];
  idleActionAnimations?: [string, number][];
  angelusSpin?: boolean;
  christmasLights?: boolean;
  hybridFly?: boolean;
  flipbookAnimation?: string[];
  flipbookAnimationGold?: string[];
  flipbookAnimationSpeed?: number;
  ridingJumpPower?: number;
  balloonScale: any;
  balloonSpeed?: number;
  ridingTransparency?: number;
  spin?: boolean;
  colorVariants?: PetColorVariant[];
};

export type PetParticlesSketch = {
  Farm: PetFarm;
  Idle: PetIdle;
};

export type PetFarm = {
  Left: any;
  Right: any;
};

export type PetIdle = {
  Left: any;
  Right: any;
};

export type PetVertexColorAnim = {
  Time: number;
  Value: any;
};

export type PetReplacement = {
  desc: string;
  dst: any;
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
  Color: any;
  Desc: string;
  Id: number;
  IsUnique: boolean;
  Magnitude: number;
  Name: string;
  Title: string;
};
