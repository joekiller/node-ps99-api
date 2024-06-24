import { CollectionData } from "./collection-data";

export type MasteryData = CollectionData<"Mastery", MasteryConfigData>;

export type MasteryConfigData = {
  Perks: MasteryPerks;
  FFlag: string;
  Name: string;
  Icon: string;
  Desc: string;
  ToggleablePerks?: MasteryToggleablePerks;
};

export type MasteryPerks = {
  AccidentalVending?: MasteryDetail[];
  AutoVending?: MasteryDetail[];
  BetterDeals?: MasteryPowerDetail[];
  BuyFullVendingStock?: MasteryDetail[];
  CheaperMerchants?: MasteryPowerDetail[];
  CheaperVending?: MasteryPowerDetail[];
  FasterMerchants?: MasteryPowerDetail[];
  FasterVending?: MasteryPowerDetail[];
  FreeVending?: MasteryDetail[];
  MoreVending?: MasteryPowerDetail[];
  BetterLoot?: MasteryPowerDetail[];
  BreakableRespawnRate?: MasteryPowerDetail[];
  FlagDuration?: MasteryPowerDetail[];
  FlagSlots?: MasteryPowerDetail[];
  GoldBreakables?: MasteryPowerDetail[];
  MiniChestLoot?: MasteryPowerDetail[];
  MiniChestOdds?: MasteryPowerDetail[];
  CheaperEggs?: MasteryPowerDetail[];
  ExtraEggs?: MasteryPowerDetail[];
  FasterOpen?: MasteryPowerDetail[];
  GoldenEggs?: MasteryPowerDetail[];
  RainbowEggs?: MasteryPowerDetail[];
  AutoClaim?: MasteryDetail[];
  BetterCrafting?: MasteryPowerDetail[];
  BulkCrafting?: MasteryDetail[];
  CheaperPotions?: MasteryPowerDetail[];
  FasterCrafting?: MasteryPowerDetail[];
  LongerPotions?: MasteryPowerDetail[];
  MagicPotion?: MasteryDetail[];
  SupremePotions?: MasteryPowerDetail[];
  TierNineCrafting?: MasteryDetail[];
  TierNineDrinking?: MasteryDetail[];
  TierTenCrafting?: MasteryDetail[];
  TierTenDrinking?: MasteryDetail[];
  CheaperEnchants?: MasteryPowerDetail[];
  Power?: MasteryPowerDetail[];
  SupremeEnchants?: MasteryDetail[];
  TierEightCrafting?: MasteryDetail[];
  TierEightEquip?: MasteryDetail[];
  TierNineEquip?: MasteryDetail[];
  DaycareDiamonds?: MasteryPowerDetail[];
  DaycareSpeed?: MasteryPowerDetail[];
  FuseAnimationSpeed?: MasteryPowerDetail[];
  GoldAnimationSpeed?: MasteryPowerDetail[];
  GoldHatching?: MasteryPowerDetail[];
  GoldReduction?: MasteryPowerDetail[];
  RainbowAnimationSpeed?: MasteryPowerDetail[];
  RainbowHatching?: MasteryPowerDetail[];
  RainbowReduction?: MasteryPowerDetail[];
  ShinyGolding?: MasteryPowerDetail[];
  ShinyRainbowing?: MasteryPowerDetail[];
  AnimationSpeed?: MasteryPowerDetail[];
  AutoEat?: MasteryDetail[];
  FruitBonus?: MasteryPowerDetail[];
  FruitQueue?: MasteryPowerDetail[];
  LessFruitRequired?: MasteryPowerDetail[];
  LongerFruit?: MasteryPowerDetail[];
  BiggerBobber?: MasteryPowerDetail[];
  DeepPoolLoot?: MasteryPowerDetail[];
  DeepPools?: MasteryDetail[];
  FasterCasting?: MasteryPowerDetail[];
  FasterCatching?: MasteryPowerDetail[];
  RainbowRods?: MasteryPowerDetail[];
  BetterDrops?: MasteryPowerDetail[];
  HugeOdds?: MasteryPowerDetail[];
  MasteryChest?: MasteryDetail[];
  MoreChests?: MasteryPowerDetail[];
  MoreDiamonds?: MasteryPowerDetail[];
  RainbowShovels?: MasteryPowerDetail[];
  BetterCrystal?: MasteryPowerDetail[];
  BetterTech?: MasteryPowerDetail[];
  BetterVoid?: MasteryPowerDetail[];
  CombineAll?: MasteryDetail[];
  FreeSecretKey?: MasteryPowerDetail[];
  FreeTechKey?: MasteryPowerDetail[];
  RetainCrystalKey?: MasteryPowerDetail[];
  RetainSecretKey?: MasteryPowerDetail[];
  RetainTechKey?: MasteryPowerDetail[];
  RetainVoidKey?: MasteryPowerDetail[];
  AutoClaimFreeGifts?: MasteryDetail[];
  BetterCharmStones?: MasteryPowerDetail[];
  DoubleBundleLoot?: MasteryPowerDetail[];
  DoubleMiniChestLoot?: MasteryPowerDetail[];
  FreeGiftSpeed?: MasteryPowerDetail[];
  SuperiorChestLoot?: MasteryPowerDetail[];
  SuperiorChestOdds?: MasteryPowerDetail[];
};

export type MasteryDetail = {
  Level: number;
  Text: string;
  Title: string;
};

export type MasteryPowerDetail = {
  Level: number;
  Power: number;
  Text: string;
  Title: string;
};

export type MasteryToggleablePerks = {
  AutoClaimFreeGifts?: boolean;
  AutoEat?: boolean;
};
