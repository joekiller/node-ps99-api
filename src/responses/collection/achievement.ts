import { CollectionData } from "./collection-data";

export type AchievementData = CollectionData<
  "Achievements",
  AchievementConfigData
>;

export type AchievementConfigData = {
  Icon: string;
  Name: string;
  Tiers: AchievementTier[];
};

export type AchievementTier = {
  Amount: number;
  Desc: string;
  Difficulty: AchievementDifficulty;
  Hidden: boolean;
  Rewards: AchievementReward[];
  Title: string;
  ManuallyNotify?: number;
};

export type AchievementDifficulty = {
  Name: string;
  Order: number;
};

export type AchievementReward = {
  Reward: AchievementRewardItem;
};

export type AchievementRewardItem = {
  _data: AchievementRewardData;
};

export type AchievementRewardData = {
  id: string;
  /** potions: enchants, etc: tn is tier number */
  tn?: number;
  _am?: number;
  /** For pets: pt=1 is golden, p2=2 is rainbow */
  pt?: number;
};
