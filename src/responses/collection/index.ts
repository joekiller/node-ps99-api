import { AchievementData } from "./achievement";
import { BoostData } from "./boost";
import { BoothData } from "./booth";
import { BoxData } from "./box";
import { BuffData } from "./buff";
import { CharmData } from "./charm";
import { CurrencyData } from "./currency";
import { EggData } from "./egg";
import { EnchantmentData } from "./enchantment";
import { FishingRodData } from "./fishing-rod";
import { FruitData } from "./fruit";
import { GuildBattleData } from "./guild-battle";
import { HoverboardData } from "./hoverboard";
import { LootboxData } from "./lootbox";
import { MasteryData } from "./mastery";
import { MerchantData } from "./merchant";
import { MiscItemData } from "./misc-item";
import { PetData } from "./pet";
import { PotionData } from "./potion";
import { RandomEventData } from "./random-event";
import { RankData } from "./rank";
import { RarityData } from "./rarity";
import { RebirthData } from "./rebirth";
import { SecretRoomData, SeedData } from "./secret-room";
import { ShovelData } from "./shovel";
import { SprinklerData } from "./sprinkler";
import { UltimateData } from "./ultimate";
import { UpgradeData } from "./upgrade";
import { WateringCanData } from "./watering-can";
import { WorldData } from "./world";
import { ZoneFlagData } from "./zone-flag";
import { ZoneData } from "./zone";

export type Collections =
  | AchievementData
  | BoostData
  | BoothData
  | BoxData
  | BuffData
  | CharmData
  | CurrencyData
  | EggData
  | EnchantmentData
  | FishingRodData
  | FruitData
  | GuildBattleData
  | HoverboardData
  | LootboxData
  | MasteryData
  | MerchantData
  | MiscItemData
  | PetData
  | PotionData
  | RandomEventData
  | RankData
  | RarityData
  | RebirthData
  | SecretRoomData
  | SeedData
  | ShovelData
  | SprinklerData
  | UltimateData
  | UpgradeData
  | WateringCanData
  | WorldData
  | ZoneFlagData
  | ZoneData;

export type CollectionName = Collections["collection"];

export type Collection<C extends CollectionName> = Extract<
  Collections,
  { collection: C }
>[];
