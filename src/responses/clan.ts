export type ClanResponseBody = {
  Battles: Battles
  BronzeMedals: number
  CountryCode: string
  Created: number
  DepositedDiamonds: number
  Desc: string
  DiamondContributions: DiamondContributions
  GoodMedals: number
  GuildLevel: number
  /** use {@link PetSimulator99API.getImage} to get an image blob **/
  Icon: string
  LastKickTimestamp: number
  MemberCapacity: number
  Members: Member[]
  Name: string
  OfficerCapacity: number
  Owner: number
  SilverMedals: number
  Status: string
  StatusTimestamp: number
  StatusUsername: string
}

export type Battles = {[key: string]: PointsBattle | GoalBattle}

export type PointsBattle = {
  AwardUserIDs: number[]
  BattleID: string
  EarnedMedal?: string
  Place?: number
  PointContributions: PointContribution[]
  Points: number
  ProcessedAwards: boolean
}

export type PointContribution = {
  Points: number
  UserID: number
}

export type GoalBattle = {
  AwardUserIDs: any[]
  BattleID: string
  EarnedMedal?: string
  Goals: Goal[]
  Place?: number
  PointContributions: PointContribution[]
  Points: number
  ProcessedAwards: boolean
}

export type Goal = {
  Amount: number
  Contributions: Contributions
  Progress: number
  Stars: number
  Tier: number
  Type: number
}

export type Contributions = {[key: string]: number}

export type HackerBattle = {
  AwardUserIDs: any[]
  BattleID: string
  Place: number
  PointContributions: PointContribution[]
  Points: number
  ProcessedAwards: boolean
}


export type DiamondContributions = {
  AllTime: AllTime
}

export type AllTime = {
  Data: Daum[]
  Sum: number
}

export type Daum = {
  Diamonds: number
  UserID: number
}

export type Member = {
  JoinTime: number
  PermissionLevel: number
  UserID: number
}
