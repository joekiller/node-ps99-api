export type ActiveBattleData = {
  _id: string
  category: string
  configData: ActiveBattleConfigData
  configName: string
}

export type ActiveBattleConfigData = {
  FinishTime: number
  PlacementRewards: ActiveBattlePlacementReward[]
  Rewards: ActiveBattleRewards
  StartTime: number
  Title: string
  _id: string
  _script: any
}

export type ActiveBattlePlacementReward = {
  Best: number
  Item: ActiveBattleItem
  Worst: number
}

export type ActiveBattleItem = {
  _data: ActiveBattleItemData
}

export type ActiveBattleItemData = {
  id: string
  pt?: number
}

export type ActiveBattleRewards = {
  Bronze: any[]
  Gold: any[]
  Good: any[]
  Silver: any[]
}

export type ActiveClanBattleResponseBody = {
  status: string
  data: ActiveBattleData
}
