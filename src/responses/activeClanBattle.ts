export type ActiveClanBattleResponseBody = {
  status: string;
  data: {
    _id: string;
    configName: string;
    category: string;
    configData: {
      _script: {};
      FinishTime: number;
      Title: string;
      _id: string;
      StartTime: number;
      Rewards: {
        Bronze: { _data: { id: string } }[];
        Silver: { _data: { id: string } }[];
        Gold: { _data: { id: string } }[];
      };
    };
  };
};
