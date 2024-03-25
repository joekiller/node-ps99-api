export type ClanResponseBody = {
  status: string;
  data: {
    Created: number;
    Owner: number;
    Name: string;
    Icon: string;
    Desc: string;
    MemberCapacity: number;
    OfficerCapacity: number;
    GuildLevel: number;
    Members: { UserID: number; PermissionLevel: number; JoinTime: number }[];
    DepositedDiamonds: number;
    DiamondContributions: {
      AllTime: { Sum: number; Data: { UserID: number; Diamonds: number }[] };
    };
    Status: string;
    StatusTimestamp: number;
    StatusUsername: string;
    Battles: {
      Christmas2023: {
        ProcessedAwards: boolean;
        AwardUserIDs: number[];
        BattleID: string;
        Points: number;
        PointContributions: { UserID: number; Points: number }[];
        EarnedMedal: string;
      };
      DecemberActiveHugePets: {
        ProcessedAwards: boolean;
        AwardUserIDs: number[];
        BattleID: string;
        Points: number;
        PointContributions: { UserID: number; Points: number }[];
        EarnedMedal: string;
      };
      IndexBattle: {
        ProcessedAwards: boolean;
        AwardUserIDs: number[];
        BattleID: string;
        Points: number;
        PointContributions: { UserID: number; Points: number }[];
        EarnedMedal: string;
      };
      AchBattle: {
        ProcessedAwards: boolean;
        AwardUserIDs: number[];
        BattleID: string;
        Points: number;
        PointContributions: { UserID: number; Points: number }[];
        EarnedMedal: string;
      };
      RaidBattle: {
        ProcessedAwards: boolean;
        AwardUserIDs: any[];
        BattleID: string;
        Points: number;
        PointContributions: { UserID: number; Points: number }[];
      };
    };
    CountryCode: string;
    BronzeMedals: number;
    LastKickTimestamp: number;
  };
};
