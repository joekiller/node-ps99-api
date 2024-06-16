export type AchievementData = {
  category: string
  collection: "Achievements"
  configData: AchievementConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type AchievementConfigData = {
  Icon: string
  Name: string
  Tiers: AchievementTier[]
}

export type AchievementTier = {
  Amount: number
  Desc: string
  Difficulty: AchievementDifficulty
  Hidden: boolean
  Rewards: AchievementReward[]
  Title: string
  ManuallyNotify?: number
}

export type AchievementDifficulty = {
  Name: string
  Order: number
}

export type AchievementReward = {
  Reward: AchievementRewardItem
}

export type AchievementRewardItem = {
  _data: AchievementRewardData
}

export type AchievementRewardData = {
  id: string
  tn?: number
  _am?: number
  pt?: number
}


export type BoostData = {
  category: "Boosts"
  collection: "Boosts"
  configData: BoostConfigData
  configName: "Boost | Friends"
  dateCreated: any
  dateModified: any
  hash: any
}

export type BoostConfigData = {
  DisplayName: string
  Icon: string
  MaximumPercent: number
}

export type BoothData = {
  category: "Booths"
  collection: "Booths"
  configData: BoothConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type BoothConfigData = {
  Desc: string
  DisplayName: string
  Icon: string
  Model: any
  Rarity: BoothRarity
  Hidden?: boolean
  Tradable?: boolean
  Callback: any
  OffSale?: boolean
  ProductId?: number
  DiamondPrice?: number
  Sittable?: boolean
  RenderStepped: any
}

export type BoothRarity = {
  Announce: boolean
  Color: any
  DisplayName: string
  Gradient: any
  ItemSlot: any
  Lootbag: any
  Message: any
  RarityNumber: number
  _id: string
  _script: any
}

export type BoxData = {
  category: "Boxes"
  collection: "Boxes"
  configData: BoxConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type BoxConfigData = {
  Capacity: number
  Desc: string
  DisplayName: string
  Icons: BoxIcon[]
  Rarity: BoxRarity
}

export type BoxIcon = {
  Color: any
  Icon: string
  Name: string
}

export type BoxRarity = {
  Announce: boolean
  Color: any
  DisplayName: string
  Gradient: any
  ItemSlot: any
  Lootbag: any
  Message: any
  RarityNumber: number
  _id: string
  _script: any
}

export type BuffData = {
  category: "Buffs"
  collection: "Buffs"
  configData: BuffConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type BuffConfigData = {
  AssociatedItemClass: string
  AssociatedItemID: string
  DisplayName: string
  Length: number
  IgnoreInstancePause?: boolean
}

export type CharmData = {
  category: "Charms"
  collection: "Charms"
  configData: CharmConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type CharmConfigData = {
  BaseTier: number
  Icon: string
  MaxTier: number
  Tiers: CharmTier[]
  DiminishPowerThreshold?: number
  Unique?: boolean
}

export type CharmTier = {
  Desc: string
  DisplayName: string
  Power: number
  Rarity: CharmRarity
}

export type CharmRarity = {
  Announce: boolean
  Color: any
  DisplayName: string
  Gradient: any
  ItemSlot: any
  Lootbag: any
  Message: any
  RarityNumber: number
  _id: string
  _script: any
}

export type CurrencyData = {
  category: "Currency"
  collection: "Currency"
  configData: CurrencyConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type CurrencyConfigData = {
  BagTiers?: CurrencyBagTier[]
  Desc: string
  DisplayName: string
  IsWorldCurrency?: boolean
  MaxAmount: number
  Rarity: CurrencyRarity
  Tiers: CurrencyTier[]
  Tradable: boolean
  _index: number
  PermitAutoLootScaling?: boolean
}

export type CurrencyBagTier = {
  image: string
  value: number
}

export type CurrencyRarity = {
  Announce: boolean
  Color: any
  DisplayName: string
  Gradient: any
  ItemSlot: any
  Lootbag: any
  Message: any
  RarityNumber: number
  _id: string
  _script: any
}

export type CurrencyTier = {
  Order: number
  imageOutline: string
  isBottom?: boolean
  orbImage: string
  rainData?: CurrencyRainData
  textColor: any
  tierName: string
  tinyImage: string
  value: number
}

export type CurrencyRainData = {
  LightEmission: number
}

export type EggData = {
  category: string
  collection: "Eggs"
  configData: EggConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type EggConfigData = {
  disableGold?: boolean
  disableModifiers?: boolean
  disableRainbow?: boolean
  egg: any
  goldChance?: number
  icon: string
  name: string
  pets: any[][]
  rainbowChance?: number
  rarity?: EggRarity
  shinyChance?: number
  productIds?: EggProductIds
  currency?: string
  eggNumber?: number
  goldenEgg: any
  worldNumber?: number
  giftCallback: any
  isCustomEgg?: boolean
  overrideCost?: number
  bestEgg?: boolean
}

export type EggRarity = {
  Announce: boolean
  Color: any
  DisplayName: string
  Gradient: any
  ItemSlot: any
  Lootbag: any
  Message: any
  RarityNumber: number
  _id: string
  _script: any
}

export type EggProductIds = {
  "10 Exclusive Eggs": number
  "100 Exclusive Eggs": number
  "3 Exclusive Eggs": number
  "Exclusive Egg": number
}

export type EnchantmentData = {
  category: string
  collection: "Enchants"
  configData: EnchantmentConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type EnchantmentConfigData = {
  BaseTier: number
  DiminishPowerThreshold?: number
  EmpoweredBoost?: number
  MaxPage: number
  MaxTier: number
  PageIcon?: string
  Tiers: EnchantmentTier[]
  ProductId?: number
}

export type EnchantmentTier = {
  Desc: string
  DisplayName: string
  Icon: string
  Power: number
  Rarity: EnchantmentRarity
}

export type EnchantmentRarity = {
  Announce: boolean
  Color: any
  DisplayName: string
  Gradient: any
  ItemSlot: any
  Lootbag: any
  Message: any
  RarityNumber: number
  _id: string
  _script: any
}

export type FishingRodData = {
  category: string
  collection: "FishingRods"
  configData: FishingRodConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type FishingRodConfigData = {
  AssociatedItemID: string
  BarSize: number
  DisplayName: string
  FishingChance: number
  FishingCurrencyMultiplier: number
  FishingGameSpeedMultiplier: number
  FishingOdds: [string, number][]
  Icon: string
  LineColor: any
  MinFishingTime: number
  Model: any
  MerchantSalePrice?: number
}

export type FruitData = {
  category: string
  collection: "Fruits"
  configData: FruitConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type FruitConfigData = {
  Boost: FruitBoost[]
  Desc?: string
  DisplayName: string
  Duration: number
  Icon: string
  IgnoreFruitMachine?: boolean
  Rarity: FruitRarity
}

export type FruitBoost = {
  Amount: number
  Type: string
}

export type FruitRarity = {
  Announce: boolean
  Color: any
  DisplayName: string
  Gradient: any
  ItemSlot: any
  Lootbag: any
  Message: any
  RarityNumber: number
  _id: string
  _script: any
}

export type GuildBattleData = {
  category: string
  collection: "GuildBattles"
  configData: GuildBattleConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type GuildBattleConfigData = {
  FinishTime: number
  PlacementRewards?: GuildBattlePlacementReward[]
  Rewards: GuildBattleRewards
  StartTime: number
  Title: string
  HasGoals?: boolean
}

export type GuildBattlePlacementReward = {
  Best: number
  Item: GuildBattleItem
  Worst: number
}

export type GuildBattleItem = {
  _data: GuildBattleItemData
}

export type GuildBattleItemData = {
  id: string
  pt?: number
}

export type GuildBattleRewards = {
  Bronze: GuildBattleRewardItem[]
  Gold: GuildBattleRewardItem[]
  Good?: GuildBattleRewardItem[]
  Silver: GuildBattleRewardItem[]
}

export type GuildBattleRewardItem = {
  _data: GuildBattleRewardItemData
}

export type GuildBattleRewardItemData = {
  id: string
}

export type HoverboardData = {
  category: string
  collection: "Hoverboards"
  configData: HoverboardConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type HoverboardConfigData = {
  CanBeShiny?: boolean
  Desc: string
  DisplayName: string
  Icon: string
  Rarity: HoverboardRarity
  ShinyParticleScale?: number
  Sounds: any
  Tradable?: boolean
  Callback: any
  Animation?: number
  BobRate?: number
  HoverHeight?: number
  ProductId?: number
  RotationLimit?: number
  DefaultJumpSpeedBoost?: number
  MaxRoll?: number
  PitchScale?: number
  Animator: any
  Setup: any
  BlockcastScale?: number
  IdlePitchScale?: number
  IdleVolume?: number
  IdleVolumeSpeedScale?: number
  SkateMode?: boolean
}

export type HoverboardRarity = {
  Announce: boolean
  Color: any
  DisplayName: string
  Gradient: any
  ItemSlot: any
  Lootbag: any
  Message: any
  RarityNumber: number
  _id: string
  _script: any
}

export type LootboxData = {
  category: string
  collection: "Lootboxes"
  configData: LootboxConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type LootboxConfigData = {
  Desc: string
  DisplayName: string
  Icon: string
  Rarity: LootboxRarity
}

export type LootboxRarity = {
  Announce: boolean
  Color: any
  DisplayName: string
  Gradient: any
  ItemSlot: any
  Lootbag: any
  Message: any
  RarityNumber: number
  _id: string
  _script: any
}

export type MasteryData = {
  category: string
  collection: "Mastery"
  configData: MasteryConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type MasteryConfigData = {
  Desc: string
  FFlag: string
  Icon: string
  Name: string
  Perks: MasteryPerks
  ToggleablePerks?: MasteryToggleablePerks
}

export type MasteryPerks = {
  AccidentalVending?: MasteryDetail[]
  AutoVending?: MasteryDetail[]
  BetterDeals?: MasteryPowerDetail[]
  BuyFullVendingStock?: MasteryDetail[]
  CheaperMerchants?: MasteryPowerDetail[]
  CheaperVending?: MasteryPowerDetail[]
  FasterMerchants?: MasteryPowerDetail[]
  FasterVending?: MasteryPowerDetail[]
  FreeVending?: MasteryDetail[]
  MoreVending?: MasteryPowerDetail[]
  BetterLoot?: MasteryPowerDetail[]
  BreakableRespawnRate?: MasteryPowerDetail[]
  FlagDuration?: MasteryPowerDetail[]
  FlagSlots?: MasteryPowerDetail[]
  GoldBreakables?: MasteryPowerDetail[]
  MiniChestLoot?: MasteryPowerDetail[]
  MiniChestOdds?: MasteryPowerDetail[]
  CheaperEggs?: MasteryPowerDetail[]
  ExtraEggs?: MasteryPowerDetail[]
  FasterOpen?: MasteryPowerDetail[]
  GoldenEggs?: MasteryPowerDetail[]
  RainbowEggs?: MasteryPowerDetail[]
  AutoClaim?: MasteryDetail[]
  BetterCrafting?: MasteryPowerDetail[]
  BulkCrafting?: MasteryDetail[]
  CheaperPotions?: MasteryPowerDetail[]
  FasterCrafting?: MasteryPowerDetail[]
  LongerPotions?: MasteryPowerDetail[]
  MagicPotion?: MasteryDetail[]
  SupremePotions?: MasteryPowerDetail[]
  TierNineCrafting?: MasteryDetail[]
  TierNineDrinking?: MasteryDetail[]
  TierTenCrafting?: MasteryDetail[]
  TierTenDrinking?: MasteryDetail[]
  CheaperEnchants?: MasteryPowerDetail[]
  Power?: MasteryPowerDetail[]
  SupremeEnchants?: MasteryDetail[]
  TierEightCrafting?: MasteryDetail[]
  TierEightEquip?: MasteryDetail[]
  TierNineEquip?: MasteryDetail[]
  DaycareDiamonds?: MasteryPowerDetail[]
  DaycareSpeed?: MasteryPowerDetail[]
  FuseAnimationSpeed?: MasteryPowerDetail[]
  GoldAnimationSpeed?: MasteryPowerDetail[]
  GoldHatching?: MasteryPowerDetail[]
  GoldReduction?: MasteryPowerDetail[]
  RainbowAnimationSpeed?: MasteryPowerDetail[]
  RainbowHatching?: MasteryPowerDetail[]
  RainbowReduction?: MasteryPowerDetail[]
  ShinyGolding?: MasteryPowerDetail[]
  ShinyRainbowing?: MasteryPowerDetail[]
  AnimationSpeed?: MasteryPowerDetail[]
  AutoEat?: MasteryDetail[]
  FruitBonus?: MasteryPowerDetail[]
  FruitQueue?: MasteryPowerDetail[]
  LessFruitRequired?: MasteryPowerDetail[]
  LongerFruit?: MasteryPowerDetail[]
  BiggerBobber?: MasteryPowerDetail[]
  DeepPoolLoot?: MasteryPowerDetail[]
  DeepPools?: MasteryDetail[]
  FasterCasting?: MasteryPowerDetail[]
  FasterCatching?: MasteryPowerDetail[]
  RainbowRods?: MasteryPowerDetail[]
  BetterDrops?: MasteryPowerDetail[]
  HugeOdds?: MasteryPowerDetail[]
  MasteryChest?: MasteryDetail[]
  MoreChests?: MasteryPowerDetail[]
  MoreDiamonds?: MasteryPowerDetail[]
  RainbowShovels?: MasteryPowerDetail[]
  BetterCrystal?: MasteryPowerDetail[]
  BetterTech?: MasteryPowerDetail[]
  BetterVoid?: MasteryPowerDetail[]
  CombineAll?: MasteryDetail[]
  FreeSecretKey?: MasteryPowerDetail[]
  FreeTechKey?: MasteryPowerDetail[]
  RetainCrystalKey?: MasteryPowerDetail[]
  RetainSecretKey?: MasteryPowerDetail[]
  RetainTechKey?: MasteryPowerDetail[]
  RetainVoidKey?: MasteryPowerDetail[]
  AutoClaimFreeGifts?: MasteryDetail[]
  BetterCharmStones?: MasteryPowerDetail[]
  DoubleBundleLoot?: MasteryPowerDetail[]
  DoubleMiniChestLoot?: MasteryPowerDetail[]
  FreeGiftSpeed?: MasteryPowerDetail[]
  SuperiorChestLoot?: MasteryPowerDetail[]
  SuperiorChestOdds?: MasteryPowerDetail[]
}

export type MasteryDetail = {
  Level: number
  Text: string
  Title: string
}

export type MasteryPowerDetail = {
  Level: number
  Power: number
  Text: string
  Title: string
}

export type MasteryToggleablePerks = {
  AutoClaimFreeGifts?: boolean
  AutoEat?: boolean
}

export type MerchantData = {
  category: string
  collection: "Merchants"
  configData: MerchantConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type MerchantConfigData = {
  DisplayName: string
  GetOffers: any
  MachineName: string
  PriceMult: number
  RefreshRate: number
  SlotRespectLevels?: number[]
  StockRangeByRespectLevel?: number[][]
  HideNotification?: boolean
  HideRespect?: boolean
  IsStatic?: boolean
}

export type MiscItemData = {
  category: string
  collection: "MiscItems"
  configData: MiscItemConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type MiscItemConfigData = {
  DisplayName: string
  GetOffers: any
  MachineName: string
  PriceMult: number
  RefreshRate: number
  SlotRespectLevels?: number[]
  StockRangeByRespectLevel?: number[][]
  HideNotification?: boolean
  HideRespect?: boolean
  IsStatic?: boolean
}

export type PetData = {
  category: string
  collection: "Pets"
  configData: PetConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type PetConfigData = {
  goldenThumbnail: string
  huge?: boolean
  indexDesc?: string
  indexObtainable?: boolean
  name: string
  thumbnail: string
  fly?: boolean
  animations?: PetAnimations
  hideSerial?: boolean
  hideExists?: boolean
  tradable?: boolean
  ugc?: boolean
  evolved?: boolean
  preventGolden?: boolean
  titanic?: boolean
  flyingTitanic?: boolean
  cachedPower?: number[]
  fromEgg?: string
  fromWorldNumber?: number
  fromZoneNumber?: number
  exclusiveLevel?: number
  power?: number
  overrideZoneNumber?: number
  hidden?: boolean
  secret?: boolean
  balloon?: boolean
  flyingTitanicAlwaysFly?: boolean
  isFromLastZone?: boolean
}

export type PetAnimations = {
  flyHeight?: number
  flyHeightChange?: number
  flySpeed?: number
  swerve?: boolean
  swerveAggression?: number
  swerveMaxAngle?: number
  ballBounceHeight?: number
  spinZ?: boolean
  ridingCameraOffset: any
  ridingGravity?: number
  balloon?: boolean
  particlesSketch?: PetParticlesSketch
  vertexColorAnim?: PetVertexColorAnim[]
  vertexColorAnimSpeed?: number
  jelly?: boolean
  replacementPool?: number[][]
  replacements?: PetReplacement[]
  boneFlyingAnimation?: string
  customAnimations?: boolean
  fadeFrames?: PetFadeFrame[]
  idleActionAnimations?: [string, number][]
  angelusSpin?: boolean
  christmasLights?: boolean
  hybridFly?: boolean
  flipbookAnimation?: string[]
  flipbookAnimationGold?: string[]
  flipbookAnimationSpeed?: number
  ridingJumpPower?: number
  balloonScale: any
  balloonSpeed?: number
  ridingTransparency?: number
  spin?: boolean
  colorVariants?: PetColorVariant[]
}

export type PetParticlesSketch = {
  Farm: PetFarm
  Idle: PetIdle
}

export type PetFarm = {
  Left: any
  Right: any
}

export type PetIdle = {
  Left: any
  Right: any
}

export type PetVertexColorAnim = {
  Time: number
  Value: any
}

export type PetReplacement = {
  desc: string
  dst: any
  isUnique: boolean
  title: string
}

export type PetFadeFrame = {
  duration: number
  iconThumbnail: string
  instant: boolean
  textureName: string
}

export type PetColorVariant = {
  Chance: number
  Color: any
  Desc: string
  Id: number
  IsUnique: boolean
  Magnitude: number
  Name: string
  Title: string
}

export type PotionData = {
  category: string
  collection: "Potions"
  configData: PotionConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type PotionConfigData = {
  BaseTier: number
  MaxTier: number
  PrimaryColor: string
  SecondaryColor: string
  Tiers: PotionTier[]
}

export type PotionTier = {
  Desc: string
  DisplayName: string
  Icon: string
  Power: number
  Rarity: PotionRarity
  Time: number
}

export type PotionRarity = {
  Announce: boolean
  Color: any
  DisplayName: string
  Gradient: any
  ItemSlot: any
  Lootbag: any
  Message: any
  RarityNumber: number
  _id: string
  _script: any
}

export type RandomEventData = {
  category: string
  collection: "RandomEvents"
  configData: RandomEventConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type RandomEventConfigData = {
  AllowInInstances: boolean
  AllowInZones: boolean
  AllowMultiple: boolean
  AreaWhitelist: RandomEventAreaWhitelist
  BreakingRequirement: number
  Chance: number
  Color: string
  Duration: number
  Icon: string
  Name: string
  PlaytimeRequirement: number
  MinimumZone?: number
}

export type RandomEventAreaWhitelist = {
  Main: boolean
  Main_Ice: boolean
  Main_Magma: boolean
}

export type RankData = {
  category: string
  collection: "Ranks"
  configData: RankConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type RankConfigData = {
  Goals: RankGoal[][]
  MaxEnchantsEquipped: number
  MaximumActiveGoals: number
  RankNumber: number
  Rewards: RankReward[]
  Title: string
  UnlockableEggSlots: number
  UnlockablePetSlots: number
  RankUpRewards?: RankUpReward[]
  RequiredRebirth?: number
  RequiredZone?: string
}

export type RankGoal = {
  Amount: number
  Type: number
  Weight: number
  CurrencyID?: string
  BreakableType?: string
  PotionTier?: number
  EnchantTier?: number
}

export type RankReward = {
  Item: RankItem
  StarsRequired: number
}

export type RankItem = {
  _data: RankItemData
}

export type RankItemData = {
  _am?: number
  id: string
  tn?: number
}

export type RankUpReward = {
  _data: RankUpRewardData
}

export type RankUpRewardData = {
  _am?: number
  id: string
  tn?: number
}

export type RarityData = {
  category: string
  collection: "Rarity"
  configData: RarityConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type RarityConfigData = {
  Announce: boolean
  Color: string
  DisplayName: string
  Gradient: any
  ItemSlot: any
  Lootbag: any
  Message: any
  RarityNumber: number
}

export type RebirthData = {
  category: string
  collection: "Rebirths"
  configData: RebirthConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type RebirthConfigData = {
  BoostDesc: string
  DisplayName: string
  ItemRewards: any
  RebirthNumber: number
  RebirthUnlocks: RebirthUnlock[]
  StrengthPowerBoost: number
  ZoneNumberRequired: number
  RebirthCallback: any
  ResetZone?: string
}

export type RebirthUnlock = {
  Desc: string
  Icon: string
  Title: string
  GuiTitle?: string
}

export type SecretRoomData = {
  category: string
  collection: "SecretRooms"
  configData: SecretRoomConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type SecretRoomConfigData = {
  CloseDoor: any
  DisplayName: string
  InstanceId: string
  RequiredZone: string
  UnlockAnimation: any
}

export type SeedData = {
  category: string
  collection: "Seeds"
  configData: SeedConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type SeedConfigData = {
  Desc: string
  DisplayName: string
  GrowTime: number
  Icon: string
  LootTable: any
  Rarity: SeedRarity
  Stages: any[]
}

export type SeedRarity = {
  Announce: boolean
  Color: any
  DisplayName: string
  Gradient: any
  ItemSlot: any
  Lootbag: any
  Message: any
  RarityNumber: number
  _id: string
  _script: any
}

export type ShovelData = {
  category: string
  collection: "Shovels"
  configData: ShovelConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type ShovelConfigData = {
  AssociatedItemID: string
  Desc: string
  DisplayName: string
  Icon: string
  Model: any
  MerchantSalePrice?: number
}


export type SprinklerData = {
  category: string
  collection: "Sprinklers"
  configData: SprinklerConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type SprinklerConfigData = {
  Color: string
  Desc: string
  Duration: number
  Icon: string
  Model: any
  Name: string
  Rarity: SprinklerRarity
}

export type SprinklerRarity = {
  Announce: boolean
  Color: any
  DisplayName: string
  Gradient: any
  ItemSlot: any
  Lootbag: any
  Message: any
  RarityNumber: number
  _id: string
  _script: any
}

export type UltimateData = {
  category: string
  collection: "Ultimates"
  configData: UltimateConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type UltimateConfigData = {
  Cooldown: any
  Desc: string
  DisplayName: string
  FFlagName: string
  Icon: string
  LevelToTier: number[]
  MaxTier: number
  Rarity: UltimateRarity
  TierToLevel: number[]
  Tradable?: boolean
  ProductId?: number
}

export type UltimateRarity = {
  Announce: boolean
  Color: any
  DisplayName: string
  Gradient: any
  ItemSlot: any
  Lootbag: any
  Message: any
  RarityNumber: number
  _id: string
  _script: any
}

export type UpgradeData = {
  category: string
  collection: "Upgrades"
  configData: UpgradeConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type UpgradeConfigData = {
  Icon: string
  RewardText: any
  TierCosts: number[]
  TierCurrencies: UpgradeTierCurrency[]
  TierPowers: number[]
}

export type UpgradeTierCurrency = {
  BagTiers: UpgradeBagTier[]
  Desc: string
  DisplayName: string
  MaxAmount: number
  Rarity: UpgradeRarity
  Tiers: UpgradeTier[]
  Tradable: boolean
  _id: string
  _index: number
  _script: any
}

export type UpgradeBagTier = {
  image: string
  value: number
}

export type UpgradeRarity = {
  Announce: boolean
  Color: any
  DisplayName: string
  Gradient: any
  ItemSlot: any
  Lootbag: any
  Message: any
  RarityNumber: number
  _id: string
  _script: any
}

export type UpgradeTier = {
  Order: number
  imageOutline: string
  isBottom: boolean
  orbImage: string
  rainData: UpgradeRainData
  textColor: any
  tierName: string
  tinyImage: string
  value: number
}

export type UpgradeRainData = {
  LightEmission: number
}

export type WateringCanData = {
  category: string
  collection: "WateringCans"
  configData: WateringCanConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type WateringCanConfigData = {
  AssociatedItemID: string
  DisplayName: string
  Icon: string
  Model: any
  PlantTimeMultiplier: number
  PlantTimeMultiplierDuration: number
}

export type WorldData = {
  category: string
  collection: "Worlds"
  configData: WorldConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type WorldConfigData = {
  FallbackSpawnLocation: any
  Lighting: any
  MapName: string
  PlaceId: number
  SpawnId: string
  WorldCurrency: string
  WorldNumber: number
  AdditionalMusic?: string[]
}

export type ZoneFlagData = {
  category: string
  collection: "ZoneFlags"
  configData: ZoneFlagConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type ZoneFlagConfigData = {
  Color: string
  Desc: string
  Duration: number
  Icon: string
  Model: any
  Name: string
  Rarity: ZoneFlagRarity
}

export type ZoneFlagRarity = {
  Announce: boolean
  Color: any
  DisplayName: string
  Gradient: any
  ItemSlot: any
  Lootbag: any
  Message: any
  RarityNumber: number
  _id: string
  _script: any
}

export type ZoneData = {
  category: string
  collection: "Zones"
  configData: ZoneConfigData
  configName: string
  dateCreated: any
  dateModified: any
  hash: any
}

export type ZoneConfigData = {
  Ambience?: ZoneAmbience
  Breakables: ZoneBreakables
  Currency: string
  GateHealth?: number
  MaximumAvailableEgg: number
  Price?: number
  WorldNumber: number
  ZoneFolder: any
  ZoneName: string
  ZoneNumber: number
  ExtraDropTable: any
  Lighting?: ZoneLighting
  Chests: any
  RenderAdditionalZones?: number[]
  CannonGroupId?: number
  QuestsRequired?: ZoneQuestsRequired[]
  LinkedOwnership?: string
  TeleportToZoneOnFall?: boolean
}

export type ZoneAmbience = {
  SoundId: string
}

export type ZoneBreakables = {
  Easy?: ZoneEasy
  Main?: ZoneMain
  VIP?: ZoneVip
  Main_Ice?: ZoneMainIce
  Main_Magma?: ZoneMainMagma
  HQ?: ZoneHq
}

export type ZoneEasy = {
  Data: ZoneEasyDaum[]
  Settings: ZoneEasySettings
}

export type ZoneEasyDaum = {
  Type: string
  Weight: number
  WorldNumber: number
}

export type ZoneEasySettings = {
  Maximum: number
  RandomDiamondBreakables: boolean
  RespawnTime: number
}

export type ZoneMain = {
  Data: ZoneMainDaum[]
  Settings: ZoneMainSettings
}

export type ZoneMainDaum = {
  Type: string
  Weight: number
  WorldNumber?: number
  ZoneNumber?: number
}

export type ZoneMainSettings = {
  Maximum: number
  RespawnTime: number
  RandomDiamondBreakables?: boolean
}

export type ZoneVip = {
  Data: ZoneVipDaum[]
  Settings: ZoneVipSettings
}

export type ZoneVipDaum = {
  Type: string
  Weight: number
  WorldNumber?: number
}

export type ZoneVipSettings = {
  DaycareIgnore: boolean
  Maximum: number
  RespawnTime: number
}

export type ZoneMainIce = {
  Data: ZoneMainIceDaum[]
  Settings: ZoneMainIceSettings
}

export type ZoneMainIceDaum = {
  Type: string
  Weight: number
  WorldNumber: number
}

export type ZoneMainIceSettings = {
  Maximum: number
  RespawnTime: number
}

export type ZoneMainMagma = {
  Data: ZoneMainMagmaDaum[]
  Settings: ZoneMainMagmaSettings
}

export type ZoneMainMagmaDaum = {
  Type: string
  Weight: number
  WorldNumber?: number
}

export type ZoneMainMagmaSettings = {
  Maximum: number
  RespawnTime: number
}

export type ZoneHq = {
  Data: ZoneHqDaum[]
  Settings: ZoneHqSettings
}

export type ZoneHqDaum = {
  Type: string
  Weight: number
}

export type ZoneHqSettings = {
  Maximum: number
  Requirement: any
  RespawnTime: number
}

export type ZoneLighting = {
  Ambient: any
  Atmosphere: ZoneAtmosphere
  Bloom: ZoneBloom
  Brightness: number
  ClockTime: number
  ColorCorrection: ZoneColorCorrection
  ColorShift_Bottom: any
  ColorShift_Top: any
  EnvironmentDiffuseScale: number
  EnvironmentSpecularScale: number
  ExposureCompensation: number
  FogColor: any
  FogEnd: number
  FogStart: number
  GeographicLatitude: number
  OutdoorAmbient: any
  ShadowSoftness: number
  Sky: ZoneSky
}

export type ZoneAtmosphere = {
  Color: any
  Decay: any
  Density: number
  Glare: number
  Haze: number
  Offset: number
}

export type ZoneBloom = {
  Enabled: boolean
  Intensity: number
  Size: number
  Threshold: number
}

export type ZoneColorCorrection = {
  Brightness: number
  Contrast: number
  Enabled: boolean
  Saturation: number
  TintColor: any
}

export type ZoneSky = {
  CelestialBodiesShown: boolean
  MoonAngularSize: number
  MoonTextureId: string
  SkyboxBk: string
  SkyboxDn: string
  SkyboxFt: string
  SkyboxLf: string
  SkyboxRt: string
  SkyboxUp: string
  StarCount: number
  SunAngularSize: number
  SunTextureId: string
}

export type ZoneQuestsRequired = {
  Amount: number
  Type: number
}

export type CollectionData =
  AchievementData |
  BoostData |
  BoothData |
  BoxData |
  BuffData |
  CharmData |
  CurrencyData |
  EggData |
  EnchantmentData |
  FishingRodData |
  FruitData |
  GuildBattleData |
  HoverboardData |
  LootboxData |
  MasteryData |
  MerchantData |
  MiscItemData |
  PetData |
  PotionData |
  RandomEventData |
  RankData |
  RarityData |
  RebirthData |
  SecretRoomData |
  SeedData |
  ShovelData |
  SprinklerData |
  UltimateData |
  UpgradeData |
  WateringCanData |
  WorldData |
  ZoneFlagData |
  ZoneData;

export type Collection = CollectionData['collection']

export type GetCollectionResponse<C extends Collection> = {
  data: Extract<CollectionData, {collection: C}>[]
  status: string
}
