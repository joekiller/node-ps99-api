import { ClanName } from "../common";

export type ClansResponseBody = {
  status: string;
  data: (
    | {
        Created: number;
        Name: string;
        MemberCapacity: number;
        DepositedDiamonds: number;
        CountryCode: string;
        Members: number;
        Points: number;
      }
    | {
        Created: number;
        Name: ClanName;
        CountryCode: string;
        MemberCapacity: number;
        DepositedDiamonds: number;
        Members: number;
        Points: number;
      }
  )[];
};
