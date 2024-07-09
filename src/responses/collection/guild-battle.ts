import { CollectionData } from "./collection-data";

export type GuildBattleData = CollectionData<
  "GuildBattles",
  GuildBattleConfigData
>;

export type GuildBattleConfigData = {
  PlacementRewards?: GuildBattlePlacementReward[];
  FinishTime: number;
  Title: string;
  StartTime: number;
  Rewards: GuildBattleRewards;
  HasGoals?: boolean;
};

export type GuildBattlePlacementReward = {
  Item: GuildBattleItem;
  Best: number;
  Worst: number;
};

export type GuildBattleItem = {
  _data: GuildBattleItemData;
};

export type GuildBattleItemData = {
  id: string;
  /** For pets: pt=1 is golden, p2=2 is rainbow */
  pt?: number;
};

export type GuildBattleRewards = {
  [key: string]: GuildBattleRewardItem[];
};

export type GuildBattleRewardItem = {
  _data: GuildBattleRewardItemData;
};

export type GuildBattleRewardItemData = {
  id: string;
};
