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
  pt?: number;
};

export type GuildBattleRewards = {
  Bronze: GuildBattleRewardItem[];
  Gold: GuildBattleRewardItem[];
  Good?: GuildBattleRewardItem[];
  Silver: GuildBattleRewardItem[];
};

export type GuildBattleRewardItem = {
  _data: GuildBattleRewardItemData;
};

export type GuildBattleRewardItemData = {
  id: string;
};
