export type RankData = {
  category: string;
  collection: "Ranks";
  configData: RankConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type RankConfigData = {
  Goals: RankGoal[][];
  MaxEnchantsEquipped: number;
  MaximumActiveGoals: number;
  RankNumber: number;
  Rewards: RankReward[];
  Title: string;
  UnlockableEggSlots: number;
  UnlockablePetSlots: number;
  RankUpRewards?: RankUpReward[];
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
  Item: RankItem;
  StarsRequired: number;
};

export type RankItem = {
  _data: RankItemData;
};

export type RankItemData = {
  _am?: number;
  id: string;
  tn?: number;
};

export type RankUpReward = {
  _data: RankUpRewardData;
};

export type RankUpRewardData = {
  _am?: number;
  id: string;
  tn?: number;
};
