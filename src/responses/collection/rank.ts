import { CollectionData } from "./collection-data";

export type RankData = CollectionData<"Ranks", RankConfigData>;

export type RankConfigData = {
  Goals: RankGoal[][];
  MaxEnchantsEquipped: number;
  MaximumActiveGoals: number;
  RankNumber: number;
  Rewards: RankReward[];
  Title: string;
  UnlockableEggSlots: number;
  UnlockablePetSlots: number;
  RankUpRewards?: RankRewardItem[];
  RequiredRebirth?: number;
  RequiredZone?: string;
};

export type RankGoal = {
  Amount: number;
  Type: number;
  Weight: number;
  CurrencyID?: string;
  BreakableType?: string;
  PotionTier?: number;
  EnchantTier?: number;
};

export type RankReward = {
  Item: RankRewardItem;
  StarsRequired: number;
};

export type RankRewardItem = {
  _data: RankRewardItemData;
};

export type RankRewardItemData = {
  _am?: number;
  id: string;
  tn?: number;
};
