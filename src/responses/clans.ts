export type ClansData = {
  CountryCode: string
  Created: number
  DepositedDiamonds: number
  Icon: string
  MemberCapacity: number
  Members: number
  Name: string
  Points: number
}

export type ClansResponseBody = {
  status: string;
  data: ClansData[];
};
