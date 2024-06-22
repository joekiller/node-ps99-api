export type GuildBattleData = {
  category: string;
  collection: "GuildBattles";
  configData: GuildBattleConfigData;
  configName: string;
  dateCreated: any;
  dateModified: any;
  hash: any;
};

export type GuildBattleConfigData = {
  FinishTime: number;
  PlacementRewards?: GuildBattlePlacementReward[];
  Rewards: GuildBattleRewards;
  StartTime: number;
  Title: string;
  HasGoals?: boolean;
};

export type GuildBattlePlacementReward = {
  Best: number;
  Item: GuildBattleItem;
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
